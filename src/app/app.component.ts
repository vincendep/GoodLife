import {Component, OnInit} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {LinguaService} from './services/lingua.service';
import {Utente} from './model/utente.model';
import {Observable} from 'rxjs';
import {UtenteService} from './services/utente.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    private utente$: Observable<Utente>;

    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private translate: TranslateService,
                private navController: NavController,
                private linguaService: LinguaService,
                private utenteService: UtenteService,
    ) {
        this.inizializzaApp();
    }


    ngOnInit(): void {
        this.utente$ = this.utenteService.getUtente();
        this.navController.navigateRoot('tabs');
    }

    inizializzaApp() {
        this.platform.ready().then(() => {
            this.iniziaTraduzione();
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    iniziaTraduzione() {
        // Set the default language for translation strings, and the current language.
        const linguaPreferita = this.linguaService.getLinguaPreferita();
        this.translate.setDefaultLang(linguaPreferita);
        this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
            if (lingua != null && lingua !== '') {
                this.translate.use(lingua);
            } else {
                this.translate.use(linguaPreferita);
                this.linguaService.updateLingua(linguaPreferita);
            }
        });
    }
}
