// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../common';
import {Http, Response} from '@angular/http';

import { Router } from '@angular/router';

@Injectable()
export class UnregisteredGuard implements CanActivate {

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
      this.http.get('http://52.57.155.233:9090/api/v1/cpo').subscribe(
        data => {
          console.log('Success' );
          this.canProceed = false;
        },
        err => {
          console.log('Error occured.');
          this.canProceed = true;
          this.router.navigate(['register']);
        }
      );
    } else {
      this.canProceed = false;
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
