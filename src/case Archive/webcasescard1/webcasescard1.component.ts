import { Component, HostBinding, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

export interface CaseFilters {
  search: string;
  severity: string;
  status: string;
  date: string;
}


@Component({
  selector: 'app-webcasescard1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './webcasescard1.component.html',
  styleUrl: './webcasescard1.component.css'
})

export class Webcasescard1Component implements OnDestroy {
  
  @HostBinding('style.display') display = 'contents';
  @Output() filtersChange = new EventEmitter<CaseFilters>();

  search = '';
  severity = '';
  status = '';
  date = '';

  showCalendar = false;
  calendarDate = new Date();

  readonly severityOptions = ['', 'Severe', 'Moderate', 'Mild'];
  readonly statusOptions   = ['', 'En Route', 'Completed', 'Pending'];

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => this.emit());
  }

  // ── Calendar ──
  get calendarYear()  { return this.calendarDate.getFullYear(); }
  get calendarMonth() { return this.calendarDate.getMonth(); }

  get monthName(): string {
    return this.calendarDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  get calendarDays(): (number | null)[] {
    const firstDay = new Date(this.calendarYear, this.calendarMonth, 1).getDay();
    const daysInMonth = new Date(this.calendarYear, this.calendarMonth + 1, 0).getDate();
    const days: (number | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }

  prevMonth(): void {
    this.calendarDate = new Date(this.calendarYear, this.calendarMonth - 1, 1);
  }

  nextMonth(): void {
    this.calendarDate = new Date(this.calendarYear, this.calendarMonth + 1, 1);
  }

  selectDay(day: number | null): void {
    if (!day) return;
    const selected = new Date(this.calendarYear, this.calendarMonth, day);
    this.date = selected.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    this.showCalendar = false;
    this.emit();
  }

  isSelectedDay(day: number | null): boolean {
    if (!day || !this.date) return false;
    const selected = new Date(this.date);
    return selected.getFullYear() === this.calendarYear &&
           selected.getMonth() === this.calendarMonth &&
           selected.getDate() === day;
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return today.getFullYear() === this.calendarYear &&
           today.getMonth() === this.calendarMonth &&
           today.getDate() === day;
  }

  toggleCalendar(): void { this.showCalendar = !this.showCalendar; }
  closeCalendar(): void  { this.showCalendar = false; }

  clearDate(): void {
    this.date = '';
    this.showCalendar = false;
    this.emit();
  }

  onSearchInput(): void  { this.searchSubject.next(this.search); }
  onFilterChange(): void { this.emit(); }

  private emit(): void {
    this.filtersChange.emit({
      search: this.search,
      severity: this.severity,
      status: this.status,
      date: this.date
    });
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}