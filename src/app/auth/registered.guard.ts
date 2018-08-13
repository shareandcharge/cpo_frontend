// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../common';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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

    if (this.registeredFlag !== 'true') {
      this.http.get(environment.apiUrl + 'cpo').subscribe(
        data => {
          this.canProceed = true;
        },
        err => {
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
