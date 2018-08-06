import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../common';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html'
})
export class MnemonicComponent implements OnInit {

  mnemonicSeed: any = '';

  constructor(private dataService: DataService,
              public router: Router) { }

  ngOnInit() {
    this.getAccountInfo();
  }

  getAccountInfo() {
    this.dataService.getWalletSeed().subscribe((data) => {
      this.mnemonicSeed = data;
    });
  }

  continueToDrivers() {
    localStorage.setItem('registeredCpo', 'true');
    this.router.navigate(['stations']);
  }

}
