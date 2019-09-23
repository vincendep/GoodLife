import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AlimentoService} from '../../services/alimento.service';
import {Alimento} from '../../model/alimento.model';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-inserisci-cibo',
    templateUrl: './inserisci-cibo.page.html',
    styleUrls: ['./inserisci-cibo.page.scss'],
})

export class InserisciCiboPage implements OnInit {

    private alimenti$: Observable<Alimento[]>;
    private pasto: Array<{ alimento: Alimento, quantita: number }>;
    private categoriaSelezionata: string;
    private ricerca = '';
    private nascondiSkeletonText = false;

    constructor(private translateService: TranslateService,
                private alimentoService: AlimentoService,
                private alertController: AlertController,
                private navParams: NavParams,
                private modalController: ModalController) {

        this.pasto = new Array<{ alimento: Alimento, quantita: number }>();
        this.categoriaSelezionata = 'CARNE';
    }


    ngOnInit() {
        this.alimenti$ = this.alimentoService.listAlimenti();
        setTimeout(() => {
            this.nascondiSkeletonText = true;
        }, 1000);
        this.pasto = this.navParams.data.appParam;
    }

    async selezionaDose(a: Alimento) {
        const alert = await this.alertController.create({
            header: a.nome,
            animated: true,
            message: this.translateService.instant('CALORIE') +
                ': ' + a.calorie + ' kcal/100 g <br/><br/>' + this.translateService.instant('PROTEINE') +
                ': ' + a.proteine + ' g/100 g <br/><br/>' + this.translateService.instant('GRASSI') +
                ': ' + a.grassi + ' g/100 g <br/><br/>' + this.translateService.instant('CARBOIDRATI') +
                ': ' + a.carboidrati + ' g/100 g',
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
                            this.pasto.push({alimento: a, quantita: data.quantita});
                            this.modalController.dismiss();
                        }
                    }
                }
            ],
        });
        await alert.present();
    }

    resetCategoria() {
        this.categoriaSelezionata = '';
    }

    async indietro() {
        await this.modalController.dismiss();
    }
}
