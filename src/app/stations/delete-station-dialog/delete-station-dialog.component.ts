import { Component, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { DataService, Broadcaster} from '../../common';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './delete-station-dialog.component.html'
})
export class DeleteStationModalDialogComponent implements IModalDialog {

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
            this.deleteStation();
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
  }

  deleteStation() {
    this.dataService.deleteStation(this.parentInfo).subscribe((data) => {
        this.broadcaster.broadcast('refreshStations', true);
        this.toasterService.pop('success', 'Success', 'You have successfuly deleted this station.');
    });
  }

}


