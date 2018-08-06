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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAccountInfo();
  }

  getAccountInfo() {
    this.dataService.getAccountInfo().subscribe((data) => {
         this.accountInfo = data;
         this.getWallet(data.wallet);
         this.getHistory(data.wallet);
         console.log(this.accountInfo);
    });
  }

  getWallet(walletID) {
    this.dataService.getWallet(walletID).subscribe((data) => {
         this.accountWallet = data;
         console.log(this.accountWallet);
    });
  }

  getHistory(walletID) {
    this.dataService.getHistory(walletID).subscribe((data) => {
        this.accountHistory = data;
        console.log(this.accountHistory);
    });
  }

}
