import { Component, HostBinding, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-winput-fields-icon2',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './winput-fields-icon2.component.html',
  styleUrl: './winput-fields-icon2.component.css'
})
export class WInputFieldsIcon2Component {

  @HostBinding("style.display") display = "contents";
  
  selectedType: string = '';
  
  @Output() typeChange = new EventEmitter<string>();

  onTypeChange(): void {
    this.typeChange.emit(this.selectedType);
  }
}