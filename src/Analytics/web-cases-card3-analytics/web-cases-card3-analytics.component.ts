import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-web-cases-card3-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './web-cases-card3-analytics.component.html',
  styleUrl: './web-cases-card3-analytics.component.css'
})

export class WebCasesCard3AnalyticsComponent  {
  @HostBinding('style.display') display = 'contents';

  @Input()  reportType: string  = '';
  @Input()  dateFrom:   string  = '';
  @Input()  dateTo:     string  = '';
  @Input()  isLoading:  boolean = false;
  @Input()  errorMsg:   string  = '';

  @Output() reportTypeChange = new EventEmitter<string>();
  @Output() dateFromChange   = new EventEmitter<string>();
  @Output() dateToChange     = new EventEmitter<string>();
  @Output() generate         = new EventEmitter<void>();

  onReportTypeChange(value: string): void {
    this.reportTypeChange.emit(value);
  }

  onDateFromChange(value: string): void {
    this.dateFromChange.emit(value);
  }

  onDateToChange(value: string): void {
    this.dateToChange.emit(value);
  }

  getLabel(value: string): string {
  const map: Record<string, string> = {
    weekly:    'Weekly',
    monthly:   'Monthly',
    quarterly: 'Quarterly',
  };
  return map[value] || value;
}
}