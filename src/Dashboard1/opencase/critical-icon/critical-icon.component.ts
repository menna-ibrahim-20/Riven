import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";
@Component({
  selector: 'app-critical-icon',
  standalone: true,
  imports: [],
  templateUrl: './critical-icon.component.html',
  styleUrl: './critical-icon.component.css'
})
export class CriticalIconComponent {

  @HostBinding("style.display") display = "contents";

  /** Value props */
  @Input() critical: string = "";
}
