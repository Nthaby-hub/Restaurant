import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestProfilePage } from './rest-profile.page';

const routes: Routes = [
  {
    path: '',
    component: RestProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestProfilePageRoutingModule {}
