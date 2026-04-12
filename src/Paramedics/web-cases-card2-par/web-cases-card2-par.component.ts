import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-web-cases-card2-par',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-cases-card2-par.component.html',
  styleUrl: './web-cases-card2-par.component.css'
})
export class WebCasesCard2ParComponent {
  @HostBinding('style.display') display = 'contents';

  @Input()  searchQuery = '';
  @Output() searchChange = new EventEmitter<string>();
  @Output() addClick     = new EventEmitter<void>();
}
