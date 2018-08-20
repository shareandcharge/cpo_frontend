import { Component, OnInit } from '@angular/core';
import { DataService } from '../common';
import { environment } from './../../environments/environment';

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
  totalTime: number;
  cdrListActive: any;
  // showReinbursementButtons: Boolean = false;
  blockchainUrl = environment.blockchainExplorerUrl;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getPaymentWallet();
    this.getPaymentWalletPending();
    this.getPaymentWalletCompleted();
  }

  getPaymentWallet() {
    this.dataService.getPaymentWallet().subscribe((data) => {
        this.paymentWallet = data;
        console.log(data);
    });
  }

  getPaymentWalletHistory(index, cdrListActive) {
    this.activePaymentWallet = this.paymentWallet[index].token_address;
    this.cdrListActive = cdrListActive;
    console.log(this.activePaymentWallet);
    this.dataService.getPaymentWalletHistory(this.activePaymentWallet).subscribe((data) => {
        this.paymentWalletHistory = data;
        console.log(data);
    });
  }

  createReimbursement() {
    // this.showReinbursementButtons = true;
    this.dataService.createReimbursement(this.activePaymentWallet).subscribe((data) => {
        console.log(data);
    });
  }

  calculateTotalTime(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const totaltime =  endDate - startDate;
    let day, hour, minute, seconds;
    seconds = Math.floor(totaltime / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    return hour + 'h ' + minute % 60 + 'm ' + seconds % 60 + 's';
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
