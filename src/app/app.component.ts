import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DataService } from './common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  private toasterService: ToasterService;
  public toasterConfig: ToasterConfig = new ToasterConfig ({
    showCloseButton: true,
    tapToDismiss: true,
    limit: 5,
    timeout: 6000
  });
  title = 'CPO Dashboard app';
  accountInfo: any = [];
  registeredFlag = '';

  constructor (
    public router: Router,
    toasterService: ToasterService,
    private viewContainer: ViewContainerRef,
    private dataService: DataService
  ) {
    this.toasterService = toasterService;
  }

  public ngOnInit() {
    this.getAccountInfo();
    this.registeredFlag = localStorage.getItem('registeredCpo');
    if (this.registeredFlag === 'true') {
      console.log('ima flag');
      this.router.navigate(['stations']);
    } else {
      this.router.navigate(['register']);
      console.log('nema flag');
    }
  }

  getAccountInfo() {
    this.dataService.getAccountInfo().subscribe((data) => {
         this.accountInfo = data;
         console.log(this.accountInfo);
    });
  }

}
