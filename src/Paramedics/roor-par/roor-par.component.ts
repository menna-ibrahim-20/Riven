import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil, forkJoin } from 'rxjs';
import { ParamedicService, Paramedic, ParamedicStats } from '../Par.Service';
import { FrameParComponent } from '../frame-par/frame-par.component';
import { WebCasesCard2ParComponent } from '../web-cases-card2-par/web-cases-card2-par.component';
import { WebCasesCard1ParComponent } from '../web-cases-card1-par/web-cases-card1-par.component';
import { EmergencyFabComponent } from '../../Dashboard1/emergency-fab/emergency-fab.component';
import { WebCasesCardAddComponent } from '../Add Paramedics/web-cases-card-add/web-cases-card-add.component';

@Component({
  selector: 'app-roor-par',
  standalone: true,
  imports: [
    CommonModule,
    FrameParComponent,
    WebCasesCard2ParComponent,
    WebCasesCard1ParComponent,
    EmergencyFabComponent,
    WebCasesCardAddComponent
  ],
  templateUrl: './roor-par.component.html',
  styleUrl: './roor-par.component.css'
})
export class RoorParComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading      = true;
  isRefreshing   = false;
  hasError       = false;
  searchQuery    = '';
  showAddModal   = false;

  stats: ParamedicStats = { total: 0, active: 0, avgTime: '—', casesThisWeek: 0 };
  paramedics:         Paramedic[] = [];
  filteredParamedics: Paramedic[] = [];

  constructor(
    private paramedicService: ParamedicService,
    private router: Router
  ) {}

  ngOnInit(): void { this.loadData(); }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(silent = false): void {
    if (!silent) this.isLoading = true;
    else         this.isRefreshing = true;
    this.hasError = false;

    forkJoin({
      stats:      this.paramedicService.getStats(),
      paramedics: this.paramedicService.getParamedics(),
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: ({ stats, paramedics }) => {
        this.stats              = stats;
        this.paramedics         = paramedics;
        this.isLoading          = false;
        this.isRefreshing       = false;
        const q = this.searchQuery.toLowerCase().trim();
        this.filteredParamedics = q
          ? paramedics.filter(p =>
              p.name.toLowerCase().includes(q)      ||
              p.id.toLowerCase().includes(q)        ||
              p.ambulance.toLowerCase().includes(q)
            )
          : [...paramedics];
      },
      error: () => {
        this.hasError     = true;
        this.isLoading    = false;
        this.isRefreshing = false;
      },
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    const q = query.toLowerCase().trim();
    this.filteredParamedics = q
      ? this.paramedics.filter(p =>
          p.name.toLowerCase().includes(q)      ||
          p.id.toLowerCase().includes(q)        ||
          p.ambulance.toLowerCase().includes(q)
        )
      : [...this.paramedics];
  }

  onAddParamedic(): void {
    this.showAddModal = true;
  }

  onParamedicAdded(newParamedic: Paramedic): void {
    this.showAddModal = false;
    // reload silently without showing loading spinner
    this.loadData(true);
  }

  onViewParamedic(p: Paramedic): void {
    this.router.navigate(['/dashboard/paramedic', p.id.replace('PM-', '')]);
  }
}