import { Component ,ViewEncapsulation, HostBinding ,OnInit,OnDestroy} from '@angular/core';
import { CommonModule } from "@angular/common";
import { WebCardComponent } from '../web-card/web-card.component';
import { Subscription } from 'rxjs';
import { DashboardService,OverviewItem } from '../services';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-frame-component',
  standalone: true,
  imports: [ WebCardComponent, CommonModule],
  templateUrl: './frame-component.component.html',
  styleUrl: './frame-component.component.css'
})


export class FrameComponentComponent implements OnInit {
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.width') width = '100%';

  stats = {
    casesThisWeek: '24',
    enRoute: '2',
    activeParamedics: '5',
    availableBeds: '4'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // TODO: لما يجي الـ API الحقيقي اشيل الـ comment
    // this.loadStats();
  }

  loadStats() {
    // TODO: استبدل YOUR_API_URL بالـ URL الحقيقي
    // this.http.get<any>(`${environment.apiUrl}/dashboard/stats`).subscribe({
    //   next: (data) => {
    //     this.stats.casesThisWeek = data.casesThisWeek;
    //     this.stats.enRoute = data.enRoute;
    //     this.stats.activeParamedics = data.activeParamedics;
    //     this.stats.availableBeds = data.availableBeds;
    //   },
    //   error: (err) => console.error(err)
    // });
  }
}