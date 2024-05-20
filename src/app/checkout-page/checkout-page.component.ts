import { Component, ViewChild } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { OnInit } from '@angular/core';
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { DATA } from './products.data';
import { SohoSpinboxComponent } from 'ids-enterprise-ng';
import { Dataset } from '../customers/customers.data';
import { CustomerCartService } from '../shared/customer-cart.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {

  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;
  @ViewChild(SohoSpinboxComponent, { static: true }) spinbox?: SohoSpinboxComponent;

  customers = Dataset;
  productList: any;

  selectedCustomer: any = '';
  customerProducts: any[] = []
  totalPrice?: number;
  totalQuantity?: number;

  constructor(private products: ApiServiceService, private customerCart: CustomerCartService) { }

  ngOnInit(): void {
    this.displayProducts()
    this.customerCart.selectedCustomer$.subscribe(customerName => {
      this.selectedCustomer = customerName;
      if(this.selectedCustomer) {
        this.customerProducts = this.customerCart.getCustomerProducts(this.selectedCustomer)
      }
    })
  }

  private displayProducts() {
    this.busyIndicator?.open();

    setTimeout(() => {
      this.productList = DATA;
      this.busyIndicator?.close(true);
    }, 3000);
  }

  onSelected(customerName: string) {
   this.customerCart.setSelectedCustomer(customerName)
  }


  addItemToCart(product: any) {
    if (this.selectedCustomer) {
      this.customerCart.updateProduct(this.selectedCustomer, product);
      this.customerProducts = this.customerCart.getCustomerProducts(this.selectedCustomer)
      this.calculateTotals();
      console.log(this.customerProducts);
    }
  }

  removeProduct(product: any) {
    if (this.selectedCustomer) {
      let customerCart = this.customerCart.getCustomerProducts(this.selectedCustomer);
      let removeIndex = customerCart.findIndex((item: any) => item.id === product.id);
      if (removeIndex !== -1) {
        customerCart.splice(removeIndex, 1);
        this.customerCart.setCustomerProducts(this.selectedCustomer, customerCart);
        this.calculateTotals();
      }
    }
  }

  customerProductQuantity(productId: any) {
    if (!this.selectedCustomer) return 0;
    this.calculateTotals();
    let customerCart = this.customerCart.getCustomerProducts(this.selectedCustomer);
    let product = customerCart.find((item: any) => item.id === productId);
    return product ? product.quantity : 0;
  }

  clearItems() {
    if (this.selectedCustomer) {
      this.customerCart.setCustomerProducts(this.selectedCustomer, []);
      this.customerProducts = []
      this.calculateTotals();
    }
  }


  calculateTotals() {
    let totalPrice = 0;
    let totalQuantity = 0;

    this.customerCart.getCustomerProducts(this.selectedCustomer).forEach((product: any) => {
      totalPrice += parseFloat(product.price.replace('$', '')) * product.quantity;
      totalQuantity += Number(product.quantity);
    });

    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;

    // console.log(this.totalPrice);
    // console.log(this.totalQuantity);
  }
}