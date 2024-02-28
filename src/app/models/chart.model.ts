export interface ChartData {
  name: string;
  series: ChartSeries[];
}
export interface ChartSeries {
  name: string;
  value: number;
}
