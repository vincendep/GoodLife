import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {IonicStorageModule} from '@ionic/storage';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {httpInterceptorProviders} from './interceptors';
import {DettagliAlimentoPageModule} from './pages/dettagli-alimento/dettagli-alimento.module';
import {DettagliPastoPageModule} from './pages/dettagli-pasto/dettagli-pasto.module';
import {InserisciCiboPageModule} from './pages/inserisci-cibo/inserisci-cibo.module';
import {InserisciRicettaPageModule} from './pages/inserisci-ricetta/inserisci-ricetta.module';
import {DettagliRicettaPageModule} from './pages/dettagli-ricetta/dettagli-ricetta.module';
import {InserisciAttivitaPageModule} from './pages/inserisci-attivita/inserisci-attivita.module';
import {DettagliAttivitaFisicaPageModule} from './pages/dettagli-attivita-fisica/dettagli-attivita-fisica.module';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        IonicStorageModule.forRoot({
            name: 'goodlife',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        AppRoutingModule,
        DettagliAlimentoPageModule,
        DettagliRicettaPageModule,
        DettagliPastoPageModule,
        InserisciCiboPageModule,
        InserisciRicettaPageModule,
        InserisciAttivitaPageModule,
        DettagliAttivitaFisicaPageModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
