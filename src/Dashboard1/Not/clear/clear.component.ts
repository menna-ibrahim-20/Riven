import { Component, ViewEncapsulation, HostBinding, Input,}from "@angular/core";

@Component({
  selector: 'app-clear',
  standalone: true,
  imports: [],
  templateUrl: './clear.component.html',
  styleUrl: './clear.component.css'
})
export class ClearComponent {
  @HostBinding("style.display") display = "contents";

  @Input() property1: string | number | undefined = "Default";
}