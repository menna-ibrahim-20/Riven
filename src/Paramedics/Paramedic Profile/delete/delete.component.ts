import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})

export class DeleteComponent {
  @HostBinding("style.display") display = "contents";

  @Input() text: string = "Delete Paramedic";
  @Input() property1: string | number | undefined = "Default";
  @Output() deleteClick = new EventEmitter<void>();

  onDelete(): void {
    this.deleteClick.emit();
  }
}
