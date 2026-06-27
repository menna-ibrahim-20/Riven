import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { WebCasesCard2Component } from '../web-cases-card2/web-cases-card2.component';
import { HomeIconComponent } from '../home-icon/home-icon.component';
import { CtIconComponent } from '../ct-icon/ct-icon.component';
import { ECGIconComponent } from '../ecgicon/ecgicon.component';
import { CriticalIconComponent } from "../critical-icon/critical-icon.component";
import { ImageIconComponent } from "../image-icon/image-icon.component";
import { DownloadIconComponent } from "../download-icon/download-icon.component";
import { CasesLIconComponent } from "../cases-licon/cases-licon.component";
import { WebCasesCard3Component } from "../web-cases-card3/web-cases-card3.component";
import { ActionCardsComponent } from "../action-cards/action-cards.component";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-root',
  standalone: true,
  imports: [ WebCasesCard2Component,
    HomeIconComponent,
    CriticalIconComponent,
    ImageIconComponent,
    DownloadIconComponent,
    CasesLIconComponent,
    CtIconComponent,
    ECGIconComponent,
    WebCasesCard3Component,
    ActionCardsComponent,
    RouterOutlet,],
  templateUrl: './dashboard-root.component.html',
  styleUrl: './dashboard-root.component.css'
})
export class DashboardRootComponent {
 @HostBinding("style.display") display = "contents";

constructor(private router: Router) {}
  openCase(id: string): void {
  this.router.navigate(['/dashboard/cases/open', id]);
}
}