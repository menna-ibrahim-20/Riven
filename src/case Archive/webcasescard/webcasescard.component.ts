import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerowStackComponent, CaseRow } from '../tablerow-stack/tablerow-stack.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webcasescard',
  standalone: true,
  imports: [TablerowStackComponent, CommonModule],
  templateUrl: './webcasescard.component.html',
  styleUrl: './webcasescard.component.css'
})

export class WebcasescardComponent {
  @HostBinding('style.display') display = 'contents';
  @Input() cases: CaseRow[] = [];
  isLoading = false;
  constructor(private router: Router) {}
  trackById(_: number, row: CaseRow): string { return row.id; }
  onViewCase(caseId: string): void {
    this.router.navigate(['/dashboard/cases/open', caseId]);
    // this.router.navigate(['/cases', caseId]);
  }
}




