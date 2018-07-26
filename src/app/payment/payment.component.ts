import { Component, OnInit } from '@angular/core';
import {DataService} from '../common/index';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  paymentRows = [
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'}
  ];
  paymentColumns = [
    { name: 'Name' },
    { name: 'Transactions' },
    { name: 'Tokens' }
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

}
