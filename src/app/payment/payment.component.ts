import { Component, OnInit } from '@angular/core';
import {DataService} from '../common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  paymentWallet: any = [];
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
        // this.getPaymentWalletHistory(this.paymentWallet[0].token_address);
    });
  }

  getPaymentWalletHistory(index) {
    this.activePaymentWallet = this.paymentWallet[index].token_address;
    this.dataService.getPaymentWalletHistory(this.activePaymentWallet).subscribe((data) => {
        this.paymentWalletHistory = data;
        console.log(data);
    });
  }

}
