import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { chartData } from './chart.data';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Symbol } from '../../../../models/symbol.model';
import { ChartService } from './chart.service';
import { ChartData, ChartSeries } from '../../../../models/chart.model';

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
      (select)="onSelect($event)"
      (activate)="onActivate($event)"
      (deactivate)="onDeactivate($event)"
      [autoScale]="true"
      [maxXAxisTickLength]="8"
      [xAxisTickFormatting]="customXAxisTickFormatting"
      [yAxisTickFormatting]="customYAxisTickFormatting"
    >
    </ngx-charts-line-chart>
    <button (click)="aaa()">load Data</button>`,
  styles: ``,
})
export class ChartComponent {
  @Input() symbolData!: Symbol;
  chartData: ChartData[] = chartData;
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

  aaa(): void {
    // console.log(this.symbolData.asset_id_base);
    // return this.symbolData.asset_id_base;
    this.chartService.getData(this.symbolData).subscribe((data) => {
      this.chartData = data;
      console.warn(data);
    });
  }
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
  customYAxisTickFormatting(value: any): string {
    return `$${value.toLocaleString('en-US')}`;
  }
  // getMinVal(data: ChartData[]): number {
  //   // return chartData[0].series
  //   //   .map((item: ChartSeries) => item.value)
  //   //   .reduce((a, b) => Math.min(a, b));
  //   let series = data[0].series;
  //   let smallestValueObject = series.reduce((minObject, currentObject) => {
  //     return currentObject.value < minObject.value ? currentObject : minObject;
  //   }, series[0]);
  //   return smallestValueObject.value;
  // }

  constructor(private chartService: ChartService) {
    Object.assign(this, { chartData: this.chartData });
  }

  onSelect(chartData: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(chartData)));
  }

  onActivate(chartData: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(chartData)));
  }

  onDeactivate(chartData: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(chartData)));
  }
}
