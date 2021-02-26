import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRestPage } from './edit-rest.page';

const routes: Routes = [
  {
    path: '',
    component: EditRestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRestPageRoutingModule {}
