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

  showStationModal: boolean = false;
  hoursQuestion: boolean = true;
  formStep: any = 'selection';
  openingHours: any = [];
  evsesObject: any = {};
  openingHoursObject: any = {};
  tariffObject: any = [];
  priceComponentObject: any = [];
  newStation: any = {};
  modalInfo: any;

  constructor(toasterService: ToasterService,
              private dataService: DataService,
              public router: Router,
              private modalDialogService: ModalDialogService,
              private viewContainer: ViewContainerRef,
              private broadcaster: Broadcaster) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.resetStationsModal();
    this.getStations();
    this.broadcaster.on('refreshStations').subscribe((data: any) => {
        this.getStations();
        this.closeAllLists();
    });
    this.getTariffs();
    this.broadcaster.on('refreshTariffs').subscribe((data: any) => {
      this.getTariffs();
      this.closeAllLists();
    });
  }

  getStations() {
    this.dataService.getStations().subscribe((data) => {
        this.stations = data;
    });
  }

  getEvses(index) {
    this.selectedStation = this.stations[index];
    this.selectedEvse = this.stations[index].data.evses;
    this.selectedEvseIndex = index;
    this.selectedScId = this.stations[index].scId;
    this.showEvses = !this.showEvses;
    this.showConnectors = false;
  }

  getConnectors(index) {
    this.connectors = this.selectedEvse[index].connectors;
    this.selectedConnectorsIndex = index;
    this.showConnectors = !this.showConnectors;
  }

  getTariff(index) {
    this.showTariffs = !this.showTariffs;
    this.selectedTariffIndex = index;
    const formatTariffDetail = JSON.stringify(this.tariffs[index], null, '\t').trim();
    this.tariffDetail = formatTariffDetail;
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
      data: this.selectedStation
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
  }


  addTariffDialog() {
    console.log('addTariffDialog()');
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
    console.log('updateTariffDialog()');
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
  }

  previousStep() {
    console.log(this.formStep);
    console.log(this.newStation);

    if (this.formStep === 'stationSummary') {
      this.formStep = 'tariffs';
    } else if (this.formStep === 'addTariffs') {
      this.formStep = 'tariffs';
    } else if (this.formStep === 'tariffs') {
      this.formStep = 'evsesAndConnectors';
    } else if (this.formStep === 'evsesAndConnectors') {
      if (this.hoursQuestion === true) {
        this.formStep = 'openingHoursQuestion';
      } else {
        this.formStep = 'openingHoursSelection';
      }
    } else if (this.formStep === 'openingHoursSelection') {
      this.formStep = 'openingHoursQuestion';
    } else if (this.formStep === 'openingHoursQuestion') {
      this.formStep = 'stationDescriptions';
    } else if (this.formStep === 'stationDescriptions') {
      this.formStep = 'stationBaseInfo';
    } else if (this.formStep === 'stationBaseInfo') {
      this.formStep = 'addingStations';
    } else if (this.formStep === 'addingStations') {
      this.formStep = 'selection';
    } else if (this.formStep === 'pullDataFromBackend' || this.formStep === 'uploadJsonFile') {
      this.formStep = 'selection';
    } else if (this.formStep === 'selection') {
      this.formStep = 'selection';
    } else {
      console.log('what now?');
    }
   }

  nextStep() {
    console.log(this.formStep);
    console.log(this.newStation);

    if (this.formStep === 'selection') {
      this.formStep = 'addingStations';
    } else if (this.formStep === 'addingStations') {
      this.formStep = 'stationBaseInfo';
    } else if (this.formStep === 'stationBaseInfo') {

    } else if (this.formStep === 'stationDescriptions') {
      if (!this.newStation.directions[0].text) {
        this.newStation.directions[0].language = 'en';
        this.newStation.directions[0].text = 'No description provided';
      }
      this.formStep = 'openingHoursQuestion';
    } else if (this.formStep === 'openingHoursQuestion') {
      if (this.hoursQuestion === true) {
        this.formStep = 'evsesAndConnectors';
        this.openingHoursObject.opening_times.twentyfourseven = true;
      } else {
        this.formStep = 'openingHoursSelection';
      }
    } else if (this.formStep === 'openingHoursSelection') {
        this.formStep = 'evsesAndConnectors';
    } else if (this.formStep === 'evsesAndConnectors') {
      if (this.tariffs.length === 0) {
        this.formStep = 'addTariffs';
      } else {
        this.formStep = 'tariffs';
      }
      if (this.tariffs.length !== 0) {
        this.tariffObject = this.tariffs;
      }
    } else if (this.formStep === 'tariffs') {
      console.log(this.tariffObject);
      this.formStep = 'stationSummary';
    } else if (this.formStep === 'addTariffs') {
      this.formStep = 'tariffs';
      console.log(this.tariffObject);
      this.dataService.deleteariff().subscribe(() => {
        this.dataService.newTariff(this.tariffObject).subscribe(() => {
          this.broadcaster.broadcast('refreshTariffs', true);
          this.toasterService.pop('success', 'Success', 'You have successfuly updated this tariff.');
        });
      });
    } else if (this.formStep === 'stationSummary') {
      // this.formStep = 'selection';
      this.addNewStation();
    } else if (this.formStep === 'uploadJsonFile') {
      // this.addStation();
    } else {
      console.log('what now?');
    }
  }

  useSavedData() {

  }

  addNewData() {
    this.setInitialValues();
  }

  addLanguageItem() {
    this.newStation.directions.push({
      language: 'en',
      text: ''
    });
    console.log(this.newStation.directions);
  }

  addEvse() {
    this.evsesObject.evses.push(
      {
        "evse_id": "",
        "uid": "",
        "status": "",
        "connectors": [{
            "id": "",
            "standard": "",
            "power_type": "",
            "voltage": 0,
            "amperage": 0,
            "tariff_id": "",
            "format": ""
          }
        ]
      }
    );
    console.log(this.evsesObject.evses);
  }

  addConnector(evseIndex) {
    this.evsesObject.evses[evseIndex].connectors.push({
        "id": "",
        "standard": "",
        "power_type": "",
        "voltage": "",
        "amperage": "",
        "tariff_id": "",
        format: ""
      }
    );
    console.log(this.evsesObject.evses);
  }

  getTariffs() {
    this.dataService.getTariffs().subscribe((data) => {
        this.tariffs = data;
    });
  }

  addTariff() {
    this.tariffObject.push({
      "id": "",
      "currency": "",
      "elements": [
        {
          "price_components": [
            {
              "type": "",
              "price": "",
              "step_size": ""
            }
          ]
        }
      ]
    }
  );
  console.log(this.tariffObject);
  }

  addPriceComponent(index) {
    this.tariffObject[index].elements.push({
        "price_components": [
          {
            "type": "",
            "price": "",
            "step_size": ""
          }
        ]
    }
  );
  console.log(this.tariffObject);
  }

  addNewStation() {
    this.dataService.postStation(
      {
        id: this.newStation.id,
        type: 'OTHER',
        name: this.newStation.name,
        directions:  this.newStation.directions,
        address: this.newStation.address,
        city: this.newStation.city,
        postal_code: this.newStation.postalCode,
        country: this.newStation.country,
        coordinates: {
          latitude: (this.newStation.latitude).toString(),
          longitude: (this.newStation.longitude).toString()
        },
        evses: this.evsesObject.evses,
        operator: {
          name: 'Motionwerk GmbH'
        }
      }).subscribe((data) => {
      this.broadcaster.broadcast('refreshStations', true);
      this.toasterService.pop('success', 'Success', 'You have successfuly added a new station.');
      this.resetStationsModal();
      this.setInitialValues();
      this.showStationModal = false;
    });
  }

  addStation() {
    this.showStationModal = false;
    this.safelyParseJSON();

    if (this.modalInfo.id && typeof this.modalInfo.id === 'string' &&
        this.modalInfo.type && typeof this.modalInfo.type === 'string' &&
        this.modalInfo.name && typeof this.modalInfo.name === 'string' &&
        this.modalInfo.address && typeof this.modalInfo.address === 'string' &&
        this.modalInfo.city && typeof this.modalInfo.city === 'string' &&
        this.modalInfo.postal_code && typeof this.modalInfo.postal_code === 'string' &&
        this.modalInfo.country && typeof this.modalInfo.country === 'string' &&
        this.modalInfo.coordinates.latitude && typeof this.modalInfo.coordinates.latitude === 'string' &&
        this.modalInfo.coordinates.longitude && typeof this.modalInfo.coordinates.longitude === 'string' &&
        this.modalInfo.evses && this.modalInfo.evses.length > 0 &&
        this.checkConnectors()) {
          this.dataService.postStation(this.modalInfo).subscribe((data) => {
            this.broadcaster.broadcast('refreshStations', true);
            this.toasterService.pop('success', 'Success', 'You have successfuly added a new station.');
            this.resetStationsModal();
            this.setInitialValues();
          });
    } else {
      this.toasterService.pop('error', 'Error', 'Please provide a valid Stations JSON object.');
    }
  }

  checkConnectors() {
    let i;
    let e;
    const connectorsCheck = [];
    for (i = 0; i < this.modalInfo.evses.length; i++) {
        if (!this.modalInfo.evses[i].connectors || this.modalInfo.evses[i].connectors.length === 0) {
          connectorsCheck.push(false);
        } else {
          for (e = 0; e < this.modalInfo.evses[i].connectors.length; e++) {
            if (!this.modalInfo.evses[i].connectors[e].id || typeof this.modalInfo.evses[i].connectors[e].id !== 'string' ||
                !this.modalInfo.evses[i].connectors[e].standard || typeof this.modalInfo.evses[i].connectors[e].standard !== 'string' ||
                !this.modalInfo.evses[i].connectors[e].format || typeof this.modalInfo.evses[i].connectors[e].format !== 'string' ||
                !this.modalInfo.evses[i].connectors[e].power_type || typeof this.modalInfo.evses[i].connectors[e].power_type !== 'string' ||
                typeof this.modalInfo.evses[i].connectors[e].voltage !== 'number' ||
                typeof this.modalInfo.evses[i].connectors[e].amperage !== 'number' ||
                !this.modalInfo.evses[i].connectors[e].tariff_id || typeof this.modalInfo.evses[i].connectors[e].tariff_id !== 'string') {
                  connectorsCheck.push(false);
            } else {
              connectorsCheck.push(true);
            }
          }
        }
    }
    if (connectorsCheck.includes(false)) {
      return false;
    } else {
      return true;
    }
  }

  safelyParseJSON () {
    let parsed;
    try {
      parsed =  this.modalInfo = JSON.parse(this.modalInfo);
    } catch (e) {

    }
    return parsed;
  }

  onStationsInfoSubmit() {
    this.formStep = 'stationDescriptions';
    this.newStation.latitude = parseFloat(this.newStation.latitude);
    this.newStation.longitude = parseFloat(this.newStation.longitude);
  }

  onOpeningHoursSubmit() {
    this.formStep = 'evsesAndConnectors';
    console.log(this.openingHoursObject);
  }

  onEvsesSubmit() {
    this.nextStep();
  }

  // reseting the form

  setInitialValues() {

    this.openingHours = [
      '00:00',
      '00:30', '01:00',
      '01:30', '02:00',
      '02:30', '03:00',
      '03:30', '04:00',
      '04:30', '05:00',
      '05:30', '06:00',
      '06:30', '07:00',
      '07:30', '08:00',
      '08:30', '09:00',
      '09:30', '10:00',
      '10:30', '11:00',
      '11:30', '12:00',
      '12:30', '13:00',
      '13:30', '14:00',
      '14:30', '15:00',
      '15:30', '16:00',
      '16:30', '17:00',
      '17:30', '18:00',
      '18:30', '19:00',
      '19:30', '20:00',
      '20:30', '21:00',
      '21:30', '22:00',
      '22:30', '23:00',
      '23:30'
    ];

    this.evsesObject = {
      "evses": [
        {
          "evse_id": "",
          "uid": "",
          "status": "",
          "connectors": [
            {
              "id": "1",
              "standard": "",
              "format": "",
              "power_type": "",
              "voltage": "",
              "amperage": "",
              "tariff_id": ""
            }
          ]
        }
      ]
    };

    this.openingHoursObject = {
      "opening_times": {
        "regular_hours": [
          {
            "weekday": 1,
            "period_begin": "",
            "period_end": ""
          },
          {
            "weekday": 2,
            "period_begin": "",
            "period_end": ""
          },
          {
            "weekday": 3,
            "period_begin": "",
            "period_end": ""
          },
          {
            "weekday": 4,
            "period_begin": "",
            "period_end": ""
          },
          {
            "weekday": 5,
            "period_begin": "",
            "period_end": ""
          },
          {
            "weekday": 6,
            "period_begin": "",
            "period_end": ""
          },
          {
            "weekday": 7,
            "period_begin": "",
            "period_end": ""
          }
        ],
      "twentyfourseven": false
      }
    };

    this.tariffObject = [{
      "id": "1",
      "currency": "",
      "elements": [
        {
          "price_components": [
            {
              "type": "",
              "price": "",
              "step_size": ""
            }
          ]
        }
      ]
    }];

    this.priceComponentObject = [{
      "id": "1",
      "currency": "EUR",
      "elements": [
        {
          "price_components": [
            {
              "type": "",
              "price": "",
              "step_size": ""
            }
          ]
        }
      ]
    }];

    this.newStation = {
      name: '',
      id: '',
      address: '',
      country: '',
      type: '',
      city: '',
      postalCode: '',
      latitude: '',
      longitude: '',
      directions: [{
        language: 'en',
        text: ''
      }],
      coordinates: {
        latitude: '',
        longitude: ''
      }
    };

    this.modalInfo = {
      "id": "Motionwerk-1",
      "type": "OTHER",
      "name": "Motionwerk 1",
      "directions": [{
        "language": "en",
        "text": "go the second on the left, then the third on the right after you take a left turn"
      }],
      "address": "Ruttenscheider Str. 120",
      "city": "Essen",
      "postal_code": "45131",
      "country": "DEU",
      "coordinates": {
        "latitude": "51.41232012",
        "longitude": "7.0122419"
      },
      "evses": [
        {
          "uid": "2",
          "evse_id": "BB-5983-3",
          "status": "AVAILABLE",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": "1",
              "standard": "IEC_62196_T2",
              "format": "CABLE",
              "power_type": "AC_3_PHASE",
              "voltage": 224,
              "amperage": 32,
              "tariff_id": "1"
            }
          ],
          "physical_reference": "2",
          "floor_level": "3"
        }
      ],
      "operator": {
        "name": "Motionwerk GmbH"
      }
    };
  }

  resetStationsModal() {
    this.formStep = 'selection';
  }

  uploadJsonFile() {
    this.setInitialValues();
    this.modalInfo = JSON.stringify(this.modalInfo, null, '\t');
  }

  toNumber(n) {
    n = Number(n);
    return n;
  }

}
