import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";

@Component({
  selector: 'app-home-icon',
  standalone: true,
  imports: [],
  templateUrl: './home-icon.component.html',
  styleUrl: './home-icon.component.css'
})
export class HomeIconComponent {

  @HostBinding("style.display") display = "contents";
}
