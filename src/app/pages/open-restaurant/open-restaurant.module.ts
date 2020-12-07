import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenRestaurantPageRoutingModule } from './open-restaurant-routing.module';

import { OpenRestaurantPage } from './open-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenRestaurantPageRoutingModule
  ],
  declarations: [OpenRestaurantPage]
})
export class OpenRestaurantPageModule {}
