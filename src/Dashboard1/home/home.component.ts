import { DirectionComponent } from './../EmergencyActionButton/direction/direction.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { interval, Subscription, forkJoin } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { FrameComponentComponent, OverviewStats } from '../frame-component/frame-component.component';
import { WebCardCATComponent } from '../web-card-cat/web-card-cat.component';
import { WebCardComponent } from '../web-card/web-card.component';
import { DashboardService, IncomingCase, HandoverCase } from '../services';
import { EmergencyFabComponent } from '../emergency-fab/emergency-fab.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FrameComponentComponent,
    WebCardCATComponent,
    WebCardComponent,
    EmergencyFabComponent,
    DirectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  incomingCases: IncomingCase[] = [];
  handoverCases: HandoverCase[]  = [];
  isLoading = true;
  hasError  = false;

  overviewStats: OverviewStats = {
    casesThisWeek:    '—',
    enRoute:          '—',
    activeParamedics: '—',
    availableBeds:    '—',
  };

  private refreshSub?: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.refreshSub = interval(30_000)
      .pipe(
        startWith(0),
        switchMap(() =>
          forkJoin({
            incoming: this.dashboardService.getIncomingCases(),
            handover: this.dashboardService.getHandoverCases(),
          })
        )
      )
      .subscribe({
        next: ({ incoming, handover }) => {
          this.incomingCases = incoming;
          this.handoverCases = handover;
          this.isLoading     = false;
          this.hasError      = false;
          this.overviewStats = this.computeStats(incoming, handover);
        },
        error: () => {
          this.isLoading = false;
          this.hasError  = true;
        },
      });
  }

  private computeStats(
    incoming: IncomingCase[],
    handover: HandoverCase[]
  ): OverviewStats {
    const totalCases     = incoming.length + handover.length;
    const enRoute        = incoming.filter(c => c.eta !== 'Arrived').length;
    const arrivedNow     = incoming.filter(c => c.eta === 'Arrived').length;
    const handoverCount  = handover.length;

    // unique paramedics across both lists
    const allParamedics  = [
      ...incoming.map(c => c.paramedic),
      ...handover.map(c => c.paramedic),
    ].filter(p => p && p !== 'N/A');
    const uniqueParamedics = new Set(allParamedics).size;

    return {
      casesThisWeek:    String(totalCases),
      enRoute:          String(enRoute),
      activeParamedics: String(uniqueParamedics),
      availableBeds:    String(handoverCount),
    };
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }

  openCase(id: string): void {
    this.router.navigate(['/dashboard/cases/open', id]);
  }

  viewDetails(id: string): void {
    this.router.navigate(['/dashboard/cases/details', id]);
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'Severe':   return 'tag-severe';
      case 'Moderate': return 'tag-moderate';
      default:         return 'tag-mild';
    }
  }

  trackById(_: number, item: { id: string }): string {
    return item.id;
  }
}