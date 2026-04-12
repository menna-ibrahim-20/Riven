import { Component,  ViewEncapsulation, HostBinding,Input, } from '@angular/core';
import { ProfileComponent } from '../../Settings/profile/profile.component';
import { NavItemComponent } from '../nav-item/nav-item.component';
import { CasesComponent } from '../../case Archive/cases/cases.component';
import { ParamedicComponent } from '../../Paramedics/paramedic/paramedic.component';
import { AnalyticsComponent } from '../../Analytics/analytics/analytics.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-web-nav',
  standalone: true,
  imports: [
    NavItemComponent,
    CasesComponent,
    ParamedicComponent,
    AnalyticsComponent,
    ProfileComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './web-nav.component.html',
  styleUrl: './web-nav.component.css'
})

export class WebNavComponent {

   @HostBinding('style.display') display = 'contents';
}







