import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserBookPageRoutingModule } from './user-book-routing.module';

import { UserBookPage } from './user-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserBookPageRoutingModule
  ],
  declarations: [UserBookPage]
})
export class UserBookPageModule {}
