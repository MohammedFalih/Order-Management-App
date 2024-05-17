import { Injectable } from '@angular/core';
import { User } from '../customers/customers.component';
import { Dataset } from '../customers/customers.data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getDataset(): Observable<User[]> {
    return of(Dataset)
  }
}
