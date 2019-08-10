import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import {TranslateModule} from '@ngx-translate/core';
import {DataResolverService} from '../../services/data-resolver.service';
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'diario',
        children: [
          {
            path: '',
            loadChildren: '../diario/diario.module#DiarioPageModule'
          }
        ]
      },
      {
        path: 'dieta',
        children: [
          {
            path: '',
            loadChildren: '../dieta/dieta.module#DietaPageModule'
          }
        ]
      },
      {
        path: 'preferiti',
        children: [
          {
            path: '',
            loadChildren: '../preferiti/preferiti.module#PreferitiPageModule'
          }
        ]
      },
      {
        path: 'profilo',
        children: [
          {
            path: '',
            loadChildren: '../profilo/profilo.module#ProfiloPageModule',
            canActivateChild: [AuthGuard]
          }
        ]
      },
      {
        path: 'statistiche',
        children: [
          {
            path: '',
            loadChildren: '../statistiche/statistiche.module#StatistichePageModule'
          }
        ]
      },
        // TODO ma che è sta robba?!
      {path: 'diario/4',
        resolve: {
          special: DataResolverService
        },
        loadChildren: '../inserisci-attivita/inserisci-attivita.module#InserisciAttivitaPageModule'
      },
      {path: 'diario/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: '../inserisci-cibo/inserisci-cibo.module#InserisciCiboPageModule'
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
