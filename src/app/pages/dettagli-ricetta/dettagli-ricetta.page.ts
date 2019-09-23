import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AlertController, IonItemSliding, ModalController, NavParams} from '@ionic/angular';
import {Ingrediente, Ricetta} from '../../model/ricetta.model';
import {RicettaService} from '../../services/ricetta.service';
import {InserisciCiboPage} from '../inserisci-cibo/inserisci-cibo.page';

@Component({
    selector: 'app-dettagli-ricetta',
    templateUrl: './dettagli-ricetta.page.html',
    styleUrls: ['./dettagli-ricetta.page.scss'],
})
export class DettagliRicettaPage implements OnInit {
    private ricettaFormModel: FormGroup;
    private ricetta: Ricetta;
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private translateService: TranslateService,
                private alertController: AlertController,
                private formBuilder: FormBuilder,
                private ricettaService: RicettaService,
                private modalController: ModalController,
                private navParams: NavParams) {
    }

    ngOnInit() {
        this.ricetta = this.navParams.data.appParam;
        this.ricettaFormModel = this.formBuilder.group({
            nome: [this.ricetta.nome, Validators.required]
        });
    }

    async conferma() {
        this.ricetta.nome = this.ricettaFormModel.get('nome').value;
        await this.modalController.dismiss(this.ricetta);
    }

    async cancella() {
        await this.modalController.dismiss();
    }

    async aggiungiAlimento() {
        const modal = await this.modalController.create({
            component: InserisciCiboPage,
            componentProps: {appParam: this.ricetta.ingredienti}
        });
        await modal.present();
    }

    async eliminaAlimento(ingrediente: any) {
        this.initTranslate();
        const alert = await this.alertController.create({
            header: this.deleteTitle,
            message: this.deleteMessage + ' ' + ingrediente.alimento.nome + '?',
            buttons: [{
                text: 'OK',
                handler: () => {
                    const index = this.ricetta.ingredienti.indexOf(ingrediente);
                    if (index > -1) {
                        this.ricetta.ingredienti.splice(index, 1);
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

    mostraOpzioniItem(sliding: IonItemSliding) {
        sliding.closeOpened().then(() => {
            sliding.open('end');
        });
    }

    async modificaAlimento(ingrediente: Ingrediente, sliding: IonItemSliding) {
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
                            const index = this.ricetta.ingredienti.indexOf(ingrediente);
                            if (index > -1) {
                                this.ricetta.ingredienti[index].quantita = data.quantita;
                            }
                        }
                    }
                }
            ],
        });
        await alert.present();
    }
}
