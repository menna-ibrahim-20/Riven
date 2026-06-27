import { Component, HostBinding, OnInit, Output, EventEmitter } from "@angular/core";
import { ParamedicColumnComponent } from '../paramedic-column/paramedic-column.component';
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { catchError, of } from "rxjs";

const BASE_URL = 'https://rivenbackend-production.up.railway.app/api';

@Component({
  selector: 'app-winput-fields-icon',
  standalone: true,
  imports: [ParamedicColumnComponent, CommonModule],
  templateUrl: './winput-fields-icon.component.html',
  styleUrl: './winput-fields-icon.component.css'
})
export class WInputFieldsIconComponent implements OnInit {

  @HostBinding("style.display") display = "contents";
  @Output() selectionChange = new EventEmitter<any[]>();

  paramedics:     any[]     = [];
  selectedStates: boolean[] = [];
  isLoading = true;

  private get hospitalId(): number {
    return JSON.parse(localStorage.getItem('riven_user') || '{}')?.hospitalId ?? 0;
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${BASE_URL}/users/hospital/${this.hospitalId}`)
      .pipe(catchError(() => of([])))
      .subscribe(users => {
        this.paramedics     = users.filter(u => u.roleId === 3 || u.roleName === 'Paramedic');
        this.selectedStates = this.paramedics.map(() => false);
        this.isLoading      = false;
      });
  }

  toggleSelectAll(): void {
    const allSelected = this.selectedStates.every(s => s);
    this.selectedStates = this.selectedStates.map(() => !allSelected);
    this.emitSelection();
  }

  onParamedicChange(index: number, value: boolean): void {
    const updated = [...this.selectedStates];
    updated[index] = value;
    this.selectedStates = updated;
    this.emitSelection();
  }

  getSelectedParamedics(): any[] {
    return this.paramedics.filter((_, i) => this.selectedStates[i]);
  }

  private emitSelection(): void {
    this.selectionChange.emit(this.getSelectedParamedics());
  }
}