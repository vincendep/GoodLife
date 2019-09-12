import {Component, OnInit} from '@angular/core';
import {Alimento} from '../../model/alimento.model';
import {AlimentoService} from '../../services/alimento.service';
import {AlertController, ModalController} from '@ionic/angular';
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
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private alimentoService: AlimentoService,
                private alertController: AlertController,
                private translateService: TranslateService,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.listAlimentiCreati();
        this.initTranslate();
    }

    async creaAlimento() {
        const alimento: Alimento = new Alimento();
        alimento.nome = '';
        alimento.calorie = null;
        alimento.proteine = null;
        alimento.grassi = null;
        alimento.carboidrati = null;
        alimento.categoriaAlimentare = null;
        const modal = await this.modalController.create({
            component: DettagliAlimentoPage,
            componentProps: {appParam: alimento}
        });
        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
            if (detail !== null && detail.data !== undefined) {
                this.alimentoService.createAlimento(detail.data).subscribe(() => {
                    this.listAlimentiCreati();
                });
            } else {
                console.log('cancel pressed');
            }
        });
        await modal.present();
    }

    async modificaAlimento(alimento: Alimento) {
        const modal = await this.modalController.create({
            component: DettagliAlimentoPage,
            componentProps: {appParam: alimento}
        });
        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
            if (detail !== null && detail.data !== undefined) {
                this.alimentoService.createAlimento(detail.data).subscribe(() => {
                    this.listAlimentiCreati();
                });
            } else {
                console.log('cancel pressed');
            }
        });
        await modal.present();
    }

    eliminaAlimento(alimento: Alimento) {
        this.showDeleteAlert(alimento);
    }

    async showDeleteAlert(alimento: Alimento) {
        this.initTranslate();
        let flag = false;
        const alert = await this.alertController.create({
            header: this.deleteTitle,
            message: this.deleteMessage + ' ' + alimento.nome + '?',
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.alimentoService.deleteAlimento(alimento).subscribe();
                    flag = true;
                }
            }
                , this.translateService.instant('CANCEL_BUTTON')]
        });
        alert.onDidDismiss().then(() => {
            if (flag) {
                this.listAlimentiCreati();
            }
        });
        await alert.present();
    }

    public listAlimentiCreati() {
        this.alimenti$ = this.alimentoService.listAlimentiCreati();
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
