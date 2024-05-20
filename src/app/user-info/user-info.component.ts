import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from './customer.service';
import { SohoToastService } from 'ids-enterprise-ng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {

  user: any = [];

  constructor(private route: ActivatedRoute, private customers: CustomerService, private toast: SohoToastService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomerInfo()
  }

  getCustomerInfo() {
    const name = this.route.snapshot.paramMap.get('name');

    if (name) {
      this.customers.getDataset()
        .subscribe((dataset) => {
          this.user = dataset.find(customer => customer.name === name)
        })
    }
  }

  save() {
    this.toast.show({
      title: 'Saved',
      message: 'User-Info saved',
      position:'top right'
    });
   setTimeout(() => {
    this.router.navigate(['./customers'])
   }, 2000);
  }
}
