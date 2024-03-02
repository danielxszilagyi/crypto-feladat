import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MaterialModule } from '../../material.module';

import { CryptoSymbol } from '../../models/symbol.model';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

// !----------------- AddTab -------------------
@Component({
  standalone: true,
  imports: [FormsModule, MaterialModule],
  selector: 'add-tab-button',
  template: `
    <button
      [disableRipple]="true"
      mat-icon-button
      style="pointer-events: all !important"
      (click)="openDialog()"
    >
      <mat-icon color="primary">add_box</mat-icon>
    </button>
  `,
})
export class addTabButton {
  animal!: string;
  name!: string;
  @Input() symbolsForMenu: CryptoSymbol[] = [];
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.symbolsForMenu,
    });
  }
}

// !----------------- Dialog -------------------
@Component({
  selector: 'dialog-component',
  standalone: true,
  imports: [
    FormsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  template: `
    <h3 mat-dialog-title>Add a new tab</h3>
    <mat-dialog-content>
      <form>
        <mat-form-field>
          <mat-label>Cryptocurrency</mat-label>
          <input
            type="text"
            placeholder="Pick one"
            matInput
            [formControl]="chooseSymbolInput"
            [matAutocomplete]="auto"
            cdkFocusInitial
          />
          <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
            @for (option of filteredOptions | async ; track option) {
            <mat-option
              [value]="option.asset_id_base"
              (click)="chooseSymbol(option)"
              >{{ option.asset_id_base }}</mat-option
            >
            }
          </mat-autocomplete>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <!-- <button mat-button (click)="onNoClick()">close</button>
      <button
        mat-button
        color="primary"
        [disabled]="!chooseSymbolInput.value"
        [mat-dialog-close]="chosenSymbol"
        (click)="chooseSymbol(chooseSymbolInput.value)"
      >
        Add
      </button> -->
    </mat-dialog-actions>
  `,
})
export class DialogComponent implements OnInit {
  chooseSymbolInput = new FormControl('');
  options!: CryptoSymbol[];
  filteredOptions!: Observable<CryptoSymbol[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CryptoSymbol[],
    private symbolDialogServ: SymbolsDialogService
  ) {}

  ngOnInit() {
    this.options = this.data;
    this.filteredOptions = this.chooseSymbolInput.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  /**
   * Choose a symbol and send it to the tabs component
   * @param symbol
   */
  chooseSymbol(symbol: CryptoSymbol | null): void {
    if (symbol === null) return;
    this.symbolDialogServ.sendChoosen(symbol);
    this.dialogRef.close();
  }

  /**
   * Close the dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Filter the options based on the input value
   * @param value
   * @returns filtered options
   */
  private _filter(value: string): any {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.asset_id_base.toLowerCase().includes(filterValue)
    );
  }
}

// !----------------- Service -------------------
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SymbolsDialogService {
  private tabToBeAdded = new Subject<CryptoSymbol>();

  /**
   * Send the choosen symbol to the tabs component
   * @param message
   */
  sendChoosen(message: CryptoSymbol): void {
    this.tabToBeAdded.next(message);
  }

  getTabToBeAdded(): Subject<CryptoSymbol> {
    return this.tabToBeAdded;
  }
}
