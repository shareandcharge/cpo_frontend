import { Component, OnInit } from '@angular/core';
import {DataService} from '../common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  paymentWallet: any = [];
  paymentWalletPending: any = [];
  paymentWalletCompleted: any = [];
  paymentWalletHistory: any = [];
  activePaymentWallet: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getPaymentWallet();
  }

  getPaymentWallet() {
    this.dataService.getPaymentWallet().subscribe((data) => {
        this.paymentWallet = data;
        console.log(data);
        this.getPaymentWalletPending();
        this.getPaymentWalletCompleted();
    });
  }

  getPaymentWalletHistory(index) {
    this.activePaymentWallet = this.paymentWallet[index].token_address;
    console.log(this.activePaymentWallet);
    this.dataService.getPaymentWalletHistory(this.activePaymentWallet).subscribe((data) => {
        this.paymentWalletHistory = data;
        console.log(data);
    });
  }

  getPaymentWalletPending() {
    this.dataService.getPaymentWalletPending().subscribe((data) => {
        this.paymentWalletPending = data;
        console.log(data);
    });
  }

  getPaymentWalletCompleted() {
    this.dataService.getPaymentWalletCompleted().subscribe((data) => {
        this.paymentWalletCompleted = data;
        console.log(data);
    });
  }

}
