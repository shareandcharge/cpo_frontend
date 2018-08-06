import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisteredGuard } from './auth/registered.guard';
import { UnregisteredGuard } from './auth/unregistered.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [RegisteredGuard, UnregisteredGuard]
})

export class AppRoutingModule {}

