import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DataService } from './common';
import {Http, Response} from '@angular/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from '../environments/environment';

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
    private dataService: DataService,
    private http: Http
  ) {
    this.toasterService = toasterService;
  }

  public ngOnInit() {
    this.getAccountInfo();
    this.registeredFlag = localStorage.getItem('registeredCpo');

    if (this.registeredFlag !== 'true') {
      this.http.get(environment.apiUrl + 'cpo').subscribe(
        data => {
          localStorage.setItem('registeredCpo', 'true');
          this.registeredFlag = localStorage.getItem('registeredCpo');
          this.router.navigate(['stations']);
        },
        err => {
            this.router.navigate(['register']);
        }
      );
    } else {
      this.router.navigate(['stations']);
    }

  }

  getAccountInfo() {
    this.dataService.getAccountInfo().subscribe((data) => {
         this.accountInfo = data;
    });
  }

}
