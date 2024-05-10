import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit{
  productList: any;

  constructor(private products: ApiServiceService) {

  }
  ngOnInit(): void {
   this.products.getProducts()
    .subscribe((res) => {
      this.productList = res;
    })
  }
}
