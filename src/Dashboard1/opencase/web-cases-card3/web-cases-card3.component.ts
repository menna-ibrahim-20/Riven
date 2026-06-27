import { Component, ViewEncapsulation, HostBinding,Input } from "@angular/core";

@Component({
  selector: 'app-web-cases-card3',
  standalone: true,
  imports: [],
  templateUrl: './web-cases-card3.component.html',
  styleUrl: './web-cases-card3.component.css'
})
export class WebCasesCard3Component {

  @HostBinding("style.display") display = "contents";

  /** Value props */
  @Input() text: string = "• Level of Consciousness";
  /** Variant props */
  @Input() property1: string | number | undefined = "NIHSS W Scores";
}
