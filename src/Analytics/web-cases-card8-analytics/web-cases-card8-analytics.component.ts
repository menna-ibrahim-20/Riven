import { Component, HostBinding, Input, OnChanges, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

export interface ChartSeriesData { labels: string[]; actual: number[]; target?: number[]; }

@Component({
  selector: 'app-web-cases-card8-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-cases-card8-analytics.component.html',
  styleUrl: './web-cases-card8-analytics.component.css'
})
export class WebCasesCard8AnalyticsComponent implements AfterViewInit, OnChanges {
  @HostBinding('style.display') display = 'contents';
  @Input() chartData: ChartSeriesData = {
    labels: ['Week 1','Week 2','Week 3','Week 4'],
    actual: [12, 9, 8.7, 10],
    target: [10, 10, 10, 10],
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
    if (this.chartData.target) this.chart.data.datasets[1].data = this.chartData.target;
    this.chart.update();
  }

  private buildChart(): void {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: [
          { label: 'Actual Time', data: this.chartData.actual, borderColor: '#1976d2',
            backgroundColor: 'rgba(25,118,210,0.08)', fill: true, tension: 0.4,
            pointRadius: 5, pointBackgroundColor: '#1976d2' },
          { label: 'Target', data: this.chartData.target ?? [],
            borderColor: '#e53935', borderDash: [6, 4], pointRadius: 0, tension: 0, fill: false },
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } }, min: 5, max: 15 }
        }
      }
    });
  }
}