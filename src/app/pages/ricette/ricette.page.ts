import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AlertController, IonItemSliding, IonList, ModalController} from '@ionic/angular';
import {Ricetta} from '../../model/ricetta.model';
import {RicettaService} from '../../services/ricetta.service';
import {Observable} from 'rxjs';
import {DettagliRicettaPage} from '../dettagli-ricetta/dettagli-ricetta.page';
import {OverlayEventDetail} from '@ionic/core';

@Component({
    selector: 'ricette',
    templateUrl: './ricette.page.html',
    styleUrls: ['./ricette.page.scss'],
})
export class RicettePage implements OnInit {

    private ricette$: Observable<Ricetta[]>;
    @ViewChild(IonList) list: IonList;
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private translateService: TranslateService,
                private alertController: AlertController,
                private ricettaService: RicettaService,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.ricette$ = this.ricettaService.listRicette();
    }

    ionViewWillLeave() {
        if (this.list) {
            this.list.closeSlidingItems();
        }
    }

    async creaRicetta() {
        const ricetta: Ricetta = new Ricetta();
        ricetta.nome = '';
        ricetta.ingredienti = [];
        const modal = await this.modalController.create({
            component: DettagliRicettaPage,
            componentProps: {appParam: ricetta}
        });
        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
            if (detail !== null && detail.data !== undefined) {
                this.ricettaService.createRicetta(detail.data).subscribe(() => {
                    this.ricette$ = this.ricettaService.listRicette();
                });
            } else {
                console.log('cancel pressed');
            }
        });
        await modal.present();
    }

    async modificaRicetta(r: Ricetta, sliding: IonItemSliding) {
        const ricetta: Ricetta = new Ricetta();
        ricetta.id = r.id;
        ricetta.nome = r.nome;
        ricetta.ingredienti = r.ingredienti;
        sliding.close();
        const modal = await this.modalController.create({
            component: DettagliRicettaPage,
            componentProps: {appParam: ricetta}
        });
        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
            if (detail !== null && detail.data !== undefined) {
                this.ricettaService.createRicetta(detail.data).subscribe(() => {
                    this.ricette$ = this.ricettaService.listRicette();
                });
            } else {
                this.ricette$ = this.ricettaService.listRicette();
                console.log('cancel pressed');
            }
        });
        await modal.present();
    }

    async eliminaRicetta(ricetta: Ricetta, sliding: IonItemSliding) {
        sliding.close();
        this.initTranslate();
        const alert = await this.alertController.create({
            header: this.deleteTitle,
            message: this.deleteMessage + ' ' + ricetta.nome + '?',
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.ricettaService.deleteRicetta(ricetta).subscribe();
                }
            },
                this.translateService.instant('CANCEL_BUTTON')]
        });
        alert.onDidDismiss().then(() => this.ricette$ = this.ricettaService.listRicette());
        await alert.present();
    }

    // necessario per calcolare le calorie della ricetta nel template
    calorieTotaliRicetta(r: Ricetta) {
        const ricetta = new Ricetta();
        ricetta.ingredienti = r.ingredienti;
        return ricetta.getTotaleCalorie().toFixed(0);
    }

    mostraOpzioniItem(sliding: IonItemSliding) {
        sliding.closeOpened().then(() => {
            sliding.open('end');
        });
    }

    initTranslate() {
        this.translateService.get('DELETE_TITLE').subscribe((data) => {
            this.deleteTitle = data;
        });
        this.translateService.get('DELETE_MESSAGE').subscribe((data) => {
            this.deleteMessage = data;
        });
    }
}
