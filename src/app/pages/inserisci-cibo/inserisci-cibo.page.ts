import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AlimentoService} from '../../services/alimento.service';
import {Alimento} from '../../model/alimento.model';
import {AlertController, NavController} from '@ionic/angular';
import {PastoService} from '../../services/pasto.service';
import {Observable} from 'rxjs';
import {DiarioAlimentare} from '../../model/diario.model';
import {DiarioService} from '../../services/diario.service';


@Component({
  selector: 'app-inserisci-cibo',
  templateUrl: './inserisci-cibo.page.html',
  styleUrls: ['./inserisci-cibo.page.scss'],
})

export class InserisciCiboPage implements OnInit {

    private alimenti$: Observable<Alimento[]>;
    private diarioAlimentare: DiarioAlimentare;
    private pasto: Array<{alimento: Alimento, quantita: number}>;
    private categoriaSelezionata: string;
    private ricerca = '';

    constructor(private translateService: TranslateService,
                private diarioService: DiarioService,
                private alimentoService: AlimentoService,
                private pastoService: PastoService,
                private alertController: AlertController,
                private navController: NavController) {
        this.diarioAlimentare = new DiarioAlimentare();
        this.pasto = new Array<{alimento: Alimento, quantita: number}>();
        this.categoriaSelezionata = 'CARNE';
    }


    ngOnInit() {
        this.alimenti$ = this.alimentoService.listAlimenti();
        this.diarioAlimentare = this.diarioService.getDiario();
        this.pasto = this.pastoService.getPasto();
    }

    onClick(alimento: Alimento): void {
        this.selezionaDose(alimento);
    }

    async selezionaDose(a: Alimento) {
        const alert = await this.alertController.create({
            header: a.nome,
            animated: true,
            cssClass: 'alertFixing',
            message: this.translateService.instant('CALORIE') +
                ': ' + a.calorie + ' kcal <br/><br/>' + this.translateService.instant('PROTEINE') +
                ': ' + a.proteine + ' g <br/><br/>' + this.translateService.instant('GRASSI') +
                ': ' + a.grassi + ' g <br/><br/>' + this.translateService.instant('CARBOIDRATI') +
                ': ' +  a.carboidrati + ' g',
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
                            if (this.pastoService.tipoPasto === 'nuovaRicetta') {
                                this.navController.back();
                            } else {
                            this.diarioService.updateDiario(this.diarioAlimentare).subscribe();
                            this.navController.back();
                            }
                        }
                    }
                }
            ],
        });
        await alert.present();
    }
    reset() {
        this.categoriaSelezionata = '';
    }
}
