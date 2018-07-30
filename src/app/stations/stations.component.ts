import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';
import { DataService } from '../common';
import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';
import {AddStationsModalDialogComponent} from './add-stations-dialog/add-stations-dialog.component';
import {UpdateStationsModalDialogComponent} from './update-stations-dialog/update-stations-dialog.component';
import {DeleteStationsModalDialogComponent} from './delete-stations-dialog/delete-stations-dialog.component';


@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html'
})
export class StationsComponent implements OnInit {

  private toasterService: ToasterService;

  stations: any = [];
  selectedStation: any = [];
  selectedEvse: any = [];
  selectedEvseIndex: any;
  showEvses: boolean = false;
  connectors: any = [];
  selectedConnectorsIndex: any;
  showConnectors: boolean = false;
  addStations: any = [];
  updateStations: any = [];
  selectedScId: string = '';

  constructor(toasterService: ToasterService,
              private dataService: DataService,
              public router: Router,
              private modalDialogService: ModalDialogService,
              private viewContainer: ViewContainerRef) {
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

  // generateWallet() {
  //   this.dataService.generateWallet().subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  getEvses(index) {
    this.selectedStation = this.stations[index].data;
    this.selectedEvse = this.stations[index].data.evses;
    this.selectedEvseIndex = index;
    this.selectedScId = this.stations[index].scId;
    this.showEvses = !this.showEvses;
    this.showConnectors = false;
    // console.log(this.stations[index].scId);
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
  }

  addStationsDialog() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Add Locations',
      childComponent: AddStationsModalDialogComponent,
      settings: {
        closeButtonClass: 'close',
        closeButtonTitle: 'Close',
        modalClass: 'add-stations-modal'
      }
    });
  }

  updateStationsDialog() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Update Location',
      childComponent: UpdateStationsModalDialogComponent,
      settings: {
        closeButtonClass: 'close',
        closeButtonTitle: 'Close',
        modalClass: 'update-stations-modal'
      },
      data: this.selectedStation
    });
  }

  deleteStationsDialog() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Delete Location',
      childComponent: DeleteStationsModalDialogComponent,
      settings: {
        closeButtonClass: 'close',
        closeButtonTitle: 'Close',
        modalClass: 'delete-stations-modal'
      },
      data: this.selectedScId
    });
  }

}
