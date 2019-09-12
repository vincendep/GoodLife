import {Component, OnInit} from '@angular/core';
import {DiarioAlimentare} from '../../model/diario.model';
import {TranslateService} from '@ngx-translate/core';
import {AlertController, ModalController, NavController, NavParams} from '@ionic/angular';
import {DiarioService} from '../../services/diario.service';
import {Pasto} from '../../model/pasto.model';
import {InserisciCiboPage} from '../inserisci-cibo/inserisci-cibo.page';
import {InserisciRicettaPage} from '../inserisci-ricetta/inserisci-ricetta.page';

@Component({
    selector: 'app-dettagli-pasto',
    templateUrl: './dettagli-pasto.page.html',
    styleUrls: ['./dettagli-pasto.page.scss'],
})
export class DettagliPastoPage implements OnInit {

    diarioAlimentare: DiarioAlimentare;
    pasto: Pasto;
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private translateService: TranslateService,
                private navController: NavController,
                private diarioService: DiarioService,
                private alertController: AlertController,
                private navParams: NavParams,
                private modalController: ModalController) {

        this.diarioAlimentare = new DiarioAlimentare();
        this.pasto = new Pasto();
    }

    ngOnInit() {
        this.pasto.alimenti = this.navParams.data.appParam;
    }

    async addCibo() {
        const modal = await this.modalController.create({
            component: InserisciCiboPage,
            componentProps: {appParam: this.pasto.alimenti}
        });
        await modal.present();
    }

    async addRicetta() {
        const modal = await this.modalController.create({
            component: InserisciRicettaPage,
            componentProps: {appParam: this.pasto.alimenti}
        });
        await modal.present();
    }

    eliminaAlimento(alimento: any) {
        this.showDeleteAlert(alimento);
    }

    async showDeleteAlert(alimento: any) {
        this.initTranslate();
        const alert = await this.alertController.create({
            header: this.deleteTitle,
            message: this.deleteMessage + ' ' + alimento.alimento.nome + '?',
            buttons: [{
                text: 'OK',
                handler: (data) => {
                    let index = this.pasto.alimenti.indexOf(alimento);
                    if (index > -1) {
                        this.pasto.alimenti.splice(index, 1);
                    }
                }
            }, this.translateService.instant('CANCEL_BUTTON')]
        });
        await alert.present();
    }

    initTranslate() {
        this.translateService.get('DELETE_TITLE').subscribe((data) => {
            this.deleteTitle = data;
        });
        this.translateService.get('DELETE_MESSAGE').subscribe((data) => {
            this.deleteMessage = data;
        });
    }

    async back() {
        await this.modalController.dismiss();
    }
}
