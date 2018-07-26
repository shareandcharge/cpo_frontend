import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';
import { DataService } from '../common/index';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html'
})
export class StationsComponent implements OnInit {

  driverDetail: any = [];
  driverDetailActive: boolean = false;
  transactionsActive: boolean = false;
  tokensActive: boolean = false;
  tokenValue = 0;
  selected = [];

  driversRows = [
    // { name: 'Max Mustermann', address: 'Musterstrasse 12', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '41 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 15', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '52 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 62', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '11 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 13', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '35 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 76', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '6 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 73', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '17 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 81', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '81 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 29', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '37 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 30', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '22 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 11', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '93 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 1', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '18 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 6', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '5 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 92', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '9 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 33', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '98 C&F Tokens' },
    // { name: 'Max Mustermann', address: 'Musterstrasse 45', shareAndChargeAddress: '0x3680fc75fccb505d32dd29029c68303bb8b8fbe4', eMail: 'asdasd@asdasd.com', phone: '+4234567890123', tokens: '1 C&F Tokens' }
  ];
  driversColumns = [
    // { name: 'addr' },
    // { name: 'Address' },
    // { name: 'token_address' },
    // { name: 'currency' },
    // { name: 'phone' },
    // { name: 'balance' }
  ];

  private toasterService: ToasterService;

  constructor(toasterService: ToasterService,
              private dataService: DataService,
              public router: Router) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getDrivers();
    // this.topUpWallet();
  }

  getDrivers() {
    // this.dataService.getDrivers({
    // }).subscribe((data) => {
    //     this.driversRows = data;
    //     console.log(data);
    // });
  }

  onSelect({selected}) {
    console.log('Select Event', selected, this.selected);
    this.driverDetail = JSON.parse(JSON.stringify(selected[0]));
    this.driverDetailActive = true;
    this.tokenValue = 0;
    // this.getWallet(this.driverDetail.address);
  }

  backToDrivers() {
    this.driverDetailActive = false;
  }

  addTokens() {
    this.tokenValue = this.tokenValue += 100;
  }

  removeTokens() {
    if (this.tokenValue >= 100) {
      this.tokenValue = this.tokenValue -= 100;
    }
  }

  // getWallet(walletID) {
  //   this.dataService.getWallet(walletID).subscribe((data) => {
  //       console.log(data);
  //   });
  // }

  // topUpWallet() {
  //   this.dataService.topUpWallet(this.driverDetail.address, this.tokenValue).subscribe((data) => {
  //       console.log(data);
  //       this.transactionsActive = false;
  //       this.tokensActive = false;
  //       this.tokenValue = 0;
  //       this.toasterService.pop('success', 'Success', 'You have successfuly added tokens to this driver.');
  //   });
  // }

  public popToast = () => {
    this.toasterService.pop('success', 'Success', 'TEST NOTIFICATION');
  }

}
