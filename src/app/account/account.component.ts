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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAccountInfo();
    this.getHistory();
  }

  getAccountInfo() {
    this.dataService.getAccountInfo().subscribe((data) => {
         this.accountInfo = data;
         this.getWallet(data.wallet);
         console.log(this.accountInfo);
    });
  }

  getWallet(walletID) {
    this.dataService.getWallet(walletID).subscribe((data) => {
         this.accountWallet = data;
         console.log(this.accountWallet);
    });
  }

  getHistory() {
    this.dataService.getHistory().subscribe((data) => {
         this.accountHistory = data;
         console.log(this.accountHistory);
    });
  }

}
