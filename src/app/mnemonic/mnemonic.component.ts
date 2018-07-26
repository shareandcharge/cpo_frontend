import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../common/index';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html'
})
export class MnemonicComponent implements OnInit {

  mnemonicSeed: any = '';

  constructor(private dataService: DataService,
              public router: Router) { }

  ngOnInit() {
    this.getSeed();
  }

  getSeed() {
    this.dataService.getSeed({
    }).subscribe((data) => {
      this.mnemonicSeed = data;
    });
  }

  continueToDrivers() {
    this.router.navigate(['stations']);
  }

}
