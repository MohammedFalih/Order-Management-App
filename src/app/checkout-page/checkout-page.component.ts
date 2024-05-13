import { Component, ViewChild } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { OnInit } from '@angular/core';
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {

  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;

  productList: any;

  constructor(private products: ApiServiceService) {

  }
  ngOnInit(): void {
    this.displayProducts()
  }

  private displayProducts() {
    this.products.getProducts()
      .subscribe((res) => {
        this.busyIndicator?.open();
        this.productList = res;
        this.busyIndicator?.close(true)
      })
  }
}
