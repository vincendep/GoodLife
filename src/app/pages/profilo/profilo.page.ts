import {Component, OnInit} from '@angular/core';
import {UtenteService} from '../../services/utente.service';
import {Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {ProfiloMenuComponent} from '../../components/profilo-menu/profilo-menu.component';

@Component({
    selector: 'app-profilo',
    templateUrl: './profilo.page.html',
    styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

    private utente$: Observable<Utente>;

    constructor(private translateService: TranslateService,
                private utenteService: UtenteService,
                public popoverController: PopoverController) {
    }

    ngOnInit() {
        this.utente$ = this.utenteService.getUtente();
    }

    async presentMenu(ev: any) {
        const popover = await this.popoverController.create({
            component: ProfiloMenuComponent,
            event: ev,
            translucent: true
        });
        return await popover.present();
    }
}
