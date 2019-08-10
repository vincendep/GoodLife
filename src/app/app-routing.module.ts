import {NgModule} from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'signup',  loadChildren: './pages/signup/signup.module#SignupPageModule'},
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivateChild: [AuthGuard]},
  { path: 'dettagli-alimento', loadChildren: './pages/dettagli-alimento/dettagli-alimento.module#DettagliAlimentoPageModule' }
 // { path: 'crea-pasto', loadChildren: './pages/crea-pasto/crea-pasto.module#CreaPastoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
