import { Component, HostBinding, Input, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export interface SeverityData { mild: number; moderate: number; severe: number; }


@Component({
  selector: 'app-web-cases-card4-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-cases-card4-analytics.component.html',
  styleUrl: './web-cases-card4-analytics.component.css'
})
export class WebCasesCard4AnalyticsComponent implements AfterViewInit, OnChanges {
  @HostBinding('style.display') display = 'contents';
  @Input() severity: SeverityData = { mild: 1, moderate: 2, severe: 3 };
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  ngAfterViewInit(): void { this.buildChart(); }
  ngOnChanges(): void {
    if (!this.chart) return;
    this.chart.data.datasets[0].data = [this.severity.mild, this.severity.moderate, this.severity.severe];
    this.chart.update();
  }

  get total():   number { return this.severity.mild + this.severity.moderate + this.severity.severe; }
  get mildPct(): number { return Math.round(this.severity.mild     / this.total * 100); }
  get modPct():  number { return Math.round(this.severity.moderate / this.total * 100); }
  get sevPct():  number { return Math.round(this.severity.severe   / this.total * 100); }

  private buildChart(): void {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Mild','Moderate','Severe'],
        datasets: [{ data: [this.severity.mild, this.severity.moderate, this.severity.severe],
          backgroundColor: ['#1976d2','#f59e0b','#e53935'], borderWidth: 0, hoverOffset: 6 }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { display: false } } }
    });
  }
}
