import { Component, OnInit, ViewChild } from '@angular/core';
import { Dataset } from './customers.data';
import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { Router } from '@angular/router';

export interface User {
  name: string;
  phone: string;
  email: string;
  balance: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})

export class CustomersComponent implements OnInit {

  @ViewChild(SohoDataGridComponent) dataGrid?: SohoDataGridComponent;

  options: SohoDataGridOptions = {};
  public newRowData!: string;
  public tooltipOptions: SohoTooltipOptions = {
    placement: 'top'
  }

  public tooltipCompressor: SohoTooltipOptions = {
    placement: 'bottom'
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setGridOptions();
  }

  private setGridOptions(): void {
    const columns = [
      {
        id: 'name',
        name: 'Name',
        field: 'name',
        sortable: true,
        headerTooltip: 'Name Column',
        tooltipOptions: this.tooltipOptions,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'phone',
        name: 'Phone Number',
        field: 'phone',
        sortable: true,
        headerTooltip: 'Phone Number Column',
        tooltipOptions: this.tooltipCompressor,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'email',
        name: 'Email',
        field: 'email',
        sortable: true,
        headerTooltip: 'Email Column',
        tooltipOptions: this.tooltipOptions,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'balance',
        name: 'Account Balance',
        field: 'balance',
        sortable: true,
        headerTooltip: 'Account-Balance Column',
        tooltipOptions: this.tooltipOptions,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'open',
        name: '',
        sortable: false,
        formatter: Soho.Formatters.Button,
        icon: 'delete',
        headerTooltip: 'Delete',
        tooltipOptions: this.tooltipCompressor,
        menuId: 'card-options',
        click: (_: Event, data: SohoDataGridColumnClickData[]) => {
          const itemIndex = data[0].row
          Dataset.splice(itemIndex, 1)
          this.dataGrid?.updateDataset(Dataset)
        },
      },
    ];
    this.options = {
      dataset: Dataset as User[],
      columns,
      enableTooltips: true,
      fixedRowHeight: 30,
      selectable: 'single',
      clickToSelect: true,
    };
  }

  onRowActivated(event: SohoDataGridRowActivated): void {
    const rowIndex = event.row;
    if (this.options.dataset) { // Check if dataset is defined
      const user = this.options.dataset[rowIndex] as User;
      if (user && user.name) {
        this.router.navigate(['/user-info', user.name]);
      }
    }
  }
}
