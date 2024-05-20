import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SohoToastService } from 'ids-enterprise-ng';
import { CustomerCartService } from '../shared/customer-cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  selectedCustomer: string = '';
  customerCartItems: any[] = []
  totalPrice?: number;
  totalQuantity?: number;

  constructor(private customerCart: CustomerCartService, private toast: SohoToastService,private route: ActivatedRoute ,private router: Router){}

  ngOnInit(): void {
    this.customerCart.selectedCustomer$.subscribe(customerName => {
      this.selectedCustomer = customerName;
      if(this.selectedCustomer) {
        this.customerCartItems = this.customerCart.getCustomerProducts(this.selectedCustomer);
      }
    })
    this.calculateTotals()
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
  }

  save() {
    this.toast.show({
      title: 'Saved',
      message: 'Orders saved',
      position:'top right'
    });
   setTimeout(() => {
    this.router.navigate(['./sell'])
   }, 2000);
  }
}
