import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthLoginGuard } from './auth/authLogin.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [AuthGuard, AuthLoginGuard]
})

export class AppRoutingModule {}

