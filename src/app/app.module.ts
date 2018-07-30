import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import 'hammerjs';
import { TabsModule } from 'ngx-tabs';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './appRouting.module';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalDialogModule } from 'ngx-modal-dialog';

import { ServicesModule} from './common';

// import { ModalDialogComponent } from './common/components/session-timeout/session-timeout-modal.component';

import { AddStationsModalDialogComponent } from './stations/add-stations-dialog/add-stations-dialog.component';
import { UpdateStationsModalDialogComponent } from './stations/update-stations-dialog/update-stations-dialog.component';
import { DeleteStationsModalDialogComponent } from './stations/delete-stations-dialog/delete-stations-dialog.component';

import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { PaymentComponent } from './payment/payment.component';
import { MnemonicComponent } from './mnemonic/mnemonic.component';
import { StationsComponent } from './stations/stations.component';

import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';

registerLocaleData(localeDE);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AccountComponent,
    PaymentComponent,
    MnemonicComponent,
    StationsComponent,
    AddStationsModalDialogComponent,
    UpdateStationsModalDialogComponent,
    DeleteStationsModalDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    ServicesModule,
    TabsModule,
    ToasterModule.forRoot(),
    ModalDialogModule.forRoot(),
    NgxDatatableModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-EN' }
  ],
  entryComponents: [
        AddStationsModalDialogComponent,
        UpdateStationsModalDialogComponent,
        DeleteStationsModalDialogComponent
      ],
  bootstrap: [AppComponent]
})

export class AppModule {}

