import { Component, OnInit } from '@angular/core';
import { columnData, data, Revenue, Sales, Average, Profits, SalesTax } from './analytics.data';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {

  public yAxis?: {};
  gridOptions?: any;
  columnData = columnData;
  data = data;
  revenue = Revenue;
  sales = Sales;
  average = Average;
  profit = Profits;
  salesTax = SalesTax;

  constructor() { }

  ngOnInit() {
    this.yAxis = {
      ticks: {
        number: 5, // Tip: round max data value
        format: 'd'
      }
    };
    this.gridOptions = {
      columns: this.COLUMNS,
      dataset: this.data,
      selectable: 'single',
      idProperty: 'productId',
      stretchColumn: 'all',
      editable: true,
      isList: true,
      filterable: true
    };
  }

  COLUMNS: SohoDataGridColumn[] = [
    {
      id: 'month',
      name: 'Monthly',
      field: 'month',
      sortable: false
    },

    {
      id: 'revenue',
      name: 'Revenue',
      field: 'value',
      sortable: false,
    },
    {
      id: 'sales',
      name: 'Sales',
      field: 'sales',
      sortable: false
    },
    {
      id: 'avgticket',
      name: 'Average Ticket Size',
      field: 'average',
      sortable: false
    },
  ]
}
