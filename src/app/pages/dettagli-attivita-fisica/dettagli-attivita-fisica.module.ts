import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettagliAttivitaFisicaPage } from './dettagli-attivita-fisica.page';

const routes: Routes = [
  {
    path: '',
    component: DettagliAttivitaFisicaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DettagliAttivitaFisicaPage]
})
export class DettagliAttivitaFisicaPageModule {}
