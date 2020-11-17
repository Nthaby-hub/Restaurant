import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ALoginPage } from './a-login.page';

const routes: Routes = [
  {
    path: '',
    component: ALoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ALoginPageRoutingModule {}
