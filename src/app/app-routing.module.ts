import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';


const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule'},
    {path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivateChild: [AuthGuard]},
    {path: 'inserisci-cibo', loadChildren: './pages/inserisci-cibo/inserisci-cibo.module#InserisciCiboPageModule'},
    {path: 'dettagli-pasto', loadChildren: './pages/dettagli-pasto/dettagli-pasto.module#DettagliPastoPageModule'},
    {path: 'dettagli-attivita-fisica', loadChildren: './pages/dettagli-attivita-fisica/dettagli-attivita-fisica.module#DettagliAttivitaFisicaPageModule'},
    {path: 'inserisci-attivita', loadChildren: './pages/inserisci-attivita/inserisci-attivita.module#InserisciAttivitaPageModule'},
    {path: 'inserisci-ricetta', loadChildren: './pages/inserisci-ricetta/inserisci-ricetta.module#InserisciRicettaPageModule'},
    {path: 'impostazioni', loadChildren: './pages/impostazioni/impostazioni.module#ImpostazioniPageModule'},
    {path: 'dettagli-ricetta/', loadChildren: './pages/dettagli-ricetta/dettagli-ricetta.module#DettagliRicettaPageModule'}

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
