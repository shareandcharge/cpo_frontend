import { Routes } from '@angular/router';
import { RegisteredGuard } from './auth/registered.guard';
import { UnregisteredGuard } from './auth/unregistered.guard';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { PaymentComponent } from './payment/payment.component';
import { MnemonicComponent } from './mnemonic/mnemonic.component';
import { StationsComponent } from './stations/stations.component';

export const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full', component: AppComponent},
  { path: 'register', component: RegisterComponent, canActivate: [UnregisteredGuard]},
  { path: 'account', component: AccountComponent, canActivate: [RegisteredGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [RegisteredGuard]},
  { path: 'mnemonic', component: MnemonicComponent, canActivate: [UnregisteredGuard]},
  { path: 'stations', component: StationsComponent, canActivate: [RegisteredGuard]}
];
