import { Component, OnInit } from '@angular/core';
import { DataService } from '../common';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  baseUrl = environment.apiUrl;
  paymentWallet: any = [];
  paymentWalletPending: any = [];
  paymentWalletCompleted: any = [];
  paymentWalletHistory: any = [];
  activePaymentWallet: any = [];
  totalTime: number;
  cdrListActive: any;
  blockchainUrl = environment.blockchainExplorerUrl;
  activeMsp: any = [];
  mspIndexReinbursement: any = [];
  serverAddress: any;
  reimbursementId: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getPaymentWallet();
    this.getPaymentWalletPending();
    this.getPaymentWalletComplete();
  }

  getPaymentWallet() {
    this.dataService.getPaymentWallet().subscribe((data) => {
        this.paymentWallet = data;
        console.log(data);
    });
  }

  getPaymentWalletHistory(index) {
    this.mspIndexReinbursement = index;
    this.activePaymentWallet = this.paymentWallet[index].token_address;
    this.cdrListActive = 'basic';
    this.activeMsp = this.paymentWallet[index].msp_address;
    console.log(this.activePaymentWallet, 'basic');
    this.dataService.getPaymentWalletHistory(this.activePaymentWallet).subscribe((data) => {
        this.paymentWalletHistory = data;
        console.log(data);
    });
  }

  getPaymentWalletHistoryPending(index) {
    this.mspIndexReinbursement = index;
    this.activePaymentWallet = this.paymentWalletPending[index].token_address;
    this.cdrListActive = 'pending';
    this.activeMsp = this.paymentWalletPending[index].msp_address;
    console.log(this.activePaymentWallet, 'pending');
    this.serverAddress = this.paymentWalletPending[index].server_addr;
    this.reimbursementId = this.paymentWalletPending[index].reimbursement_id;
    this.dataService.getPaymentWalletHistory(this.activePaymentWallet).subscribe((data) => {
        this.paymentWalletHistory = data;
        console.log(data);
    });
  }

  getPaymentWalletHistoryCompleted(index) {
    this.mspIndexReinbursement = null;
    this.activePaymentWallet = this.paymentWalletCompleted[index].token_address;
    this.cdrListActive = 'complete';
    this.activeMsp = this.paymentWalletCompleted[index].msp_address;
    console.log(this.activePaymentWallet, 'complete');
    this.serverAddress = this.paymentWalletPending[index].server_addr;
    this.reimbursementId = this.paymentWalletPending[index].reimbursement_id;
    this.dataService.getPaymentWalletHistory(this.activePaymentWallet).subscribe((data) => {
        this.paymentWalletHistory = data;
        console.log(data);
    });
  }

  createReimbursement() {
    this.dataService.createReimbursement(this.activeMsp, this.activePaymentWallet).subscribe((data) => {
        this.getPaymentWalletHistory(this.mspIndexReinbursement);
        this.getPaymentWallet();
        this.getPaymentWalletPending();
        this.getPaymentWalletComplete();
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

  getPaymentWalletComplete() {
    this.dataService.getPaymentWalletComplete().subscribe((data) => {
        this.paymentWalletCompleted = data;
        console.log(data);
    });
  }

  setPaymentWalletComplete() {
    console.log(this.reimbursementId);
    this.dataService.setPaymentWalletComplete(this.reimbursementId).subscribe((data) => {
      this.getPaymentWallet();
      this.getPaymentWalletPending();
      this.getPaymentWalletComplete();
      console.log(data);
    });
  }


}
