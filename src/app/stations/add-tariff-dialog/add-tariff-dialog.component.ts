import { Component, ComponentRef} from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { DataService, Broadcaster } from '../../common';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

import * as Ajv from 'ajv';
import * as data from '../../../assets/schemas/schema.json';
const ajv = new Ajv({allErrors: true});
const schema = (<any>data);

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './add-tariff-dialog.component.html'
})
export class AddTariffModalDialogComponent implements IModalDialog {

  parentInfo: string;
  actionButtons: any = [];
  modalInfo: any = [{
      "id": "1",
      "currency": "EUR",
      "elements": [
        {
          "price_components": [
            {
              "type": "ENERGY",
              "price": 0.20,
              "step_size": 1
            }
          ]
        },
        {
          "price_components": [
            {
              "type": "FLAT",
              "price": 3.5,
              "step_size": 0
            }
          ]
        }
      ]
    }];
  toasterService: any;

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
        text: 'Update',
        buttonClass: 'sc-button modal-button modal-button-success',
        onAction: () => new Promise((resolve: any) => {
          setTimeout(() => {
            this.addTariff();
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

  addTariff() {
    this.safelyParseJSON();
    const valid = ajv.validate(schema, this.modalInfo[0]);

    if (!valid) {
      this.toasterService.pop('error', 'Error', 'Please provide a valid Tariffs JSON object.');
    }
    // for now we are checking only first object inside modalInfo
    this.dataService.updateTarif(this.modalInfo).subscribe(() => {
      this.broadcaster.broadcast('refreshTariffs', true);
      this.toasterService.pop('success', 'Success', 'You have successfuly updated this tariff.');
    });
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


