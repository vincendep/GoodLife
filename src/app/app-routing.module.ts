import {NgModule} from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {DataResolverService} from './services/data-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup',  loadChildren: './pages/signup/signup.module#SignupPageModule'},
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},
 // { path: 'inserisci-cibo', loadChildren: './pages/inserisci-cibo/inserisci-cibo.module#InserisciCiboPageModule'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
