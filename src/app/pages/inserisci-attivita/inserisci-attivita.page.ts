import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AlertController, NavController} from '@ionic/angular';
import {EsercizioService} from '../../services/esercizio.service';
import {EsercizioFisico} from '../../model/esercizio-fisico.model';
import {Observable} from 'rxjs';
import {DiarioAlimentare} from '../../model/diario.model';
import {DiarioService} from '../../services/diario.service';
import {AttivitaFisicaService} from '../../services/attivita-fisica.service';

@Component({
    selector: 'app-inserisci-attivita',
    templateUrl: './inserisci-attivita.page.html',
    styleUrls: ['./inserisci-attivita.page.scss'],
})
export class InserisciAttivitaPage implements OnInit {

    private esercizi: Observable<EsercizioFisico[]>;
    private diarioAlimentare: DiarioAlimentare;
    private attivitaFisica: Array<{ esercizio: EsercizioFisico, durata: number }>;
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private translateService: TranslateService,
                private diarioService: DiarioService,
                private attivitaFisicaService: AttivitaFisicaService,
                private alertController: AlertController,
                private esercizioService: EsercizioService,
                private navController: NavController) {

        this.diarioAlimentare = new DiarioAlimentare();
        this.attivitaFisica = new Array<{ esercizio: EsercizioFisico, durata: number }>();
    }

    ngOnInit() {
        this.initTranslate();
        this.esercizi = this.esercizioService.listEsercizi();
        this.diarioAlimentare = this.diarioService.getDiario();
        this.attivitaFisica = this.attivitaFisicaService.getAttivitaFisica();
    }

    onClick(esercizioFisico: EsercizioFisico): void {
        this.selezionaDurata(esercizioFisico);
    }

    async selezionaDurata(esercizioFisico: EsercizioFisico) {
        const alert = await this.alertController.create({
            header: esercizioFisico.nome,
            message: this.translateService.instant('CALMIN') + ': ' + esercizioFisico.consumoPerMinuto + ' kcal',
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
                            this.attivitaFisica.push({esercizio: esercizioFisico, durata: data.durata});
                            this.diarioService.updateDiario(this.diarioAlimentare).subscribe();
                            this.navController.back();
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
}
