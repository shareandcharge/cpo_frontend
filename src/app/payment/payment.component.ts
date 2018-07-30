import { Component, OnInit } from '@angular/core';
import {DataService} from '../common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

}
