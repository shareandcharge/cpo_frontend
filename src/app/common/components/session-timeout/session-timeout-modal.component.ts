import { Component, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './session-timeout-modal.component.html'
})
export class ModalDialogComponent implements IModalDialog {

  parentInfo: string;

  constructor() { }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
    this.parentInfo = options.data;
  }

}


