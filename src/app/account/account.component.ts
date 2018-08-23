import { Component, OnInit } from '@angular/core';
import { DataService } from '../common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  accountInfo: any = [];
  accountWallet = {
    balance: 0,
    currency: ''
  };
  accountHistory = [];
  weiToEvCoin = Math.pow(10, 18);
  calculatedAmount = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAccountInfo();
  }

  getAccountInfo() {
    this.dataService.getAccountInfo().subscribe((data) => {
         this.accountInfo = data;
         this.getWallet(data.wallet);
         this.getHistory(data.wallet);
    });
  }

  getWallet(walletID) {
    this.dataService.getWallet(walletID).subscribe((data) => {
         this.accountWallet = data;
    });
  }

  getHistory(walletID) {
    this.dataService.getHistory(walletID).subscribe((data) => {
        this.accountHistory = data;
        let i;
        let totalAmount = 0;
        for (i = 0; i < this.accountHistory.length; i++) {
          if (this.accountInfo.wallet ===  this.accountHistory[i].to_addr) {
            totalAmount = totalAmount + this.accountHistory[i].amount;
          } else {
            totalAmount = totalAmount - this.accountHistory[i].amount;
          }
          if (this.accountHistory.length === (i + 1)) {
            this.calculatedAmount = totalAmount;
          }
        }
    });
  }

  truncateToDecimals(num, dec = 4) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
  }

  formatNumber(number) {
    const truncatedNumber = this.truncateToDecimals(number);
    return truncatedNumber;
  }

}
