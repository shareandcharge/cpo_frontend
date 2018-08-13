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
import { BlockUIModule } from 'ng-block-ui';
import { TooltipModule } from 'ngx-tooltip';

import { ServicesModule} from './common';

// import { ModalDialogComponent } from './common/components/session-timeout/session-timeout-modal.component';

import { AddStationModalDialogComponent } from './stations/add-station-dialog/add-station-dialog.component';
import { UpdateStationModalDialogComponent } from './stations/update-station-dialog/update-station-dialog.component';
import { DeleteStationModalDialogComponent } from './stations/delete-station-dialog/delete-station-dialog.component';
import { AddTariffModalDialogComponent } from './stations/add-tariff-dialog/add-tariff-dialog.component';
import { UpdateTariffModalDialogComponent } from './stations/update-tariff-dialog/update-tariff-dialog.component';
import { DeleteTariffModalDialogComponent } from './stations/delete-tariff-dialog/delete-tariff-dialog.component';

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
    AddStationModalDialogComponent,
    UpdateStationModalDialogComponent,
    DeleteStationModalDialogComponent,
    AddTariffModalDialogComponent,
    UpdateTariffModalDialogComponent,
    DeleteTariffModalDialogComponent
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
    NgxDatatableModule,
    BlockUIModule.forRoot(),
    TooltipModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-EN' }
  ],
  entryComponents: [
        AddStationModalDialogComponent,
        UpdateStationModalDialogComponent,
        DeleteStationModalDialogComponent,
        AddTariffModalDialogComponent,
        UpdateTariffModalDialogComponent,
        DeleteTariffModalDialogComponent
      ],
  bootstrap: [AppComponent]
})

export class AppModule {}

