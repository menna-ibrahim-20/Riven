import { Component, ViewEncapsulation, HostBinding, Input,Output,EventEmitter} from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-eyepar',
  standalone: true,
  imports: [],
  templateUrl: './eyepar.component.html',
  styleUrl: './eyepar.component.css'
})
export class EyeparComponent {

@HostBinding('style.display') display = 'contents';
  @Input() property1: 'Default' | 'Hover' = 'Default';
  @Input() caseId: string = '';
  @Output() viewCase = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClick(): void {
       this.router.navigate(['/dashboard/web-cases-cardprofile/open', this.caseId]);

  }
}



