import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MapRootComponent } from '../map/map-root/map-root.component';
import { EcgService } from '../../../Dashboard1/services';

const BASE_URL = 'https://rivenbackend-production.up.railway.app/api';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MapRootComponent],
  templateUrl: './case-detail.component.html',
  styleUrl: './case-detail.component.css'
})
export class CaseDetailComponent implements OnInit {

  showTrackingModal = false;
  isLoading = true;
  hasError = false;
  caseId = '';
  numericId = 0;
  isSavingReadiness = false;
  readinessSaved = false;

  ecgImageResultText = '—';
  ecgSignalResultText = '—';
  ctResultText = '—';

  nihssScores: { name: string; score: number }[] = [];
  nihssTotal = 0;
  nihssMax = 42;
  nihssResult = '—';

  get nihssPercentage(): number {
    return (this.nihssTotal / this.nihssMax) * 100;
  }

  caseData = {
    id: '—',
    date: '—',
    time: '—',
    name: '—',
    age: 0,
    gender: '—',
    aiDiagnosis: '—',
    nihss: '—',
    riskFactors: [] as string[],
    symptoms: [] as string[],
    vitals: {
      bloodPressure: '—',
      heartRate: '—',
      respiratoryRate: '—',
      oxygenSaturation: '—',
      temperature: '—',
      glucoseLevel: '—'
    },
    hospitalReadiness: [
      { label: 'Patient Room Ready', done: false },
      { label: 'Stroke Team Notified', done: false },
      { label: 'Neurologist On Standby', done: false },
    ],
    files: {
      detailedTest: '',
      ecgImage: '',
      ecgSignalHea: '',
      ecgSignalMat: '',
      ctImage1: '',
      ctImage2: '',
      extraImages: [] as string[]
    }
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
    private ecgService: EcgService
  ) {}

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id') || '';
    const parts = this.caseId.split('-');
    this.numericId = +parts[parts.length - 1];
    this.loadCase();
    this.loadEcgResults();
  }

  loadCase(): void {
    this.isLoading = true;
    this.hasError = false;

    if (!this.numericId || isNaN(this.numericId)) {
      this.isLoading = false;
      this.hasError = true;
      return;
    }

    this.http.get<any>(`${BASE_URL}/Cases/${this.numericId}/detail`).subscribe({
      next: (detail) => {
        const c = detail.case;
        const p = detail.patient;
        const v = detail.vitalSigns;
        const rf = detail.riskFactors;
        const s = detail.symptoms;
        const nihss = detail.nihssAssessment;
        const ai = detail.aiReport;
        const attachments = detail.attachments ?? [];

        // Case info
        const caseDate = c.caseDate ? new Date(c.caseDate) : null;
        this.caseData.id = `SC-${new Date().getFullYear()}-${String(c.caseId).padStart(3, '0')}`;
        this.caseData.date = caseDate ? caseDate.toLocaleDateString() : '—';
        this.caseData.time = caseDate ? caseDate.toLocaleTimeString() : '—';

        // Patient info
        this.caseData.name   = p?.name   ?? '—';
        this.caseData.age    = p?.age    ?? 0;
        this.caseData.gender = p?.gender ?? '—';

        // AI Diagnosis
        this.caseData.aiDiagnosis = ai?.strokeType ?? '—';

        // NIHSS
        this.nihssTotal  = nihss?.totalScore   ?? 0;
        this.nihssResult = nihss?.severityLabel ?? '—';
        this.caseData.nihss = `${this.nihssTotal} (${this.nihssResult})`;
        if (nihss?.domainScores && typeof nihss.domainScores === 'object') {
          this.nihssScores = Object.entries(nihss.domainScores).map(([name, score]) => ({
            name,
            score: Number(score)
          }));
        }

        // Risk Factors
        if (rf) {
          const factors = [];
          if (rf.diabetes)         factors.push('Diabetes');
          if (rf.hypertension)     factors.push('Hypertension');
          if (rf.smoking)          factors.push('Smoking');
          if (rf.physicalInactive) factors.push('Physical Inactive');
          if (rf.heartDisease)     factors.push('Heart Disease');
          if (rf.highCholesterol)  factors.push('High Cholesterol');
          if (rf.obesity)          factors.push('Obesity');
          if (rf.previousStroke)   factors.push('Previous Stroke');
          if (rf.sleepApnea)       factors.push('Sleep Apnea');
          this.caseData.riskFactors = factors;
        }

        // Symptoms
        if (s?.selectedSymptoms) {
          this.caseData.symptoms = Array.isArray(s.selectedSymptoms)
            ? s.selectedSymptoms
            : s.selectedSymptoms.split(',').map((x: string) => x.trim());
        }

        // Vitals
        if (v) {
          this.caseData.vitals = {
            bloodPressure:    v.systolicBP && v.diastolicBP ? `${v.systolicBP}/${v.diastolicBP} mmHg` : '—',
            heartRate:        v.heartRate        ? `${v.heartRate} bpm`   : '—',
            respiratoryRate:  v.respiratoryRate  ? `${v.respiratoryRate}/min` : '—',
            oxygenSaturation: v.spO2             ? `${v.spO2}%`           : '—',
            temperature:      v.temperature      ? `${v.temperature}°${v.temperatureUnit ?? 'F'}` : '—',
            glucoseLevel:     v.glucoseLevel      ? `${v.glucoseLevel} mg/dL` : '—',
          };
        }

        // ECG/CT from AI report
        this.ecgImageResultText  = ai?.ecgImageResult  ?? '—';
        this.ecgSignalResultText = ai?.ecgSignalResult ?? '—';
        this.ctResultText        = ai?.ctScanResult    ?? '—';

        // Attachments
        const ecgImg  = attachments.find((a: any) => a.type === 'ECGImage');
        const ecgHea  = attachments.find((a: any) => a.type === 'ECGSignalHea');
        const ecgMat  = attachments.find((a: any) => a.type === 'ECGSignalMat');
        const ct1     = attachments.find((a: any) => a.type === 'CTImage1');
        const ct2     = attachments.find((a: any) => a.type === 'CTImage2');
        const pdf     = attachments.find((a: any) => a.type === 'DetailedTest');
        const extras  = attachments.filter((a: any) => a.type === 'Extra');

        this.caseData.files = {
          detailedTest:  pdf?.fileUrl    ?? '',
          ecgImage:      ecgImg?.fileUrl ?? '',
          ecgSignalHea:  ecgHea?.fileUrl ?? '',
          ecgSignalMat:  ecgMat?.fileUrl ?? '',
          ctImage1:      ct1?.fileUrl    ?? '',
          ctImage2:      ct2?.fileUrl    ?? '',
          extraImages:   extras.map((a: any) => a.fileUrl),
        };

        this.isLoading = false;
      },
      error: () => {
        this.hasError  = true;
        this.isLoading = false;
      }
    });
  }

  loadEcgResults(): void {
    if (!this.numericId || isNaN(this.numericId)) return;
    this.ecgService.getEcgResultsByCase(this.numericId).subscribe({
      next: (results) => {
        const imageResult = results.find(r => r.fileName?.match(/\.(png|jpg|jpeg|webp)$/i));
        if (imageResult) this.ecgImageResultText = imageResult.result;
        const signalResult = results.find(r => r.fileName?.match(/\.(mat|hea)$/i));
        if (signalResult) this.ecgSignalResultText = signalResult.result;
      },
      error: () => {}
    });
  }

  onEcgImageUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    this.ecgService.predictImage(this.numericId, file).subscribe({
      next: (res) => { if (res) this.ecgImageResultText = res.Class ?? res.result ?? 'Done'; },
      error: () => {}
    });
  }

  onEcgSignalUpload(event: any): void {
    const files = Array.from(event.target.files) as File[];
    if (!files.length) return;
    this.ecgService.analyzeSignal(this.numericId, files).subscribe({
      next: (res) => { if (res) this.ecgSignalResultText = res.result ?? 'Done'; },
      error: () => {}
    });
  }

  onCtImageUpload(event: any): void {
    const files = Array.from(event.target.files) as File[];
    if (!files.length) return;
    this.ecgService.predictStroke(this.numericId, files).subscribe({
      next: (res) => { if (res) this.ctResultText = res.diagnosis ?? 'Done'; },
      error: () => {}
    });
  }

  updateReadiness(): void {
    this.isSavingReadiness = true;
    this.readinessSaved = false;
    setTimeout(() => {
      this.isSavingReadiness = false;
      this.readinessSaved = true;
      setTimeout(() => this.readinessSaved = false, 3000);
    }, 800);
  }

  downloadFile(fileUrl: string, fileName: string): void {
    if (fileUrl && fileUrl.trim() !== '') {
      this.http.get(fileUrl, { responseType: 'blob' }).subscribe({
        next: (blob) => this.triggerDownload(blob, fileName),
        error: () => this.mockDownload(fileName)
      });
    } else {
      this.mockDownload(fileName);
    }
  }

  downloadImage(imageUrl: string, fileName: string): void {
    this.downloadFile(imageUrl, fileName);
  }

  private triggerDownload(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private mockDownload(fileName: string): void {
    const content = `Mock File\nCase ID: ${this.caseId}\nFile: ${fileName}\nGenerated: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    this.triggerDownload(blob, fileName);
  }

  openTracking(): void  { this.showTrackingModal = true; }
  closeTracking(): void { this.showTrackingModal = false; }
  goBack(): void        { this.location.back(); }
  onCallAmbulance(): void { window.location.href = 'tel:123'; }
}