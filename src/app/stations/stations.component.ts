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

  stations: any = [];
  selectedEvse: any = [];
  selectedEvseIndex: any;
  showEvses: boolean = false;
  connectors: any = [];
  selectedConnectorsIndex: any;
  showConnectors: boolean = false;

  constructor(toasterService: ToasterService,
              private dataService: DataService,
              public router: Router) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getStations();
  }

  getStations() {
    this.dataService.getStations().subscribe((data) => {
        this.stations = data;
        console.log(data);
    });
  }

  getEvses(index) {
    this.selectedEvse = this.stations[index].data.evses;
    this.selectedEvseIndex = index;
    this.showEvses = !this.showEvses;
    this.showConnectors = false;
    console.log(this.selectedEvse);
  }

  getConnectors(index) {
    this.connectors = this.selectedEvse[index].connectors;
    this.selectedConnectorsIndex = index;
    this.showConnectors = !this.showConnectors;
    // console.log(this.connectors);
  }

  closeAllLists(index) {
    this.showEvses = false;
    this.showConnectors = false;
    console.log('radi');
  }

}
