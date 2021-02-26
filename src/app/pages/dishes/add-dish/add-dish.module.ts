import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDishPageRoutingModule } from './add-dish-routing.module';

import { AddDishPage } from './add-dish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDishPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddDishPage]
})
export class AddDishPageModule {}
