import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../Navbar1/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})


export class RootComponent {
constructor(private router: Router) {}
  openCase(id: string): void {
  this.router.navigate(['/dashboard/cases/open', id]);
}
}