import { Component,ViewEncapsulation, HostBinding } from '@angular/core';
import { ParamedicIconComponent } from '../paramedic-icon/paramedic-icon.component';
import { HopitalIconComponent } from '../hopital-icon/hopital-icon.component';
import { UpdatePreparationComponent } from '../update-preparation/update-preparation.component';
import { VitalsInfoComponent } from '../vitals-info/vitals-info.component';
import { ImageIconComponent } from '../image-icon/image-icon.component';
import { DownloadIconComponent } from '../download-icon/download-icon.component';
import { CallComponent } from '../call/call.component';
@Component({
  selector: 'app-action-cards',
  standalone: true,
  imports: [  ParamedicIconComponent,
    CallComponent,
    HopitalIconComponent,
    UpdatePreparationComponent,
    VitalsInfoComponent,
    ImageIconComponent,
    DownloadIconComponent],
  templateUrl: './action-cards.component.html',
  styleUrl: './action-cards.component.css'
})
export class ActionCardsComponent {

  @HostBinding("style.display") display = "contents";

  onDirectionClick() {
    // Please sync "Live Tracking" to the project
  }
}
