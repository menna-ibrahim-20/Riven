import { Component, ViewEncapsulation,HostBinding,Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-paramedic',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './paramedic.component.html',
  styleUrl: './paramedic.component.css'
})
export class ParamedicComponent {
  @HostBinding('style.display') display = 'contents';
  @Input() text: string = 'Paramedics';
}

