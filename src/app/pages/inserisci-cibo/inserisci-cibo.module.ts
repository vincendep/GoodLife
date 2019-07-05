import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InserisciCiboPage } from './inserisci-cibo.page';

const routes: Routes = [
  {
    path: '',
    component: InserisciCiboPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InserisciCiboPage]
})
export class InserisciCiboPageModule {}
