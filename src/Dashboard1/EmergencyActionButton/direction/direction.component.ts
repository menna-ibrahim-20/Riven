import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-direction',
  standalone: true,
  imports: [],
  templateUrl: './direction.component.html',
  styleUrl: './direction.component.css'
})
export class DirectionComponent {

  @HostBinding("style.display") display = "contents";
  @Input() text: string = "Send Emergency Broadcast";
  @Input() property1: string | number | undefined = "Default";
  @Output() send = new EventEmitter<void>();

  onClick(): void {
    this.send.emit();
  }
}
