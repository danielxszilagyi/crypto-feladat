import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { Symbol } from '../../../models/symbol.model';
import { ChartComponent } from './components/chart.component';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule, MaterialModule, ChartComponent],
  template: `
    <h3>asset_id_base: {{ data.asset_id_base }}</h3>
    <h3>symbol_id: {{ data.symbol_id }}</h3>
    <app-chart [symbolData]="data"></app-chart>
  `,
  styles: ``,
})
export class TabComponent {
  @Input() data!: Symbol;
}
