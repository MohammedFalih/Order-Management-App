import { Component, ViewChild } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { OnInit } from '@angular/core';
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { DATA } from './products.data';
import { SohoSpinboxComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {

  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;
  @ViewChild(SohoSpinboxComponent, { static: true }) spinbox?: SohoSpinboxComponent;

  productList: any;
  selectedProduct: any[] = [];
  totalPrice?: number;
  totalQuantity?: number;

  constructor(private products: ApiServiceService) {

  }
  ngOnInit(): void {
    this.displayProducts()
  }

  private displayProducts() {
    this.busyIndicator?.open();

    setTimeout(() => {
      this.productList = DATA;
      this.busyIndicator?.close(true);
    }, 3000);
  }

  change(event: SohoSpinboxEvent, item: any) {

    item.quantity = event;

    const exist = this.selectedProduct.find((p: any) => p.id === item.id);

    if (exist) {
      exist.quantity = item.quantity;
    } else {
      this.selectedProduct.push(item);
    }
    this.calculateTotals()
    // console.log('Selected products:', this.selectedProduct);
    // console.log('Change event data:', event);
    // console.log('Item:', item);
    // console.log('Updated item:', item);
  }

  calculateTotals() {
    let totalPrice = 0;
    let totalQuantity = 0;

    this.selectedProduct.forEach((product: any) => {
      totalPrice += parseFloat(product.price.replace('$', '')) * product.quantity;
      totalQuantity += Number(product.quantity);
    });

    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;

    console.log(this.totalPrice);
    console.log(this.totalQuantity);
  }

  removeItem(product: any) {
    const index = this.selectedProduct.findIndex((p: any) => p.id === product.id);
    if (index != -1) {
      this.selectedProduct[index].quantity = 0;
      this.selectedProduct.splice(index, 1);
      this.calculateTotals()
    }
  }

}
