import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: 'app-file1',
  standalone: true,
  imports: [],
  templateUrl: './file1.component.html',
  styleUrl: './file1.component.css'
})
export class File1Component {

  @HostBinding("style.display") display = "contents";
}
