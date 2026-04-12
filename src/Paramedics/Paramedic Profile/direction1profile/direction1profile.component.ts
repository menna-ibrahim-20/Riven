import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-direction1profile',
  standalone: true,
  imports: [],
  templateUrl: './direction1profile.component.html',
  styleUrl: './direction1profile.component.css'
})
export class Direction1profileComponent {
  @HostBinding("style.display") display = "contents";

  @Input() text: string = "Edit Paramedic Profile";
  @Input() property1: string | number | undefined = "Default";
  @Output() editClick = new EventEmitter<void>();

  onEdit(): void {
    this.editClick.emit();
  }
}
