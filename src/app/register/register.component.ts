import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  accountInfo: any = [];
  accountInfoProp: any = [];

  constructor(public router: Router,
              public dataService: DataService) {

  }

  ngOnInit() {
  }

  setAccountInfo() {
    this.dataService.setAccountInfo({
      'name': this.accountInfo.name,
      'address_1': this.accountInfo.address1,
      'address_2': this.accountInfo.address2,
      'town': this.accountInfo.town,
      'postcode': this.accountInfo.townPostcode,
      'mail_address': this.accountInfo.email,
      'website': this.accountInfo.website,
      'vat_number': this.accountInfo.vatNumber
    }).subscribe((data) => {
        this.generateWallet();
        setTimeout(() => {
          this.router.navigate(['mnemonic']);
        }, 500);
    });
  }

  generateWallet() {
    this.dataService.generateWallet().subscribe((data) => {
    });
  }

}




