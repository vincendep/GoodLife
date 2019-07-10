import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import {TranslateModule} from '@ngx-translate/core';
import {DataResolverService} from '../../services/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'diary',
        children: [
          {
            path: '',
            loadChildren: '../diary/diary.module#DiaryPageModule'
          }
        ]
      },
      {
        path: 'diet',
        children: [
          {
            path: '',
            loadChildren: '../diet/diet.module#DietPageModule'
          }
        ]
      },
      {
        path: 'favorite',
        children: [
          {
            path: '',
            loadChildren: '../favorite/favorite.module#FavoritePageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: '../stats/stats.module#StatsPageModule'
          }
        ]
      },
      {path: 'diary/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: './pages/inserisci-cibo/inserisci-cibo.module#InserisciCiboPageModule'
      },
      {
        path: '',
        redirectTo: '/tabs/diary',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
