import { DirectionComponent } from './../EmergencyActionButton/direction/direction.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { interval, Subscription, forkJoin } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { FrameComponentComponent } from '../frame-component/frame-component.component';
import { WebCardCATComponent } from '../web-card-cat/web-card-cat.component';
import { WebCardComponent } from '../web-card/web-card.component';
import { NavbarComponent } from '../../Navbar1/navbar/navbar.component';
import { DashboardService, IncomingCase, HandoverCase } from '../services';
import { EmergencyFabComponent } from '../emergency-fab/emergency-fab.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [   CommonModule,
    FrameComponentComponent,
    WebCardCATComponent,
    WebCardComponent,
    EmergencyFabComponent,DirectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent   implements OnInit, OnDestroy {
  incomingCases: IncomingCase[] = [];
  handoverCases: HandoverCase[] = [];
  isLoading = true;
  hasError = false;

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
          this.isLoading = false;
          this.hasError = false;
        },
        error: () => {
          this.isLoading = false;
          this.hasError = true;
        },
      });
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }

  openCase(id: string): void {
    this.router.navigate(['/dashboard/cases/open', id]); // ← التعديل هنا
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