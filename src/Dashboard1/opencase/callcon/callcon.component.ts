import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";
@Component({
  selector: 'app-callcon',
  standalone: true,
  imports: [],
  templateUrl: './callcon.component.html',
  styleUrl: './callcon.component.css'
})
export class CallconComponent {

 @HostBinding("style.display") display = "contents";

  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
}
