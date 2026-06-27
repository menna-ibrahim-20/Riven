import { WebCardCATComponent } from '../web-card-cat/web-card-cat.component';
import { Component,ViewEncapsulation,HostBinding,Input, } from '@angular/core';

@Component({
  selector: 'app-web-cases-card',
  standalone: true,
  imports: [WebCardCATComponent],
  templateUrl: './web-cases-card.component.html',
  styleUrl: './web-cases-card.component.css'
})
export class WebCasesCardComponent {

  @HostBinding('style.display') display = 'contents';

  @Input() time: string = '';
  @Input() property11: string | number | undefined = '';
  @Input() text: string = '';
  @Input() property1: string | number | undefined = 'Incomming';
}


