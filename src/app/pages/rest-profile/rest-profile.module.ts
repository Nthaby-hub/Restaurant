import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestProfilePageRoutingModule } from './rest-profile-routing.module';

import { RestProfilePage } from './rest-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestProfilePageRoutingModule
  ],
  declarations: [RestProfilePage]
})
export class RestProfilePageModule {}
