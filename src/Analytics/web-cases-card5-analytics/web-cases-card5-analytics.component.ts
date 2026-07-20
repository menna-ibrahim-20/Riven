import { Component, HostBinding, Input, OnChanges, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

export interface HourlyData { labels: string[]; data: number[]; }

@Component({
  selector: 'app-web-cases-card5-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-cases-card5-analytics.component.html',
  styleUrl: './web-cases-card5-analytics.component.css'
})
export class WebCasesCard5AnalyticsComponent implements AfterViewInit, OnChanges {
  @HostBinding('style.display') display = 'contents';
  @Input() chartData: HourlyData = {
    labels: ['00-04','04-08','08-12','12-16','16-20','20-24'],
    data:   [1, 2, 6, 8, 5, 3],
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
    this.chart.data.datasets[0].data = this.chartData.data;
    this.chart.update();
  }

  private buildChart(): void {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartData.labels,
        datasets: [{ label: 'Cases', data: this.chartData.data,
          backgroundColor: '#08848d', borderRadius: 8, barPercentage: 0.6 }]
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