import { Component, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { DataService, Broadcaster } from '../../common';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './update-station-dialog.component.html'
})
export class UpdateStationModalDialogComponent implements IModalDialog {

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
            this.updateTariff();
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
    this.modalInfo = JSON.stringify(this.parentInfo, null, 4);
  }

  updateTariff() {
    console.log(JSON.parse(this.modalInfo));
    this.modalInfo = JSON.parse(this.modalInfo);
    // this.dataService.putStation([this.modalInfo]).subscribe((data) => {
    //     console.log(data);
    //     this.broadcaster.broadcast('refreshStations', true);
    //     this.toasterService.pop('success', 'Success', 'You have successfuly updated this location.');
    // });
    console.log('updated');
  }

}


