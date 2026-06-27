import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FramComponent } from '../fram/fram.component';
import { Webcasescard1Component, CaseFilters } from '../webcasescard1/webcasescard1.component';
import { WebcasescardComponent } from '../webcasescard/webcasescard.component';
import { CaseRow } from '../tablerow-stack/tablerow-stack.component';
import { CaseService } from '../case-services';

@Component({
  selector: 'app-root2',
  standalone: true,
  imports: [CommonModule, FramComponent, Webcasescard1Component, WebcasescardComponent],
  templateUrl: './root2.component.html',
  styleUrl: './root2.component.css'
})
export class Root2Component implements OnInit {

  @HostBinding('style.display') display = 'contents';

  filteredCases: CaseRow[] = [];
  allCases:      CaseRow[] = [];   // ← الـ full list للـ stats
  isLoading = false;

  private currentFilters: CaseFilters = { search: '', severity: '', status: '', date: '' };

  constructor(private caseService: CaseService) {}

  ngOnInit(): void {
    this.loadAllCases();   // ← load مرة للـ stats
    this.loadCases();      // ← load مع filters للجدول
  }

  onFiltersChange(filters: CaseFilters): void {
    this.currentFilters = filters;
    this.loadCases();
  }

  // كل الـ cases بدون filters عشان الـ stats تكون صح
  private loadAllCases(): void {
    this.caseService.getCases({ search: '', severity: '', status: '', date: '' }).subscribe({
      next: (data) => { this.allCases = data; },
      error: ()     => { this.allCases = [];  }
    });
  }

  // الـ cases اللي بتتعرض في الجدول (مع filters)
  private loadCases(): void {
    this.isLoading = true;
    this.caseService.getCases(this.currentFilters).subscribe({
      next: (data) => {
        this.filteredCases = data;
        this.isLoading     = false;
      },
      error: (err) => {
        console.error('Failed to load cases', err);
        this.filteredCases = [];
        this.isLoading     = false;
      }
    });
  }
}