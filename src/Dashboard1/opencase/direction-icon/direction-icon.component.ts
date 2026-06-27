import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";
@Component({
  selector: 'app-direction-icon',
  standalone: true,
  imports: [],
  templateUrl: './direction-icon.component.html',
  styleUrl: './direction-icon.component.css'
})
export class DirectionIconComponent {

  @HostBinding("style.display") display = "contents";

  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
}
