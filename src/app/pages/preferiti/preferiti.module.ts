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
            loadChildren: '../alimenti/alimenti.module#AlimentiPageModule'
          }
        ]
      },
      {
        path: 'ricette',
        children: [
          {
            path: '',
            loadChildren: '../ricette/ricette.module#RicettePageModule'
          }
        ]
      },
      {
        path: 'ricette/dettagli-ricetta',
        loadChildren: '../dettagli-ricetta/dettagli-ricetta.module#DettagliRicettaPageModule'
      },
      {
        path: 'pasti/dettagli-ricetta/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: '../inserisci-cibo/inserisci-cibo.module#InserisciCiboPageModule'
      },
      {
        path: '',
        redirectTo: '/tabs/preferiti/ricette',
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
