import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthLoginGuard } from './auth/authLogin.guard';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { PaymentComponent } from './payment/payment.component';
import { MnemonicComponent } from './mnemonic/mnemonic.component';
import { StationsComponent } from './stations/stations.component';

export const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  { path: 'mnemonic', component: MnemonicComponent, canActivate: [AuthGuard]},
  { path: 'stations', component: StationsComponent, canActivate: [AuthGuard]}
];
