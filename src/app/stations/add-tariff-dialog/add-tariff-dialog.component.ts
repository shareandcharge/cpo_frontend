import { Component, ComponentRef} from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { DataService, Broadcaster } from '../../common';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

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
        text: 'Add',
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

    if (this.modalInfo[0].id && typeof this.modalInfo[0].id === 'string' &&
        this.modalInfo[0].currency && typeof this.modalInfo[0].currency === 'string' &&
        this.modalInfo[0].elements && this.modalInfo[0].elements.length > 0 &&
        this.checkpriceComponents()) {
          // console.log('Works');
          this.dataService.deleteariff().subscribe((data) => {
            this.dataService.newTariff(this.modalInfo).subscribe((dataTariff) => {
              console.log(dataTariff);
              this.broadcaster.broadcast('refreshTariffs', true);
              this.toasterService.pop('success', 'Success', 'You have successfuly added a new tariff.');
            });
          });
    } else {
      this.toasterService.pop('error', 'Error', 'Please provide a valid Tariffs JSON object.');
    }
  }

  checkpriceComponents() {
    let i;
    const priceComponentsCheck = [];
    for (i = 0; i < this.modalInfo[0].elements.length; i++) {
      // console.log(this.modalInfo[0].elements[i].price_components);
      if (!this.modalInfo[0].elements[i].price_components) {
        priceComponentsCheck.push(false);
        // console.log('false');
      } else {
        // priceComponentsCheck.push(true);

          if (typeof this.modalInfo[0].elements[i].price_components[0].type !== 'string' ||
              typeof this.modalInfo[0].elements[i].price_components[0].price !== 'number' ||
              typeof this.modalInfo[0].elements[i].price_components[0].step_size !== 'number') {
                priceComponentsCheck.push(false);
                // console.log('false');
          } else {
            // console.log('true');
            priceComponentsCheck.push(true);
          }

        }
  }
  // console.log(priceComponentsCheck);
  if (priceComponentsCheck.includes(false)) {
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


