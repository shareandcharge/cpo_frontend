import { Component, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { DataService, Broadcaster } from '../../common';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './update-station-dialog.component.html'
})
export class UpdateStationModalDialogComponent implements IModalDialog {

  parentInfo: any;
  modalInfo: any = [];
  actionButtons: any = [];
  toasterService: any;
  scID: any;

  constructor(private dataService: DataService,
              toasterService: ToasterService,
              private broadcaster: Broadcaster) {
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
        text: 'Update',
        buttonClass: 'sc-button modal-button modal-button-success',
        onAction: () => new Promise((resolve: any) => {
          setTimeout(() => {
            this.updateStation();
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
    this.modalInfo = JSON.stringify(this.parentInfo.data, null, '\t');
    this.scID = this.parentInfo.scId;
  }

  updateStation() {
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
          this.dataService.putStation(this.modalInfo, this.scID).subscribe((data) => {
              this.broadcaster.broadcast('refreshStations', true);
              this.toasterService.pop('success', 'Success', 'You have successfuly updated this station.');
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

}


