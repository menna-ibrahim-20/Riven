import { Component , ViewEncapsulation,HostBinding,Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {

    @HostBinding("style.display") display = "contents";
  @Input() text: string = "Dashboard";
  @Input() property11: string | number | undefined = "";
  @Input() property1: string | number | undefined = "Default";
}




