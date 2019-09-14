import {Component, OnInit} from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';

@Component({
    selector: 'app-profilo-menu',
    templateUrl: './profilo-menu.component.html',
    styleUrls: ['./profilo-menu.component.scss'],
})
export class ProfiloMenuComponent implements OnInit {

    constructor(private navController: NavController,
                private utenteService: UtenteService,
                public popoverController: PopoverController) {
    }

    ngOnInit() {
    }

    showSettings() {
        this.navController.navigateRoot('impostazioni');
        this.popoverController.dismiss();
    }

    logout() {
        this.utenteService.logout();
        this.navController.navigateRoot('login');
        this.popoverController.dismiss();
    }
}
