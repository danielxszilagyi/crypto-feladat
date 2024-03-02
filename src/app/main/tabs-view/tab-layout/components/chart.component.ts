import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { noData } from './chart.data';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CryptoSymbol } from '../../../../models/symbol.model';
import { ChartService } from './chart.service';
import { ChartData } from '../../../../models/chart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  template: ` <ngx-charts-line-chart
    [view]="view"
    [scheme]="colorScheme"
    [legend]="legend"
    [showXAxisLabel]="showXAxisLabel"
    [showYAxisLabel]="showYAxisLabel"
    [xAxis]="xAxis"
    [yAxis]="yAxis"
    [xAxisLabel]="this.symbolData.asset_id_base"
    [yAxisLabel]="yAxisLabel"
    [timeline]="timeline"
    [results]="chartData"
    [autoScale]="true"
    [maxXAxisTickLength]="8"
    [xAxisTickFormatting]="customXAxisTickFormatting"
    [yAxisTickFormatting]="customYAxisTickFormatting"
  >
  </ngx-charts-line-chart>`,
  styles: ``,
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() symbolData!: CryptoSymbol;
  @Output() chartDataEmit = new EventEmitter<any>();
  dataSub!: Subscription;
  chartData: ChartData[] = noData;
  view: any;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  // xAxisLabel: string = ;
  yAxisLabel: string = 'Last 7 days price in USD';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private chartService: ChartService) {
    Object.assign(this, { chartData: this.chartData });
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  /**
   * Emit the chart data to the parent component
   * @param data
   */
  private sendDataToParent(data: any): void {
    this.chartDataEmit.emit(data);
  }

  /**
   * Load the chart data from the API
   */
  loadChartData(): void {
    this.dataSub = this.chartService
      .getData(this.symbolData)
      .subscribe((data) => {
        this.chartData = data;
        this.sendDataToParent(data);
      });
  }

  /**
   * Custom formatting for the x-axis of chart
   */
  customXAxisTickFormatting(value: any): string {
    const date = new Date(value);
    const formattedDate = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      // hour: 'numeric',
      // minute: 'numeric',
    });
    return formattedDate;
  }

  /**
   * Custom formatting for the y-axis of chart
   */
  customYAxisTickFormatting(value: any): string {
    return `$${value.toLocaleString('en-US')}`;
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
