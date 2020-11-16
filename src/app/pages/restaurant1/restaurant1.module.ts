import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Restaurant1PageRoutingModule } from './restaurant1-routing.module';

import { Restaurant1Page } from './restaurant1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Restaurant1PageRoutingModule
  ],
  declarations: [Restaurant1Page]
})
export class Restaurant1PageModule {}
