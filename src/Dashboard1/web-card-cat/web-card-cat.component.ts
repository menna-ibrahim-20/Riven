import { Component, ViewEncapsulation, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-web-card-cat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-card-cat.component.html',
  styleUrl: './web-card-cat.component.css'
})
export class WebCardCATComponent {

  @HostBinding('style.display') display = 'contents';
  
  @Input() text: string = 'Open Case';
  @Input() property1: any;

  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    this.clicked.emit();
  }
}




