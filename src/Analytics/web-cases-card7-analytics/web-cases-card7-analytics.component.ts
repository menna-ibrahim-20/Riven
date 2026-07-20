import { Component, HostBinding, Input, OnChanges, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

export interface ChartSeriesData { labels: string[]; actual: number[]; average?: number[]; }

@Component({
  selector: 'app-web-cases-card7-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-cases-card7-analytics.component.html',
  styleUrl: './web-cases-card7-analytics.component.css'
})
export class WebCasesCard7AnalyticsComponent implements AfterViewInit, OnChanges {
  @HostBinding('style.display') display = 'contents';
  @Input() chartData: ChartSeriesData = {
    labels:  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    actual:  [5, 8, 6, 7, 9, 3, 2],
    average: [6, 6, 6, 6, 6, 6, 6],
  };
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      Chart.register(...registerables);
      this.buildChart();
    }
  }

  ngOnChanges(): void {
    if (!this.chart) return;
    this.chart.data.labels = this.chartData.labels;
    this.chart.data.datasets[0].data = this.chartData.actual;
    if (this.chartData.average) this.chart.data.datasets[1].data = this.chartData.average;
    this.chart.update();
  }

  private buildChart(): void {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartData.labels,
        datasets: [
          { label: 'Actual',  data: this.chartData.actual,          backgroundColor: '#1976d2', borderRadius: 8, barPercentage: 0.5 },
          { label: 'Average', data: this.chartData.average ?? [],   backgroundColor: '#d6dadd', borderRadius: 8, barPercentage: 0.5 },
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { autoSkip: false, color: '#6e7477', font: { size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } }, beginAtZero: true }
        }
      }
    });
  }
}