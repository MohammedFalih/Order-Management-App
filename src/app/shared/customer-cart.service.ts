import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerCartService {

  private customerProducts: { [key: string]: any[] } = {};
  private selectCustomer = new BehaviorSubject<string>('')
  selectedCustomer$ = this.selectCustomer.asObservable();

  constructor() { }

  setSelectedCustomer(customerName: string) {
    this.selectCustomer.next(customerName)
  }

  setCustomerProducts(customerName: string, products: any) {
    this.customerProducts[customerName] = products;
  }

  getCustomerProducts(customerName: string) {
    return this.customerProducts[customerName] || []
  }

  updateProduct(customerName: string, product: any) {

    if (!this.customerProducts[customerName]) {
      this.customerProducts[customerName] = [];
    }

    const customerCart = this.customerProducts[customerName];
    const addProduct = customerCart.find((item: any) => product.id === item.id);
    if (addProduct) {
      addProduct.quantity = product.quantity;
    } else {
      customerCart.push(product)
    }
    this.customerProducts[customerName] = customerCart;
  }
}
