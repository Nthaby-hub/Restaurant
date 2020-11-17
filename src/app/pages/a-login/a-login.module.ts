import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ALoginPageRoutingModule } from './a-login-routing.module';

import { ALoginPage } from './a-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ALoginPageRoutingModule
  ],
  declarations: [ALoginPage]
})
export class ALoginPageModule {}
