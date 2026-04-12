import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";

@Component({
  selector: 'app-hopital-icon',
  standalone: true,
  imports: [],
  templateUrl: './hopital-icon.component.html',
  styleUrl: './hopital-icon.component.css'
})
export class HopitalIconComponent {

  @HostBinding("style.display") display = "contents";
}
