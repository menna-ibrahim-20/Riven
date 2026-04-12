import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { ParamedicColumnComponent } from '../paramedic-column/paramedic-column.component';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-winput-fields-icon',
  standalone: true,
  imports: [ParamedicColumnComponent,CommonModule],
  templateUrl: './winput-fields-icon.component.html',
  styleUrl: './winput-fields-icon.component.css'
})
export class WInputFieldsIconComponent {
  selectedStates: boolean[] = [false, false, false];

  toggleSelectAll() {
    const allSelected = this.selectedStates.every(s => s);
    this.selectedStates = this.selectedStates.map(() => !allSelected);
  }

  onParamedicChange(index: number, value: boolean) {
    const updated = [...this.selectedStates];
    updated[index] = value;
    this.selectedStates = updated;
  }
}