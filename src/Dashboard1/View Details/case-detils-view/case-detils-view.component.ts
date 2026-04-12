import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-case-detils-view',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './case-detils-view.component.html',
  styleUrl: './case-detils-view.component.css'
})
export class CaseDetilsViewComponent   implements OnInit {

  showTrackingModal = false;
  isLoading = true;
  hasError = false;
  caseId = '';
  isSavingReadiness = false;
  readinessSaved = false;

  caseData = {
    id: 'EMG-2024-A2849',
    date: '11/20/2025',
    time: '11:28 PM',
    name: 'Alex Rodrigo',
    age: 65,
    gender: 'Male',
    aiDiagnosis: 'Ischemic Stroke',
    nihss: '26 (Severe Stroke)',
    riskFactors: ['Diabetes', 'Hypertension', 'Smoking', 'Physical Inactive'],
    symptoms: ['Loss of balance and coordination', 'Nausea and vomiting', 'Dizziness or vertigo'],
    vitals: {
      bloodPressure: '165/95 mmHg',
      heartRate: '88 bpm',
      respiratoryRate: '18/min',
      oxygenSaturation: '94%',
      temperature: '98.6°F',
      glucoseLevel: '145 mg/dL'
    },
    nihssScores: [
      { name: 'Level of Consciousness', score: 1 },
      { name: 'Gaze', score: 2 },
      { name: 'Visual Fields', score: 2 },
      { name: 'Facial Palsy', score: 3 },
      { name: 'Motor Arm', score: 4 },
      { name: 'Limb Ataxia', score: 0 },
      { name: 'Sensory', score: 1 },
      { name: 'Language', score: 2 },
      { name: 'Dysarthria', score: 1 },
      { name: 'Extinction/Inattention', score: 0 },
    ],
    nihssTotal: 18,
    nihssMax: 42,
    nihssResult: 'Ischemic Stroke',
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
      extraImages: ['', '', '']
    }
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id') || '';
    this.loadCase();
  }

  loadCase(): void {
    this.isLoading = true;
    // TODO: Real API
    // this.http.get<any>(`YOUR_API_URL/cases/${this.caseId}`).subscribe({
    //   next: (data) => { this.caseData = data; this.isLoading = false; },
    //   error: () => { this.hasError = true; this.isLoading = false; }
    // });
    setTimeout(() => { this.isLoading = false; }, 300);
  }

  updateReadiness(): void {
    this.isSavingReadiness = true;
    this.readinessSaved = false;
    // TODO: Real API
    // this.http.put(`YOUR_API_URL/cases/${this.caseId}/readiness`,
    //   { readiness: this.caseData.hospitalReadiness }
    // ).subscribe({
    //   next: () => { this.isSavingReadiness = false; this.readinessSaved = true;
    //     setTimeout(() => this.readinessSaved = false, 3000); },
    //   error: () => { this.isSavingReadiness = false; }
    // });
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

  openTracking(): void { this.showTrackingModal = true; }
  closeTracking(): void { this.showTrackingModal = false; }
  goBack(): void { this.location.back(); }
  onCallAmbulance(): void { window.location.href = 'tel:123'; }

  get nihssPercentage(): number {
    return (this.caseData.nihssTotal / this.caseData.nihssMax) * 100;
  }
}