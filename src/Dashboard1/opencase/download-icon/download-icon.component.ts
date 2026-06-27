import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";
@Component({
  selector: 'app-download-icon',
  standalone: true,
  imports: [],
  templateUrl: './download-icon.component.html',
  styleUrl: './download-icon.component.css'
})
export class DownloadIconComponent {

 @HostBinding("style.display") display = "contents";

  /** Value props */
 @Input() download: string = "";
  @Input() property1: string = "";
  @Input() showDown: boolean = false;
}
