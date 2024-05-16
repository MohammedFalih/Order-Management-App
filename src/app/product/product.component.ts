import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { ApiServiceService } from '../services/api-service.service';

export const EDITORS_COLUMNS: any[] = [
  {
    id: 'selectionCheckbox',
    sortable: false,
    resizable: false,
    formatter: Soho.Formatters.SelectionCheckbox,
    align: 'center'
  },

  {
    id: 'favorite',
    field: 'favorite',
    width: 10,
    sortable: false,
    showEmpty: true,
    formatter: Soho.Formatters.Favorite,
    editor: Soho.Editors.Favorite,
    align: 'center',
  },
  {
    id: 'image',
    field: 'image',
    name: 'Product Image',
    formatter: Soho.Formatters.Image,
    align: 'center'
  },
  {
    id: 'productName',
    name: 'Product Name',
    field: 'title',
    sortable: false,
    filterType: 'text',
    width: 500,
    formatter: Soho.Formatters.Text,
    required: true,
    validate: 'required'
  },

  {
    id: 'stock',
    name: 'Stock',
    field: 'stock',
    sortable: false,
    filterType: 'number',
    width: 105,
    editor: Soho.Editors.Input,
    required: true,
    validate: 'required'
  },

  {
    id: 'price',
    name: 'Price',
    field: 'price',
    sortable: false,
    filterType: 'decimal',
    width: 125,
    formatter: Soho.Formatters.Decimal
  },


  {
    id: 'catalog',
    name: 'Catalog',
    field: 'catalog',
    sortable: false,
    resizable: false,
    formatter: Soho.Formatters.Checkbox,
    editor: Soho.Editors.Checkbox,
    align: 'center',
    switch: true
  }
];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {

  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;

  gridOptions: any = null;
  productsList: any;

  constructor(private getProducts: ApiServiceService) { }

  ngOnInit(): void {

    this.getProducts.getProducts()
      .subscribe((res) => {
        this.productsList = res;

        this.gridOptions = {
          columns: EDITORS_COLUMNS,
          dataset: this.productsList,
          clickToSelect: false,
          selectable: 'multiple',
          idProperty: 'productId',
          editable: true,
          filterable: true,
          showDirty: true,
          stretchColumn: 'title',
          headerBackgroundColor: 'light',
        }
      })
  }
}
