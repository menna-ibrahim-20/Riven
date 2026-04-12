import { Component, ViewEncapsulation, HostBinding, OnInit, EventEmitter, ViewChild, ElementRef,Output,Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WInputFieldsIcon4AddComponent } from "../winput-fields-icon4-add/winput-fields-icon4-add.component";
import { Profile1AddComponent } from "../profile1-add/profile1-add.component";
import { Paramedic } from "../../Par.Service";

@Component({
  selector: 'app-web-cases-card-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WInputFieldsIcon4AddComponent, Profile1AddComponent],
  templateUrl: './web-cases-card-add.component.html',
  styleUrl: './web-cases-card-add.component.css'
})

export class WebCasesCardAddComponent implements OnInit {

  @HostBinding("style.display") display = "contents";

  @Input() editMode    = false;
  @Input() initialData: any = null;

  @Output() close          = new EventEmitter<void>();
  @Output() paramedicAdded = new EventEmitter<Paramedic>();

  form: FormGroup;
  submitted   = false;
  isSaving    = false;
  saveSuccess = false;
  avatarPreview: string | null = null;

  @ViewChild('modalBox') modalBox!: ElementRef;

  constructor(private fb: FormBuilder) {
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
    if (this.editMode && this.initialData) {
      const nameParts = (this.initialData.name || '').split(' ');
      const firstName = nameParts[0] || '';
      const lastName  = nameParts.slice(1).join(' ') || '';

      this.form.patchValue({
        firstName,
        lastName,
        role:      this.initialData.role      || '',
        ambulance: this.initialData.ambulance  || '',
        email:     this.initialData.email      || '',
        phone:     this.initialData.phone      || '',
      });

      this.avatarPreview = this.initialData.Paramedicimg || this.initialData.avatar || null;
    }
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

    const { firstName, lastName, role, ambulance, email, phone } = this.form.value;

    const paramedic: Paramedic = {
      id: this.editMode && this.initialData?.id
            ? this.initialData.id
            : `PM-${String(Date.now()).slice(-3)}`,
      name:       `${firstName} ${lastName}`,
      status:     'online',
      ambulance,
      totalCases: this.editMode && this.initialData?.totalCases
                    ? this.initialData.totalCases : 0,
      avgTime:    this.editMode && this.initialData?.avgTime
                    ? this.initialData.avgTime : '—',
      lastActive: 'Active now',
    };

    setTimeout(() => {
      this.isSaving    = false;
      this.saveSuccess = true;
      this.paramedicAdded.emit(paramedic);
      setTimeout(() => this.onClose(), 1200);
    }, 800);
  }

  onOverlayClick(event: MouseEvent): void {
    if (this.modalBox && !this.modalBox.nativeElement.contains(event.target)) {
      this.onClose();
    }
  }
}