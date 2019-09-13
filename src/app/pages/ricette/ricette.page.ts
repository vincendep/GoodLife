import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AlertController, IonItemSliding, ModalController} from '@ionic/angular';
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
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private translateService: TranslateService,
                private alertController: AlertController,
                private ricettaService: RicettaService,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.listRicetteCreate();
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
                    this.listRicetteCreate();
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
                    this.listRicetteCreate();
                });
            } else {
                this.listRicetteCreate();
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
        alert.onDidDismiss().then(() => this.listRicetteCreate());
        await alert.present();
    }

    listRicetteCreate() {
        this.ricette$ = this.ricettaService.listRicette();
    }

    calorieTotaliRicetta(r: Ricetta) {
        const ricetta = new Ricetta();
        ricetta.ingredienti = r.ingredienti;
        return ricetta.getTotaleCalorie().toFixed(0);
    }

    showItemOptions(sliding: IonItemSliding) {
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
