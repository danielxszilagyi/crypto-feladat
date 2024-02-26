import { Component, Input } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { Symbol } from '../models/symbol.model';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <h3>asset_id_base: {{ data.asset_id_base }}</h3>
    <h3>symbol_id: {{ data.symbol_id }}</h3>
  `,
  styles: ``,
})
export class TabComponent {
  @Input() data!: Symbol;
}
