import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DishesPageRoutingModule } from './dishes-routing.module';

import { DishesPage } from './dishes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DishesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DishesPage]
})
export class DishesPageModule {}
