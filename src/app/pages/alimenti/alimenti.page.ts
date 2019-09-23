import {Component, OnInit, ViewChild} from '@angular/core';
import {Alimento} from '../../model/alimento.model';
import {AlimentoService} from '../../services/alimento.service';
import {AlertController, IonItemSliding, IonList, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {DettagliAlimentoPage} from '../dettagli-alimento/dettagli-alimento.page';
import {Observable} from 'rxjs';
import {OverlayEventDetail} from '@ionic/core';


@Component({
    selector: 'app-alimenti',
    templateUrl: './alimenti.page.html',
    styleUrls: ['./alimenti.page.scss'],
})
export class AlimentiPage implements OnInit {

    private alimenti$: Observable<Alimento[]>;
    @ViewChild(IonList) list: IonList;
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private alimentoService: AlimentoService,
                private alertController: AlertController,
                private translateService: TranslateService,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.alimenti$ = this.alimentoService.listAlimentiCreati();
    }

    ionViewWillLeave() {
        if (this.list) {
            this.list.closeSlidingItems();
        }
    }

    async creaAlimento() {
        const alimento: Alimento = new Alimento();

        const modal = await this.modalController.create({
            component: DettagliAlimentoPage,
            componentProps: {appParam: alimento}
        });
        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
            if (detail !== null && detail.data !== undefined) {
                this.alimentoService.createAlimento(detail.data).subscribe(() => {
                    this.alimenti$ = this.alimentoService.listAlimentiCreati();
                });
            } else {
                console.log('cancel pressed');
            }
        });
        await modal.present();
    }

    async modificaAlimento(alimento: Alimento, sliding: IonItemSliding) {
        sliding.close();
        const modal = await this.modalController.create({
            component: DettagliAlimentoPage,
            componentProps: {appParam: alimento}
        });
        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
            if (detail !== null && detail.data !== undefined) {
                this.alimentoService.createAlimento(detail.data).subscribe(() => {
                    this.alimenti$ = this.alimentoService.listAlimentiCreati();
                });
            } else {
                console.log('cancel pressed');
            }
        });
        await modal.present();
    }

    async eliminaAlimento(alimento: Alimento, sliding: IonItemSliding) {
        sliding.close();
        this.iniziaTraduzione();
        const alert = await this.alertController.create({
            header: this.deleteTitle,
            message: this.deleteMessage + ' ' + alimento.nome + '?',
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.alimentoService.deleteAlimento(alimento.id).subscribe();
                }
            }
                , this.translateService.instant('CANCEL_BUTTON')]
        });
        alert.onDidDismiss().then(() => this.alimenti$ = this.alimentoService.listAlimentiCreati());
        await alert.present();
    }

    mostraOpzioniItem(sliding: IonItemSliding) {
        sliding.closeOpened().then(() => {
            sliding.open('end');
        });
    }

    iniziaTraduzione() {
        this.translateService.get('DELETE_TITLE').subscribe((data) => {
            this.deleteTitle = data;
        });
        this.translateService.get('DELETE_MESSAGE').subscribe((data) => {
            this.deleteMessage = data;
        });
    }
}
