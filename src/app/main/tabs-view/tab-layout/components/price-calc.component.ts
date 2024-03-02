import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CryptoSymbol } from '../../../../models/symbol.model';
import { Subscription } from 'rxjs';

enum changeIs {
  DOLLARAMOUNT = 'dollarAmount',
  CRYPTOAMOUNT = 'cryptoAmount',
}
@Component({
  selector: 'app-price-calc',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  template: `
    <mat-card class="p-3 pb-2 mt-4">
      <form [formGroup]="cryptoConverterForm">
        <mat-card-title class="mb-2">Price Calculator</mat-card-title>
        <mat-card-content>
          <mat-form-field>
            <mat-label>Amount of {{ symbolData.asset_id_base }}</mat-label>
            <input matInput type="number" formControlName="cryptoAmount" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Price in USD</mat-label>
            <input matInput type="number" formControlName="dollarAmount" />
          </mat-form-field>
          <small class="d-block">
            <strong>Exchange Rate:</strong> 1 Dollar =
            {{ 1 / this.exchangeRate }} {{ symbolData.asset_id_base }}
          </small>
        </mat-card-content>
      </form>
    </mat-card>
  `,
  styles: ``,
})
export class PriceCalcComponent implements OnInit, OnDestroy, OnChanges {
  @Input() symbolData!: CryptoSymbol;
  @Input() lastPrice!: number;
  dollarAmountSub!: Subscription | undefined;
  cryptoAmountSub!: Subscription | undefined;

  cryptoConverterForm: FormGroup;
  exchangeRate!: number;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.cryptoConverterForm = this.fb.group({
      dollarAmount: null,
      cryptoAmount: null,
    });

    this.dollarAmountSub = this.cryptoConverterForm
      .get('dollarAmount')
      ?.valueChanges.subscribe(() => {
        this.convertCurrency(changeIs.DOLLARAMOUNT);
      });
    this.cryptoAmountSub = this.cryptoConverterForm
      .get('cryptoAmount')
      ?.valueChanges.subscribe(() => {
        this.convertCurrency(changeIs.CRYPTOAMOUNT);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lastPrice']) {
      this.exchangeRate = this.lastPrice;
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {
    this.exchangeRate = this.lastPrice;

    this.cdr.detectChanges();
  }

  /**
   * Depending on the input field, convert the currency and update the other field
   * @param changeIs
   */
  convertCurrency(changeIs: changeIs) {
    this.cdr.detectChanges();
    const dollarAmount = this.cryptoConverterForm.get('dollarAmount')?.value;
    const cryptoAmount = this.cryptoConverterForm.get('cryptoAmount')?.value;
    if (!dollarAmount && !cryptoAmount) return;

    if (changeIs === 'dollarAmount') {
      this.cryptoConverterForm.patchValue(
        {
          cryptoAmount: dollarAmount / this.exchangeRate,
        },
        { emitEvent: false }
      );
    }
    if (changeIs === 'cryptoAmount') {
      this.cryptoConverterForm.patchValue(
        {
          dollarAmount: cryptoAmount * this.exchangeRate,
        },
        { emitEvent: false }
      );
    }
  }

  ngOnDestroy(): void {
    this.dollarAmountSub?.unsubscribe();
    this.cryptoAmountSub?.unsubscribe();
  }
}
