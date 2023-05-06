import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import {
  Label,
  Color,
  SingleDataSet,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from "ng2-charts";

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
