import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishesPage } from './dishes.page';

const routes: Routes = [
  {
    path: '',
    component: DishesPage
  },  {
    path: 'add-dish',
    loadChildren: () => import('./add-dish/add-dish.module').then( m => m.AddDishPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DishesPageRoutingModule {}
