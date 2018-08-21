import { Component, OnInit } from '@angular/core';
import { DataService } from '../common';
import { environment } from './../../environments/environment';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  baseUrl = environment.apiUrl;
  private toasterService: ToasterService;
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


  constructor(private dataService: DataService,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.refreshWalletHistoryLists();
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
        if (this.paymentWalletHistory.length === 0) {
          this.toasterService.pop('info', 'Success', 'There are no new CDRs waiting to be reimbursed.');
        }
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
    this.paymentWalletHistory = JSON.parse(this.paymentWalletPending[index].cdr_records);
  }

  getPaymentWalletHistoryCompleted(index) {
    this.mspIndexReinbursement = null;
    this.activePaymentWallet = this.paymentWalletCompleted[index].token_address;
    this.cdrListActive = 'complete';
    this.activeMsp = this.paymentWalletCompleted[index].msp_address;
    console.log(this.activePaymentWallet, 'complete');
    this.serverAddress = this.paymentWalletCompleted[index].server_addr;
    this.reimbursementId = this.paymentWalletCompleted[index].reimbursement_id;
    console.log(this.paymentWalletCompleted[index].cdr_records);
    this.paymentWalletHistory = JSON.parse(this.paymentWalletCompleted[index].cdr_records);
  }

  refreshWalletHistoryLists() {
    this.getPaymentWallet();
    this.getPaymentWalletPending();
    this.getPaymentWalletComplete();
  }

  createReimbursement() {
    this.dataService.createReimbursement(this.activeMsp, this.activePaymentWallet).subscribe((data) => {
        this.getPaymentWalletHistory(this.mspIndexReinbursement);
        this.refreshWalletHistoryLists();
        console.log(data);
        this.toasterService.pop('success', 'Success', 'Reimbursement created.');
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
      this.refreshWalletHistoryLists();
      this.toasterService.pop('success', 'Success', 'Status of the reimbursement successfully changed to complete.');
      console.log(data);
    });
  }


}
