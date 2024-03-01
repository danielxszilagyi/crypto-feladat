import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ChartData } from '../../../models/chart.model';

@Component({
  selector: 'app-price-calc',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <mat-card class="p-3 mt-4">
      <mat-card-title>Price Calculator</mat-card-title>
      <mat-card-content>
        <mat-form-field>
          <mat-label>Enter amount</mat-label>
          <input matInput type="number" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Enter price</mat-label>
          <input matInput type="number" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Result</mat-label>
          <input matInput type="number" />
        </mat-form-field>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class PriceCalcComponent implements OnChanges {
  @Input() symbolData!: any;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.symbolData);
  }
}
