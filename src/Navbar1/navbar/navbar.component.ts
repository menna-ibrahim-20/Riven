import { Component,ViewEncapsulation, HostBinding ,HostListener } from '@angular/core';
import { NotBellComponent} from '../not-bell/not-bell.component';
import {  WebNavComponent } from '../web-nav/web-nav.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [WebNavComponent, NotBellComponent, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.width') width = '100%';
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.hamburger-btn') && !target.closest('.mobile-menu')) {
      this.menuOpen = false;
    }
  }
}


