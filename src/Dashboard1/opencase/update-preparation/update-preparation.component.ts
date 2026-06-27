import { Component, ViewEncapsulation, HostBinding, Input, } from "@angular/core";

@Component({
  selector: 'app-update-preparation',
  standalone: true,
  imports: [],
  templateUrl: './update-preparation.component.html',
  styleUrl: './update-preparation.component.css'
})
export class UpdatePreparationComponent {

  @HostBinding("style.display") display = "contents";

  /** Value props */
  @Input() text: string = "• Patient Room Ready";
  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
}
