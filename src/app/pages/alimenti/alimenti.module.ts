import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlimentiPage } from './alimenti.page';
import {TranslateModule} from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: AlimentiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [AlimentiPage]
})
export class AlimentiPageModule {}
