import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FavoritePage } from './favorite.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: FavoritePage,
    children: [
      {
        path: 'aliments',
        children: [
          {
            path: '',
            loadChildren: '../aliments/aliments.module#AlimentsPageModule'
          }
        ]
      },
      {
        path: 'meals',
        children: [
          {
            path: '',
            loadChildren: '../meals/meals.module#MealsPageModule'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FavoritePage]
})
export class FavoritePageModule {}
