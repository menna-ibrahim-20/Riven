import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";


@Component({
  selector: 'app-ecgicon',
  standalone: true,
  imports: [],
  templateUrl: './ecgicon.component.html',
  styleUrl: './ecgicon.component.css'
})
export class ECGIconComponent {

  @HostBinding("style.display") display = "contents";

  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
}
