import { Component, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { DataService, Broadcaster } from '../../common';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

import * as Ajv from 'ajv';
import * as data from '../../../assets/schemas/schema.json';
const ajv = new Ajv({allErrors: true});
const schema = (<any>data);

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './update-tariff-dialog.component.html'
})
export class UpdateTariffModalDialogComponent implements IModalDialog {

  parentInfo: string;
  modalInfo: any = [];
  actionButtons: any = [];
  toasterService: any;

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
            this.updateTarif();
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
    this.modalInfo = JSON.stringify(this.parentInfo, null, '\t');
  }

  updateTarif() {
    this.safelyParseJSON();
    const valid = ajv.validate(schema, this.modalInfo[0]);

    if(!valid) {
      this.toasterService.pop('error', 'Error', 'Please provide a valid Tariffs JSON object.');
    }

    // for now we are checking only first object inside modalInfo
    // same thing for adding new tariff
    this.dataService.updateTarif(this.modalInfo).subscribe(() => {
      this.broadcaster.broadcast('refreshTariffs', true);
      this.toasterService.pop('success', 'Success', 'You have successfuly updated this tariff.');
    });

    // if (this.modalInfo[0].id && typeof this.modalInfo[0].id === 'string' &&
    //     this.modalInfo[0].currency && typeof this.modalInfo[0].currency === 'string' &&
    //     this.modalInfo[0].elements && this.modalInfo[0].elements.length > 0 &&
    //     this.checkpriceComponents()) {
    //       this.dataService.updateTarif(this.modalInfo).subscribe((dataTariff) => {
    //         this.broadcaster.broadcast('refreshTariffs', true);
    //         this.toasterService.pop('success', 'Success', 'You have successfuly updated this tariff.');
    //       });
    // } else {
    //   this.toasterService.pop('error', 'Error', 'Please provide a valid Tariffs JSON object.');
    // }
  }

  // checkpriceComponents() {
  //   let i;
  //   const priceComponentsCheck = [];
  //   for (i = 0; i < this.modalInfo[0].elements.length; i++) {
  //     if (!this.modalInfo[0].elements[i].price_components) {
  //       priceComponentsCheck.push(false);
  //     } else {
  //         if (typeof this.modalInfo[0].elements[i].price_components[0].type !== 'string' ||
  //             typeof this.modalInfo[0].elements[i].price_components[0].price !== 'number' ||
  //             typeof this.modalInfo[0].elements[i].price_components[0].step_size !== 'number') {
  //               priceComponentsCheck.push(false);
  //         } else {
  //           priceComponentsCheck.push(true);
  //         }
  //       }
  // }

  // if (priceComponentsCheck.includes(false)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  safelyParseJSON () {
    let parsed;
    try {
      parsed =  this.modalInfo = JSON.parse(this.modalInfo);
    } catch (e) {

    }
    return parsed;
  }

}


