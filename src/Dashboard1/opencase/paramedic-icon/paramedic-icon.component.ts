import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";

@Component({
  selector: 'app-paramedic-icon',
  standalone: true,
  imports: [],
  templateUrl: './paramedic-icon.component.html',
  styleUrl: './paramedic-icon.component.css'
})
export class ParamedicIconComponent {

  @HostBinding("style.display") display = "contents";
}
