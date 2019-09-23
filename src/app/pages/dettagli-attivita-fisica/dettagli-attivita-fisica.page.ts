import {Component, OnInit} from '@angular/core';
import {AlertController, IonItemSliding, ModalController, NavParams} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {AttivitaFisica} from '../../model/attivita-fisica.model';
import {InserisciAttivitaPage} from '../inserisci-attivita/inserisci-attivita.page';
import {EsercizioFisico} from '../../model/esercizio-fisico.model';

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

    async aggiungiAttivita() {
        const modal = await this.modalController.create({
            component: InserisciAttivitaPage,
            componentProps: {appParam: this.attivitaFisica.esercizi}
        });
        await modal.present();
    }

    async modificaAttivita(attivita: { esercizio: EsercizioFisico, durata: number }, sliding: IonItemSliding) {
        sliding.close();
        const alert = await this.alertController.create({
            header: attivita.esercizio.nome,
            message: this.translateService.instant('CALMIN') + ': ' + attivita.esercizio.consumoPerMinuto + ' kcal',
            cssClass: 'alertFixing',
            inputs: [
                {
                    name: 'durata',
                    type: 'number',
                    placeholder: '0 min',
                }
            ],
            buttons: [
                {
                    text: this.translateService.instant('CANCEL_BUTTON'),
                    role: 'cancel',
                },
                {
                    text: 'OK',
                    handler: (data) => {
                        if (data.durata > 0) {
                            const index = this.attivitaFisica.esercizi.indexOf(attivita);
                            if (index > -1) {
                                this.attivitaFisica.esercizi[index].durata = data.durata;
                            }
                        }
                    }
                }
            ],
        });
        await alert.present();
    }

    async eliminaAttivita(attivita: any, sliding: IonItemSliding) {
        sliding.close();
        this.iniziaTraduzione();
        const alert = await this.alertController.create({
            header: this.deleteTitle,
            message: this.deleteMessage + ' ' + attivita.esercizio.nome + '?',
            buttons: [{
                text: 'OK',
                handler: () => {
                    const index = this.attivitaFisica.esercizi.indexOf(attivita);
                    if (index > -1) {
                        this.attivitaFisica.esercizi.splice(index, 1);
                    }
                }
            }, this.translateService.instant('CANCEL_BUTTON')]
        });
        await alert.present();
    }

    iniziaTraduzione() {
        this.translateService.get('DELETE_TITLE').subscribe((data) => {
            this.deleteTitle = data;
        });
        this.translateService.get('DELETE_MESSAGE').subscribe((data) => {
            this.deleteMessage = data;
        });
    }

    async indietro() {
        await this.modalController.dismiss();
    }

    mostraOpzioniItem(sliding: IonItemSliding) {
        sliding.closeOpened().then(() => {
            sliding.open('end');
        });
    }
}
