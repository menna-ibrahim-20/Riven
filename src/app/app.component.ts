import { WebCasesCardComponent } from '../Dashboard1/web-cases-card/web-cases-card.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "../auth/login/login.component";
import { FrameComponentComponent } from "../Dashboard1/frame-component/frame-component.component";
import { WebCardComponent } from '../Dashboard1/web-card/web-card.component';
import { RootComponent } from '../Dashboard1/root/root.component';
import { WebCardCATComponent } from '../Dashboard1/web-card-cat/web-card-cat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent,],
  template:  ` <div>
      <router-outlet></router-outlet>
    </div>
  `,
})

export class AppComponent {
  title = 'my-app';
}