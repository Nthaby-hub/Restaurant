import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenRestaurantPage } from './open-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: OpenRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenRestaurantPageRoutingModule {}
