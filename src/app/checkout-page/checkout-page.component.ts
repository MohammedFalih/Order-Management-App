import { Component, ViewChild } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { OnInit } from '@angular/core';
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { DATA } from './products.data';
import { SohoSpinboxComponent } from 'ids-enterprise-ng';
import { Dataset } from '../customers/customers.data';

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
  customers = Dataset;
  selectedCustomer: string = '';
  customerProducts: { [key: string]: any[] } = {};

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

  onSelected(customerName: string) {
    this.selectedCustomer = customerName;
    if (!this.customerProducts[customerName]) {
      this.customerProducts[customerName] = [];
    }
  }

  addItemToCart(product: any) {
    let customerCart = this.customerProducts[this.selectedCustomer]
    let addedProduct = customerCart.find((item: any) => item.id === product.id)
    if (this.selectedCustomer) {
      if (addedProduct) {
        addedProduct.quantity = product.quantity
      } else {
        this.customerProducts[this.selectedCustomer].push(product)
      }
      this.calculateTotals();
      console.log(this.customerProducts);
    }
  }

  removeProduct(product: any) {
    let removeProduct = this.customerProducts[this.selectedCustomer].findIndex((item: any) => item.id === product.id)
    if (this.selectedCustomer) {
      if (removeProduct != -1) {
        this.customerProducts[this.selectedCustomer][removeProduct].quantity = 0;
        this.customerProducts[this.selectedCustomer].splice(removeProduct, 1)
      }
    }
    this.calculateTotals()
  }

  customerProductQuantity(productId: any) {
    if (!this.selectedCustomer) return 0;
    let customerCart = this.customerProducts[this.selectedCustomer];
    let product = customerCart.find((item: any) => item.id === productId);
    return product ? product.quantity : 0;
  }

  clearItems() {
    let customerCart = this.customerProducts[this.selectedCustomer];
    customerCart.forEach((product: any) => product.quantity = 0);
    customerCart = [];
    this.calculateTotals()
  }

  change(event: SohoSpinboxEvent, item: any) {

    this.addItemToCart(item)
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

    this.customerProducts[this.selectedCustomer].forEach((product: any) => {
      totalPrice += parseFloat(product.price.replace('$', '')) * product.quantity;
      totalQuantity += Number(product.quantity);
    });

    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;

    // console.log(this.totalPrice);
    // console.log(this.totalQuantity);
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
