import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";
import { EyeComponent } from "../eye/eye.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface CaseRow {
  id: string;
  date: string;
  caseDate?: string;
  onsetTime?: string;
  handoverTime?: string;
  patientAge: string;
  patientGender: string;
  patient?: string;
  severity: 'Critical' | 'High' | 'Severe' | 'Moderate' | 'Mild';
  aiPrediction: string;
  status: 'Active' | 'En Route' | 'Completed' | 'Pending' | 'Handover';
  paramedic: string;
}

@Component({
  selector: 'app-tablerow-stack',
  standalone: true,
  imports: [EyeComponent, CommonModule],
  templateUrl: './tablerow-stack.component.html',
  styleUrl: './tablerow-stack.component.css'
})
export class TablerowStackComponent {
  @HostBinding('style.display') display = 'contents';
  @Input() caseRow!: CaseRow;
  @Output() viewCase = new EventEmitter<string>();

  constructor(private router: Router) {}

  onView(): void {
    this.router.navigate(['/dashboard/cases/open', this.caseRow.id]);
  }

  get patientDisplay(): string {
    return this.caseRow?.patient
      ?? [this.caseRow?.patientAge, this.caseRow?.patientGender].filter(Boolean).join(', ')
      ?? '—';
  }

  get aiPredictionDisplay(): string {
    return this.caseRow?.aiPrediction || '—';
  }

  get severityClass(): string {
    const map: Record<string, string> = {
      Critical: 'badge badge--critical',
      High:     'badge badge--severe',
      Severe:   'badge badge--severe',
      Moderate: 'badge badge--moderate',
      Mild:     'badge badge--mild'
    };
    return map[this.caseRow?.severity] ?? 'badge';
  }

  get statusClass(): string {
    const map: Record<string, string> = {
      'Active':    'badge badge--active',
      'En Route':  'badge badge--enroute',
      'Completed': 'badge badge--completed',
      'Pending':   'badge badge--pending',
      'Handover':  'badge badge--handover'
    };
    return map[this.caseRow?.status] ?? 'badge';
  }
}