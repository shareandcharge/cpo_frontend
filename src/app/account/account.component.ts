import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/index';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  accountInfo: any = [];
  accountWallet = [];
  accountHistory = [];
  // selectedAgent: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAccountInfo();
    // this.getAccountWallet();
    // this.getAccountHistory();
  }

  getAccountInfo() {
    this.dataService.getAccountInfo().subscribe((data) => {
         this.accountInfo = data;
         console.log(this.accountInfo);
    });
  }

  // CPO

  // getAccountWallet() {
  //   this.dataService.getAccountWallet().subscribe((data) => {
  //        this.accountWallet = data;
  //        console.log(this.accountWallet);
  //   });
  // }

  // getAccountHistory() {
  //   this.dataService.getAccountHistory().subscribe((data) => {
  //        this.accountHistory = data;
  //        console.log(this.accountHistory);
  //   });
  // }

}
