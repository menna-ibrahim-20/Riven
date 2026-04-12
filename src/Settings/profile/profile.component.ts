import { Component, ViewEncapsulation, HostBinding,Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @HostBinding("style.display") display = "contents";
  @Input() property11: string | number | undefined = "";
  @Input() property1: string | number | undefined = "Default";
  @Input() text: string = "Settings";
}




