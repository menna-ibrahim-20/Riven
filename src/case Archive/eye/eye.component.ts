import {Component, HostBinding, Input, Output, EventEmitter} from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-eye',
  standalone: true,
  imports: [],
  templateUrl: './eye.component.html',
  styleUrl: './eye.component.css'
})
export class EyeComponent {
@HostBinding('style.display') display = 'contents';
  @Input() property1: 'Default' | 'Hover' = 'Default';
  @Input() caseId: string = '';
  @Output() viewCase = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClick(): void {
    this.router.navigate(['/dashboard/cases/open', this.caseId]);
  }
}



