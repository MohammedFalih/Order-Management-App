import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css'
})
export class FinanceComponent implements OnInit {
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid?: SohoDataGridComponent;

  options: SohoDataGridOptions = {};
  displaySidebar: boolean = false;
  value!: number;
  dueDate!: Date;
  category!: string;
  expenseName!: string;
  supplier!: string;
  paid: boolean = false;


  ngOnInit(): void {
    this.setGridOptions()
  }

  showSidebar() {
    this.displaySidebar = !this.displaySidebar;
  }

  addExpense() {

    this.dataGrid?.addRow({ paid: this.paid, date: this.dueDate, value: this.value, expense: this.expenseName, supplier: this.supplier, category: this.category }, 'top');

    this.displaySidebar = false
  }

  private setGridOptions(): void {
    const columns = [
      {
        id: 'paid',
        name: 'Paid',
        field: 'paid',
        sortable: false,
        formatter: Soho.Formatters.Checkbox,
        switch: true
      },
      {
        id: 'date',
        name: 'Date',
        field: 'date',
        sortable: true,
        formatter: Soho.Formatters.Date,
      },
      {
        id: 'value',
        name: 'Value',
        field: 'value',
        sortable: true,
        formatter: Soho.Formatters.Decimal,
      },
      {
        id: 'expense',
        name: 'Expense Name',
        field: 'expense',
        sortable: true,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'supplier',
        name: 'Supplier',
        field: 'supplier',
        sortable: true,
        formatter: Soho.Formatters.Ellipsis,
      },
      {
        id: 'category',
        name: 'Category',
        field: 'category',
        sortable: true,
        formatter: Soho.Formatters.Ellipsis,
      }
    ];
    this.options = {
      dataset: this.Data,
      columns,
      enableTooltips: true,
      fixedRowHeight: 30,
      selectable: 'single',
      clickToSelect: true,
    };
  }

  Data = [
    {
      paid: true,
      date: '2023-05-17T00:00:00Z',
      value: 1500.00,
      expense: 'Office Supplies',
      supplier: 'Staples',
      category: 'Office'
    },
    {
      paid: false,
      date: '2023-06-01T00:00:00Z',
      value: 3000.00,
      expense: 'Software License',
      supplier: 'Adobe',
      category: 'Software'
    },
    {
      paid: true,
      date: '2023-07-12T00:00:00Z',
      value: 750.50,
      expense: 'Catering Service',
      supplier: 'Local Caterers',
      category: 'Food'
    },
    {
      paid: false,
      date: '2023-08-23T00:00:00Z',
      value: 5000.00,
      expense: 'Consulting Fee',
      supplier: 'Tech Consultants',
      category: 'Professional Services'
    },
    {
      paid: true,
      date: '2023-09-15T00:00:00Z',
      value: 2000.00,
      expense: 'Office Furniture',
      supplier: 'IKEA',
      category: 'Furniture'
    }
  ];

}
