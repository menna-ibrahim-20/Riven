import { CommonModule } from "@angular/common";
import { Component, ChangeDetectorRef, HostBinding, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-paramedic-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paramedic-column.component.html',
  styleUrl: './paramedic-column.component.css'
})
export class ParamedicColumnComponent {

  @HostBinding("style.display") display = "contents";

  @Input() profile:     string  = "";
  @Input() isSelected:  boolean = false;
  @Input() name:        string  = "Unknown";
  @Input() paramedicId: string  = "—";
  @Input() status:      string  = "offline";
  @Input() ambulance:   string  = "—";
  @Input() totalCases:  number  = 0;
  @Input() avgTime:     string  = "—";
  @Input() lastActive:  string  = "—";

  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(private cdr: ChangeDetectorRef) {}

  toggleCheck(): void {
    this.isSelected = !this.isSelected;
    this.selectedChange.emit(this.isSelected);
    this.cdr.markForCheck();
  }

  onCheckChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.isSelected = checked;
    this.selectedChange.emit(checked);
    this.cdr.markForCheck();
  }
}