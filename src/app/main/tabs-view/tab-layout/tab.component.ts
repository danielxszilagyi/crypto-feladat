import { TabService } from './../../../services/tab.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { AssetIcon, CryptoSymbol } from '../../../models/symbol.model';
import { ChartComponent } from './components/chart.component';
import { PriceCalcComponent } from './components/price-calc.component';
import { ChartData, ChartSeries } from '../../../models/chart.model';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule, MaterialModule, ChartComponent, PriceCalcComponent],
  template: `
    <div id="tab">
      <mat-card class="p-3">
        <div>
          <div class="row mb-4">
            <div
              class="col-12 d-flex align-items-center justify-content-between "
            >
              <div class="d-flex align-items-center">
                <img
                  id="assetIcon"
                  [src]="iconData?.url"
                  [alt]="data.asset_id_base"
                />
                <span class="d-inline ms-2 fs-1">{{ data.asset_id_base }}</span>
                <span class="d-inline ms-3 fs-4">{{
                  lastPrice | currency : 'USD' : 'symbol' : '1.0-0'
                }}</span>
              </div>
              <mat-icon
                class="pe-2"
                id="favoriteIcon"
                (click)="sendFav()"
                #tooltip="matTooltip"
                matTooltip="Add to favorites"
                matTooltipPosition="above"
                >favorite</mat-icon
              >
            </div>
          </div>

          <!-- <h3>asset_id_base: {{ data.asset_id_base }}</h3>
          <h3>symbol_id: {{ data.symbol_id }}</h3> -->
          <app-chart
            [symbolData]="data"
            (chartDataEmit)="handleChildData($event)"
          ></app-chart>
        </div>
      </mat-card>
      <app-price-calc
        [symbolData]="data"
        [lastPrice]="lastPrice"
      ></app-price-calc>
    </div>
  `,
  styles: `
  #tab{
    max-width: 1500px;
  }
  #favoriteIcon{
    cursor: pointer;
    opacity: 0.25;
    transition: all 0.2s;
  }
  #favoriteIcon:hover{
    color: red;
    opacity: 0.65;
    transform: scale(1.1);
  
  }
  #assetIcon{
    width: 3rem;
    height: 3rem;
  }
  `,
})
export class TabComponent implements OnChanges {
  @Input() data!: CryptoSymbol;
  @Output() favEvent = new EventEmitter<CryptoSymbol>();
  iconData!: AssetIcon | undefined;
  lastPrice: number = 0;
  constructor(private tabService: TabService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.iconData = this.tabService.provideIcons(this.data.asset_id_base);
    }
  }

  handleChildData(data: ChartData[]) {
    if (data) {
      let length = data[0].series.length - 1;
      this.lastPrice = data[0].series[length].value;
      this.cdr.detectChanges();
      // console.log(data[0].series[length].value);
    }
  }

  sendFav() {
    this.favEvent.emit(this.data);
  }
}
