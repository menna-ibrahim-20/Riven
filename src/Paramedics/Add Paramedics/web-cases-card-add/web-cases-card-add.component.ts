import { Component, HostBinding, OnInit, EventEmitter, ViewChild, ElementRef, Output, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { WInputFieldsIcon4AddComponent } from "../winput-fields-icon4-add/winput-fields-icon4-add.component";
import { Profile1AddComponent } from "../profile1-add/profile1-add.component";
import { Paramedic } from "../../Par.Service";

const BASE_URL = 'https://rivenbackend-production.up.railway.app/api';

interface AmbulanceDto {
  ambulanceId:       number;
  vehicleNumber:     string;
  operationalStatus: string;
}

@Component({
  selector: 'app-web-cases-card-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WInputFieldsIcon4AddComponent, Profile1AddComponent],
  templateUrl: './web-cases-card-add.component.html',
  styleUrl: './web-cases-card-add.component.css'
})
export class WebCasesCardAddComponent implements OnInit {

  @HostBinding("style.display") display = "contents";

  @Input() editMode     = false;
  @Input() initialData: any = null;

  @Output() close          = new EventEmitter<void>();
  @Output() paramedicAdded = new EventEmitter<Paramedic>();

  form: FormGroup;
  submitted    = false;
  isSaving     = false;
  saveSuccess  = false;
  saveError    = '';
  avatarPreview: string | null = null;

  ambulances: AmbulanceDto[] = [];
  ambulancesLoading = false;

  private roleMap: Record<string, number> = {
    'Paramedic':        3,
    'Senior Paramedic': 3,
    'Lead Paramedic':   3,
    'EMT':              3,
  };

  @ViewChild('modalBox') modalBox!: ElementRef;

  private get hospitalId(): number {
    return JSON.parse(localStorage.getItem('riven_user') || '{}')?.hospitalId ?? 0;
  }

  // ── extract numeric id from PM-005 → 5 ──
  private getNumericId(id: string): number {
    return parseInt(String(id).replace(/\D/g, ''), 10);
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName:  ['', [Validators.required, Validators.minLength(2)]],
      role:      ['', Validators.required],
      ambulance: ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      phone:     ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-().]{7,20}$/)]],
    });
  }

  ngOnInit(): void {
    this.loadAmbulances();

    if (this.editMode && this.initialData) {
      const nameParts = (this.initialData.name || '').split(' ');
      const firstName = nameParts[0] || '';
      const lastName  = nameParts.slice(1).join(' ') || '';

      this.form.patchValue({
        firstName,
        lastName,
        role:      this.initialData.role       || 'Paramedic',
        ambulance: this.initialData.ambulanceId || '',
        email:     this.initialData.email       || '',
        phone:     this.initialData.phone       || '',
      });

      this.avatarPreview = this.initialData.Paramedicimg || this.initialData.avatar || null;
    }
  }

  private loadAmbulances(): void {
    this.ambulancesLoading = true;
    this.http.get<AmbulanceDto[]>(`${BASE_URL}/ambulances/hospital/${this.hospitalId}`)
      .subscribe({
        next: (data) => {
          this.ambulances        = data;
          this.ambulancesLoading = false;
        },
        error: () => {
          this.ambulancesLoading = false;
          this.ambulances = [
            { ambulanceId: 1,  vehicleNumber: 'AMB-001', operationalStatus: 'Active' },
            { ambulanceId: 2,  vehicleNumber: 'AMB-002', operationalStatus: 'Active' },
            { ambulanceId: 3,  vehicleNumber: 'AMB-003', operationalStatus: 'Active' },
            { ambulanceId: 27, vehicleNumber: 'AMB-027', operationalStatus: 'Active' },
          ];
        }
      });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.touched || this.submitted));
  }

  onAvatarChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => { this.avatarPreview = e.target?.result as string; };
    reader.readAsDataURL(file);
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSaving    = true;
    this.saveSuccess = false;
    this.saveError   = '';

    const { firstName, lastName, email, phone, role, ambulance } = this.form.value;

    const avatarUrl = this.avatarPreview
      ?? `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0aa3b2&color=fff`;

    const ambulanceId = Number(ambulance);
    const roleId      = this.roleMap[role] ?? 3;

    if (this.editMode && this.initialData?.id) {
      // ── EDIT: PUT /api/users/{numericId} ──
      const numericId = this.getNumericId(this.initialData.id);

      const payload = {
        firstName,
        lastName,
        email,
        phoneNumber:    phone,
        password:       'Paramedic@123',
        roleId,
        hospitalId:     this.hospitalId,
        status:         this.initialData.status || 'Active',
        profilePicture: avatarUrl,
      };

      this.http.put(`${BASE_URL}/users/${numericId}`, payload)
        .subscribe({
          next: () => {
            this.isSaving    = false;
            this.saveSuccess = true;
            const updated: Paramedic = {
              id:         this.initialData.id,
              name:       `${firstName} ${lastName}`,
              status:     this.initialData.status || 'online',
              ambulance:  this.ambulances.find(a => a.ambulanceId === ambulanceId)?.vehicleNumber || this.initialData.ambulance || '—',
              ambulanceId,
              totalCases: this.initialData.totalCases || 0,
              avgTime:    this.initialData.avgTime    || '—',
              lastActive: 'Active now',
              email,
              phone,
            };
            this.paramedicAdded.emit(updated);
            setTimeout(() => this.onClose(), 1200);
          },
          error: (err) => {
            this.isSaving  = false;
            this.saveError = err?.error?.message || 'Failed to update paramedic.';
          }
        });

    } else {
      // ── ADD: POST /api/users ──
      const payload = {
        firstName,
        lastName,
        email,
        phoneNumber:    phone,
        password:       'Paramedic@123',
        roleId,
        hospitalId:     this.hospitalId,
        status:         'Active',
        profilePicture: avatarUrl,
      };

      this.http.post<any>(`${BASE_URL}/users`, payload)
        .subscribe({
          next: (res) => {
            this.isSaving    = false;
            this.saveSuccess = true;
            const added: Paramedic = {
              id:         `PM-${String(res.userId ?? res.id).padStart(3, '0')}`,
              name:       `${firstName} ${lastName}`,
              status:     'online',
              ambulance:  this.ambulances.find(a => a.ambulanceId === ambulanceId)?.vehicleNumber || '—',
              ambulanceId,
              totalCases: 0,
              avgTime:    '—',
              lastActive: 'Active now',
              email,
              phone,
            };
            this.paramedicAdded.emit(added);
            setTimeout(() => this.onClose(), 1200);
          },
          error: (err) => {
            this.isSaving  = false;
            this.saveError = err?.error?.message || 'An unexpected error occurred.';
          }
        });
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if (this.modalBox && !this.modalBox.nativeElement.contains(event.target)) {
      this.onClose();
    }
  }
}