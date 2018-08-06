// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../common';
import {Http, Response} from '@angular/http';

import { Router } from '@angular/router';

@Injectable()
export class RegisteredGuard implements CanActivate {

  canProceed = false;
  registeredFlag = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private http: Http
  ) {}

  getAccountInfo() {

    this.registeredFlag = localStorage.getItem('registeredCpo');
    console.log(this.registeredFlag);

    if (this.registeredFlag !== 'true') {
      this.http.get('http://18.195.223.26:9090/api/v1/msp').subscribe(
        data => {
          console.log('Success' );
          this.canProceed = true;
          localStorage.setItem('registeredCpo', 'true');
        },
        err => {
          console.log('Error occured.');
          this.canProceed = false;
        }
      );
    } else {
      this.canProceed = true;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.getAccountInfo();
    if (this.canProceed === false) {
        return false;
    } else {
        return true;
    }
  }

}
