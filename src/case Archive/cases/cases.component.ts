import { Component,  ViewEncapsulation,HostBinding,Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.css'
})
export class CasesComponent {
  @HostBinding('style.display') display = 'contents';
  @Input() property1: 'Default' | 'Selected' = 'Default';
  @Input() text: string = 'Case Archive';
}