import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FavoritePage } from './favorite.page';
import {TranslateModule} from '@ngx-translate/core';
import {DataResolverService} from '../../services/data-resolver.service';

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
      },
      {
        path: 'meals/crea-pasto',
        loadChildren: '../crea-pasto/crea-pasto.module#CreaPastoPageModule'
      },
      {
        path: 'meals/crea-pasto/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: '../inserisci-cibo/inserisci-cibo.module#InserisciCiboPageModule'
      },
      {
        path: '',
        redirectTo: '/tabs/favorite/aliments',
        pathMatch: 'full'
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
