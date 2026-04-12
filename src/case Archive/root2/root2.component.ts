import { Component, HostBinding ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FramComponent } from '../fram/fram.component';
import { Webcasescard1Component, CaseFilters } from '../webcasescard1/webcasescard1.component';
import { WebcasescardComponent } from '../webcasescard/webcasescard.component';
import { CaseRow } from '../tablerow-stack/tablerow-stack.component';
// import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-root2',
  standalone: true,
  imports: [CommonModule, FramComponent, Webcasescard1Component, WebcasescardComponent],
  templateUrl: './root2.component.html',
  styleUrl: './root2.component.css'
})

export class Root2Component  implements OnInit {
  @HostBinding('style.display') display = 'contents';

  allCases: CaseRow[] = [
    { id: 'SC-2024-001', date: 'Dec 19, 2025', patientAge: '67yo', patientGender: 'Male',   severity: 'Severe',   aiPrediction: 'Ischemic',    status: 'En Route',  paramedic: 'Sarah Chen' },
    { id: 'SC-2024-002', date: 'Dec 19, 2025', patientAge: '54yo', patientGender: 'Female', severity: 'Moderate', aiPrediction: 'Hemorrhagic', status: 'Completed', paramedic: 'James Liu'  },
    { id: 'SC-2024-003', date: 'Dec 19, 2025', patientAge: '72yo', patientGender: 'Male',   severity: 'Severe',   aiPrediction: 'Ischemic',    status: 'En Route',  paramedic: 'Sarah Chen' },
    { id: 'SC-2024-004', date: 'Dec 18, 2025', patientAge: '45yo', patientGender: 'Female', severity: 'Moderate', aiPrediction: 'TIA',         status: 'Completed', paramedic: 'Omar Karim' },
    { id: 'SC-2024-005', date: 'Dec 18, 2025', patientAge: '81yo', patientGender: 'Male',   severity: 'Severe',   aiPrediction: 'Ischemic',    status: 'Completed', paramedic: 'James Liu'  },
    { id: 'SC-2024-006', date: 'Dec 17, 2025', patientAge: '63yo', patientGender: 'Female', severity: 'Moderate', aiPrediction: 'Hemorrhagic', status: 'En Route',  paramedic: 'Sarah Chen' },
  ];

  filteredCases: CaseRow[] = [];

  ngOnInit(): void {
    this.filteredCases = [...this.allCases];
    // TODO: استبدل بـ API call
    // this.caseService.getCases().subscribe(data => {
    //   this.allCases = data;
    //   this.filteredCases = [...data];
    // });
  }

  onFiltersChange(filters: CaseFilters): void {
    const q = filters.search.toLowerCase();
    this.filteredCases = this.allCases.filter(c => {
      const matchSearch   = !q || c.id.toLowerCase().includes(q) || c.paramedic.toLowerCase().includes(q) || c.aiPrediction.toLowerCase().includes(q);
      const matchSeverity = !filters.severity || c.severity === filters.severity;
      const matchStatus   = !filters.status   || c.status   === filters.status;
      return matchSearch && matchSeverity && matchStatus;
    });
  }
}