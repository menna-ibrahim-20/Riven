import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";

@Component({
  selector: 'app-image-icon',
  standalone: true,
  imports: [],
  templateUrl: './image-icon.component.html',
  styleUrl: './image-icon.component.css'
})
export class ImageIconComponent {

  @HostBinding("style.display") display = "contents";
}
