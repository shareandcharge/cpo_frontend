import { Component, ComponentRef} from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { DataService, Broadcaster } from '../../common';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './add-station-dialog.component.html'
})
export class AddStationModalDialogComponent implements IModalDialog {

  toasterService: any;
  parentInfo: string;
  actionButtons: any = [];
  hoursQuestion: boolean = true;
  formStep: any = 'selection';
  tariffs: any = [];

  openingHours: any = [
    '07:00', '07:15', '07:30', '07:45',
    '08:00', '08:15', '08:30', '08:45',
    '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45',
    '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45',
    '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30', '16:45',
    '17:00', '17:15', '17:30', '17:45',
    '18:00', '18:15', '18:30', '18:45',
    '19:00', '19:15', '19:30', '19:45',
    '20:00', '20:15', '20:30', '20:45',
    '21:00', '21:15', '21:30', '21:45',
    '22:00', '22:15', '22:30', '22:45'
  ];

  evsesObject: any = {
    "evses": [
      {
        "evse_id": "",
        "connectors": [
          {
            "id": "",
            "standard": "",
            "power_type": "",
            "voltage": "",
            "amperage": "",
            "tariff_id": ""
          }
        ]
      }
    ]
  };

  openingHoursObject: any = {
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

  tariffObject: any = [{
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

  newStation: any = {
    language: [{
      langCode: 'en',
      description: ''
    }],
    coordinates: {
      latitude: 0,
      longitude: 0
    }
  };

  modalInfo: any = {
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

  constructor(private dataService: DataService,
    private broadcaster: Broadcaster,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
    this.actionButtons = [
      {
        text: 'Cancel',
        buttonClass: 'sc-button modal-button modal-button-cancel',
        onAction: () => new Promise((resolve: any, reject: any) => {
          setTimeout(() => {

            resolve();
          }, 20);
        })
      },
      // {
      //   text: 'Previous',
      //   buttonClass: 'sc-button modal-button modal-button-success',
      //   onAction: () => {
      //     setTimeout(() => {
      //       // this.addStation();
      //       this.previousStep();
      //     }, 20);
      //   }
      // }, {
      //   text: this.actionButtonText,
      //   buttonClass: 'sc-button modal-button modal-button-success',
      //   onAction: () => {
      //     setTimeout(() => {
      //       // this.addStation();
      //       this.nextStep();
      //     }, 20);
      //   }
      // },
       {
        text: '',
        buttonClass: 'close',
        onAction: () => new Promise((resolve: any, reject: any) => {
          setTimeout(() => {

            resolve();
          }, 20);
        })
      }
    ];
   }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
    this.parentInfo = options.data;
    this.modalInfo = JSON.stringify(this.modalInfo, null, '\t');
    this.getTariffs();
  }

  previousStep() {
    console.log(this.formStep);

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

    if (this.formStep === 'selection') {
      this.formStep = 'addingStations';
    } else if (this.formStep === 'addingStations') {
      this.formStep = 'stationBaseInfo';
    } else if (this.formStep === 'stationBaseInfo') {

    } else if (this.formStep === 'stationDescriptions') {
      this.formStep = 'openingHoursQuestion';
    } else if (this.formStep === 'openingHoursQuestion') {
      if (this.hoursQuestion === true) {
        this.formStep = 'evsesAndConnectors';
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
    } else if (this.formStep === 'tariffs') {
      console.log(this.tariffObject);
      this.formStep = 'stationSummary';
    } else if (this.formStep === 'addTariffs') {
      this.formStep = 'tariffs';
    } else if (this.formStep === 'stationSummary') {
      // this.formStep = 'selection';
      console.log('Saved');
    } else if (this.formStep === 'uploadJsonFile') {
      // this.addStation();
    } else {
      console.log('what now?');
    }
  }

  useSavedData() {

  }

  addNewData() {

  }

  addLanguageItem() {
    this.newStation.language.push({
      langCode: 'en',
      description: ''
    });
    console.log(this.newStation.language);
  }

  addEvse() {
    this.evsesObject.evses.push(
      {
        "evse_id": "",
        "connectors": [{
            "id": "1",
            "standard": "",
            "power_type": "",
            "voltage": "",
            "amperage": "",
            "tariff_id": ""
          }
        ]
      }
    );
    console.log(this.evsesObject.evses);
  }

  addConnector(index) {
    this.evsesObject.evses[index].connectors.push({
        "id": index + 1,
        "standard": "",
        "power_type": "",
        "voltage": "",
        "amperage": "",
        "tariff_id": ""
      }
    );
    console.log(this.evsesObject.evses);
  }

  getTariffs() {
    this.dataService.getTariffs().subscribe((data) => {
        this.tariffs = data;
        if (this.tariffs.length !== 0) {
          this.tariffObject = this.tariffs;
        }
    });
  }

  // tariffOdbject: any = [{
  //   "id": "1",
  //   "currency": "EUR",
  //   "elements": [
  //     {
  //       "price_components": [
  //         {
  //           "type": "",
  //           "price": "",
  //           "step_size": ""
  //         }
  //       ]
  //     }
  //   ]
  // }];

  addTariff() {
    this.tariffObject[0].elements.push({
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

  addStation() {
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

  onopeningHoursSubmit() {
    this.formStep = 'evsesAndConnectors';
    console.log(this.openingHoursObject);
  }

}


