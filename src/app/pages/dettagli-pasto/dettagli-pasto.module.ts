import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettagliPastoPage } from './dettagli-pasto.page';

const routes: Routes = [
  {
    path: '',
    component: DettagliPastoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DettagliPastoPage]
})
export class DettagliPastoPageModule {}
