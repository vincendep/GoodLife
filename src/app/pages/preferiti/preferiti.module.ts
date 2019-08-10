import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreferitiPage } from './preferiti.page';
import {TranslateModule} from '@ngx-translate/core';
import {DataResolverService} from '../../services/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PreferitiPage,
    children: [
      {
        path: 'alimenti',
        children: [
          {
            path: '',
            loadChildren: '../alimenyi/alimenti.module#AlimentiPageModule'
          }
        ]
      },
      {
        path: 'pasti',
        children: [
          {
            path: '',
            loadChildren: '../pasti/pasti.module#PastiPageModule'
          }
        ]
      },
      {
        path: 'pasti/crea-pasto',
        loadChildren: '../crea-pasto/crea-pasto.module#CreaPastoPageModule'
      },
      {
        path: 'pasti/crea-pasto/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: '../inserisci-cibo/inserisci-cibo.module#InserisciCiboPageModule'
      },
      {
        path: '',
        redirectTo: '/tabs/preferiti/pasti',
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
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [PreferitiPage]
})
export class PreferitiPageModule {}
