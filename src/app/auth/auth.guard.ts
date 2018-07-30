// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../common';
import {Http, Response} from '@angular/http';

import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  canProceed = false;

  constructor(
    // private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private http: Http
  ) {}

  // getAccountInfo() {
  //   this.http.get('http://18.195.223.26:9090/api/v1/msp').subscribe(
  //     data => {
  //       console.log('Success' );
  //       this.canProceed = true;
  //     },
  //     err => {
  //       console.log('Error occured.');
  //       this.canProceed = false;
  //     }
  //   );
  // }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // this.getAccountInfo();
    // if (this.canProceed === false) {
    //   this.router.navigate(['register']);
    //   return false;
    // }
    return true;
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  //     this.getAccountInfo();
  //     if (!this.canProceed) {
  //       // this.router.navigate(['register']);
  //       return false;
  //     }
  //     return true;

  // }
}
