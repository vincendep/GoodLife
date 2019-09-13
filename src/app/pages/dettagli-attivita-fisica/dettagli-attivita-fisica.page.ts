import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {AttivitaFisica} from '../../model/attivita-fisica.model';
import {InserisciAttivitaPage} from '../inserisci-attivita/inserisci-attivita.page';

@Component({
    selector: 'app-dettagli-attivita-fisica',
    templateUrl: './dettagli-attivita-fisica.page.html',
    styleUrls: ['./dettagli-attivita-fisica.page.scss'],
})
export class DettagliAttivitaFisicaPage implements OnInit {


    private attivitaFisica: AttivitaFisica;
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private alertController: AlertController,
                private translateService: TranslateService,
                private navParams: NavParams,
                private modalController: ModalController) {
        this.attivitaFisica = new AttivitaFisica();
    }

    ngOnInit() {
        this.attivitaFisica.esercizi = this.navParams.data.appParam;
    }

    async onAdd() {
        const modal = await this.modalController.create({
            component: InserisciAttivitaPage,
            componentProps: {appParam: this.attivitaFisica.esercizi}
        });
        await modal.present();
    }


    public eliminaAttivita(attivita: any) {
        this.showDeleteAlert(attivita);
    }

    async showDeleteAlert(attivita: any) {
        this.initTranslate();
        const alert = await this.alertController.create({
            header: this.deleteTitle,
            message: this.deleteMessage + ' ' + attivita.esercizio.nome + '?',
            buttons: [{
                text: 'OK',
                handler: (data) => {
                    const index = this.attivitaFisica.esercizi.indexOf(attivita);
                    if (index > -1) {
                        this.attivitaFisica.esercizi.splice(index, 1);
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
