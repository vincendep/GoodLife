import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AlertController, IonItemSliding, ModalController, NavParams} from '@ionic/angular';
import {Pasto} from '../../model/pasto.model';
import {InserisciCiboPage} from '../inserisci-cibo/inserisci-cibo.page';
import {InserisciRicettaPage} from '../inserisci-ricetta/inserisci-ricetta.page';
import {Alimento} from '../../model/alimento.model';

@Component({
    selector: 'app-dettagli-pasto',
    templateUrl: './dettagli-pasto.page.html',
    styleUrls: ['./dettagli-pasto.page.scss'],
})
export class DettagliPastoPage implements OnInit {

    private pasto: Pasto;
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private translateService: TranslateService,
                private alertController: AlertController,
                private navParams: NavParams,
                private modalController: ModalController) {

        this.pasto = new Pasto();
    }

    ngOnInit() {
        this.pasto.ingredienti = this.navParams.data.appParam;
    }

    async aggiungiAlimento() {
        const modal = await this.modalController.create({
            component: InserisciCiboPage,
            componentProps: {appParam: this.pasto.ingredienti}
        });
        await modal.present();
    }

    async aggiungiRicetta() {
        const modal = await this.modalController.create({
            component: InserisciRicettaPage,
            componentProps: {appParam: this.pasto.ingredienti}
        });
        await modal.present();
    }

    async eliminaAlimento(alimento: any, sliding: IonItemSliding) {
        sliding.close();
        this.initTranslate();
        const alert = await this.alertController.create({
            header: this.deleteTitle,
            message: this.deleteMessage + ' ' + alimento.alimento.nome + '?',
            buttons: [{
                text: 'OK',
                handler: () => {
                    const index = this.pasto.ingredienti.indexOf(alimento);
                    if (index > -1) {
                        this.pasto.ingredienti.splice(index, 1);
                    }
                }
            }, this.translateService.instant('CANCEL_BUTTON')]
        });
        await alert.present();
    }

    async modificaAlimento(ingrediente: { alimento: Alimento, quantita: number }, sliding: IonItemSliding) {
        sliding.close();
        const alert = await this.alertController.create({
            header: ingrediente.alimento.nome,
            animated: true,
            cssClass: 'alertFixing',
            message: this.translateService.instant('CALORIE') +
                ': ' + ingrediente.alimento.calorie + ' kcal/100 g <br/><br/>' + this.translateService.instant('PROTEINE') +
                ': ' + ingrediente.alimento.proteine + ' g/100 g <br/><br/>' + this.translateService.instant('GRASSI') +
                ': ' + ingrediente.alimento.grassi + ' g/100 g <br/><br/>' + this.translateService.instant('CARBOIDRATI') +
                ': ' + ingrediente.alimento.carboidrati + ' g/100 g',
            inputs: [
                {
                    name: 'quantita',
                    type: 'number',
                    placeholder: '0 g',
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
                        if (data.quantita > 0) {
                            const index = this.pasto.ingredienti.indexOf(ingrediente);
                            if (index > -1) {
                                this.pasto.ingredienti[index].quantita = data.quantita;
                            }
                        }
                    }
                }
            ],
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

    showItemOptions(sliding: IonItemSliding) {
        sliding.closeOpened().then(() => {
            sliding.open('end');
        });
    }
}
