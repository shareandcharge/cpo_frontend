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
  modalInfo: any = {
    "id": "Motionwerk-1",
    "type": "OTHER",
    "name": "Motionwerk 1",
    "directions": {
      "language": "en",
      "text": "go the second on the left, then the third on the right after you take a left turn"
    },
    "address": "Ruttenscheider Str. 120",
    "city": "Essen",
    "postal_code": "45131",
    "country": "DE",
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
            "standard": "IEC_61851-1_T2",
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
        onAction: () => new Promise((resolve: any) => {
          setTimeout(() => {

            resolve();
          }, 20);
        })
      }, {
        text: 'Add',
        buttonClass: 'sc-button modal-button modal-button-success',
        onAction: () => new Promise((resolve: any) => {
          setTimeout(() => {
            this.addStation();
            resolve();
          }, 20);
        })
      }, {
        text: '',
        buttonClass: 'close',
        onAction: () => new Promise((resolve: any) => {
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
          // console.log('Works');
          this.dataService.postStation(this.modalInfo).subscribe((data) => {
            console.log(data);
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
          // console.log('false');
        } else {
          for (e = 0; e < this.modalInfo.evses[i].connectors.length; e++) {
            // console.log(e);
            if (!this.modalInfo.evses[i].connectors[e].id || typeof this.modalInfo.evses[i].connectors[e].id !== 'string' ||
                !this.modalInfo.evses[i].connectors[e].standard || typeof this.modalInfo.evses[i].connectors[e].standard !== 'string' ||
                !this.modalInfo.evses[i].connectors[e].format || typeof this.modalInfo.evses[i].connectors[e].format !== 'string' ||
                !this.modalInfo.evses[i].connectors[e].power_type || typeof this.modalInfo.evses[i].connectors[e].power_type !== 'string' ||
                typeof this.modalInfo.evses[i].connectors[e].voltage !== 'number' ||
                typeof this.modalInfo.evses[i].connectors[e].amperage !== 'number' ||
                !this.modalInfo.evses[i].connectors[e].tariff_id || typeof this.modalInfo.evses[i].connectors[e].tariff_id !== 'string') {
                  connectorsCheck.push(false);
                  // console.log('false');
            } else {
              connectorsCheck.push(true);
              // console.log('true');
            }
            // console.log(connectorsCheck);
            // console.log(this.modalInfo.evses[i].connectors[e].id);
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
      // console.log('Does not work');
    }
    return parsed;
  }

}


