import { Component, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { DataService, Broadcaster} from '../../common';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './delete-tariff-dialog.component.html'
})
export class DeleteTariffModalDialogComponent implements IModalDialog {

  parentInfo: string;
  actionButtons: any = [];
  modalInfo: any = [];
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
        text: 'Delete',
        buttonClass: 'sc-button modal-button modal-button-success',
        onAction: () => new Promise((resolve: any) => {
          setTimeout(() => {
            this.deleteTariff();
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
    console.log(this.parentInfo);
  }

  deleteTariff() {
    // this.dataService.deleteStation(this.parentInfo).subscribe((data) => {
    //     console.log(data);
   this.broadcaster.broadcast('refreshTariffs', true);
    //     this.toasterService.pop('success', 'Success', 'You have successfuly deleted this location.');
    // });
    console.log('deleted');
  }

}


