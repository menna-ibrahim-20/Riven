import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";
@Component({
  selector: 'app-ct-icon',
  standalone: true,
  imports: [],
  templateUrl: './ct-icon.component.html',
  styleUrl: './ct-icon.component.css'
})
export class CtIconComponent {

  @HostBinding("style.display") display = "contents";
}
