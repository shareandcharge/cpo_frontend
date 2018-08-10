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
        "id": "2",
        "currency": "EUR",
        "elements": [{
                "price_components": [
                    {
                        "type": "ENERGY",
                        "price": 0.21,
                        "step_size": 1
                    }
                ]
            },
            {
                "price_components": [
                    {
                        "type": "FLAT",
                        "price": 5.1,
                        "step_size": 0
                    }
                ]
            },
            {
                "price_components": [
                    {
                        "type": "PARKING_TIME",
                        "price": 1,
                        "step_size": 3600
                    }
                ]
            },
            {
                "price_components": [
                    {
                        "type": "TIME",
                        "price": 2.5,
                        "step_size": 3600
                    }
                ]
            },
            {
                "price_components": [
                    {
                        "type": "FLAT",
                        "price": 0,
                        "step_size": 0
                    }
                ]
            }]
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
    this.modalInfo = JSON.stringify(this.modalInfo, null, 4);
  }

  addTariff() {
    console.log(JSON.parse(this.modalInfo));
    this.modalInfo = JSON.parse(this.modalInfo);
    this.dataService.deleteariff().subscribe((data) => {
      this.dataService.newTariff(this.modalInfo).subscribe((dataTariff) => {
        console.log(dataTariff);
        this.broadcaster.broadcast('refreshTariffs', true);
        this.toasterService.pop('success', 'Success', 'You have successfuly added a new tariff.');
      });
    });
  }

}


