import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-webcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './webcard.component.html',
  styleUrl: './webcard.component.css'
})
export class WebcardComponent {
  @HostBinding('style.display') display = 'contents';

  @Input() separatorA: string = 'Total Cases';
  @Input() text: string = 'All time';
  @Input() num: string = '6';
  @Input() iconBg: string = '#fff7e6';
  @Input() iconColor: string = '#854f0b';
  @Input() iconClass: string = 'fa-solid fa-users';
  @Input() separatorAColor: string = '';
  @Input() casesThisWeekColor: string = '';
  @Input() property1: 'Default' | 'Hover' = 'Default';

  get iconBgStyle()     { return { background: this.iconBg }; }
  get iconColorStyle()  { return { color: this.iconColor }; }
  get separatorAStyle() { return this.separatorAColor ? { color: this.separatorAColor } : {}; }
  get subTextStyle()    { return this.casesThisWeekColor ? { color: this.casesThisWeekColor } : {}; }
}