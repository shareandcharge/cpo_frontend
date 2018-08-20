import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';
import { DataService, Broadcaster } from '../common';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { AddStationModalDialogComponent } from '../stations/add-station-dialog/add-station-dialog.component';
import { UpdateStationModalDialogComponent } from '../stations/update-station-dialog/update-station-dialog.component';
import { DeleteStationModalDialogComponent } from '../stations/delete-station-dialog/delete-station-dialog.component';
import { AddTariffModalDialogComponent } from '../stations/add-tariff-dialog/add-tariff-dialog.component';
import { UpdateTariffModalDialogComponent } from '../stations/update-tariff-dialog/update-tariff-dialog.component';
import { DeleteTariffModalDialogComponent } from '../stations/delete-tariff-dialog/delete-tariff-dialog.component';


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
  tabIndex: any = 0;
  tariffs: any = [];
  selectedTariffIndex: any;
  showTariffs: boolean = false;
  tariffDetail: any = [];

  constructor(toasterService: ToasterService,
              private dataService: DataService,
              public router: Router,
              private modalDialogService: ModalDialogService,
              private viewContainer: ViewContainerRef,
              private broadcaster: Broadcaster) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getStations();
    this.broadcaster.on('refreshStations').subscribe((data: any) => {
        this.getStations();
        this.closeAllLists();
    });
    this.getTariffs();
    this.broadcaster.on('refreshTariffs').subscribe((data: any) => {
      this.getTariffs();
      this.closeAllLists();
      console.log('refreshed tariffs');
    });
  }

  getStations() {
    this.dataService.getStations().subscribe((data) => {
        this.stations = data;
        console.log(data);
    });
  }

  getEvses(index) {
    this.selectedStation = this.stations[index];
    this.selectedEvse = this.stations[index].data.evses;
    this.selectedEvseIndex = index;
    this.selectedScId = this.stations[index].scId;
    this.showEvses = !this.showEvses;
    this.showConnectors = false;
    console.log(this.selectedEvse);
  }

  getConnectors(index) {
    this.connectors = this.selectedEvse[index].connectors;
    this.selectedConnectorsIndex = index;
    this.showConnectors = !this.showConnectors;
  }

  getTariffs() {
    this.dataService.getTariffs().subscribe((data) => {
        this.tariffs = data;
        console.log(data);
    });
  }

  getTariff(index) {
    this.showTariffs = !this.showTariffs;
    this.selectedTariffIndex = index;
    const formatTariffDetail = JSON.stringify(this.tariffs[index], null, '\t').trim();
    this.tariffDetail = formatTariffDetail;
    // this.tariffDetail = JSON.stringify(JSON.parse(formatTariffDetail), null, 4);
    // console.log(this.tariffDetail);

    // JSON.stringify(JSON.parse(body));

    console.log(index);
  }

  closeAllLists() {
    this.showEvses = false;
    this.showConnectors = false;
    this.showTariffs = false;
  }

  addStationDialog() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Add Stations',
      childComponent: AddStationModalDialogComponent,
      settings: {
        closeButtonClass: 'close',
        closeButtonTitle: 'Close',
        modalClass: 'add-stations-modal'
      }
    });
  }

  updateStationDialog() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Update Station',
      childComponent: UpdateStationModalDialogComponent,
      settings: {
        closeButtonClass: 'close',
        closeButtonTitle: 'Close',
        modalClass: 'update-stations-modal'
      },
      data: this.selectedStation.data
    });
  }

  deleteStationDialog() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Delete Station',
      childComponent: DeleteStationModalDialogComponent,
      settings: {
        closeButtonClass: 'close',
        closeButtonTitle: 'Close',
        modalClass: 'delete-stations-modal'
      },
      data: this.selectedScId
    });
    console.log(this.selectedScId);
  }


  addTariffDialog() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Add Tariff',
      childComponent: AddTariffModalDialogComponent,
      settings: {
        closeButtonClass: 'close',
        closeButtonTitle: 'Close',
        modalClass: 'add-stations-modal'
      },
      data: this.tariffs
    });
  }

  updateTariffDialog() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Update Tariff',
      childComponent: UpdateTariffModalDialogComponent,
      settings: {
        closeButtonClass: 'close',
        closeButtonTitle: 'Close',
        modalClass: 'update-stations-modal'
      },
      data: this.tariffs
    });
  }

  deleteTariffDialog() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Delete Tariff',
      childComponent: DeleteTariffModalDialogComponent,
      settings: {
        closeButtonClass: 'close',
        closeButtonTitle: 'Close',
        modalClass: 'delete-stations-modal'
      },
      data: this.tariffs
    });
    console.log(this.selectedScId);
  }


}
