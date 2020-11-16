import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBookPage } from './user-book.page';

const routes: Routes = [
  {
    path: '',
    component: UserBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBookPageRoutingModule {}
