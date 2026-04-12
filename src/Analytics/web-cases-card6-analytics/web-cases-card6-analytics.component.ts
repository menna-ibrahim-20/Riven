import { Component, HostBinding, Input, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export interface HourlyData { labels: string[]; data: number[]; }

@Component({
  selector: 'app-web-cases-card6-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-cases-card6-analytics.component.html',
  styleUrl: './web-cases-card6-analytics.component.css'
})
export class WebCasesCard6AnalyticsComponent  implements AfterViewInit, OnChanges {
  @HostBinding('style.display') display = 'contents';
  @Input() chartData: HourlyData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun'],
    data:   [88, 90, 91, 89, 93, 94],
  };
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  ngAfterViewInit(): void { this.buildChart(); }
  ngOnChanges(): void {
    if (!this.chart) return;
    this.chart.data.labels = this.chartData.labels;
    this.chart.data.datasets[0].data = this.chartData.data;
    this.chart.update();
  }

  private buildChart(): void {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: [{ label: 'Success Rate', data: this.chartData.data,
          borderColor: '#0fa573', backgroundColor: 'rgba(15,165,115,0.08)',
          fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: '#0fa573' }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { color: '#6e7477', font: { size: 11 }, callback: (v) => v + '%' },
            min: 80, max: 100 }
        }
      }
    });
  }
}
