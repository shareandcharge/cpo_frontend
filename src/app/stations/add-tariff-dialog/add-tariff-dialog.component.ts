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
  modalInfo: any = [];
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
    // this.dataService.postStation(this.modalInfo).subscribe((data) => {
    //   console.log(data);
    this.broadcaster.broadcast('refreshTariffs', true);
    //   this.toasterService.pop('success', 'Success', 'You have successfuly added a new location.');
    // });
    console.log('added');
  }


}


