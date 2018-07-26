import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';
import { DataService } from '../common/index';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html'
})
export class StationsComponent implements OnInit {

  private toasterService: ToasterService;

  constructor(toasterService: ToasterService,
              private dataService: DataService,
              public router: Router) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
  }

}
