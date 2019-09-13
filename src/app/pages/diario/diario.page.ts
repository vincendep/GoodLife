import {Component, OnInit} from '@angular/core';
import {DiarioAlimentare} from '../../model/diario.model';
import {Dieta} from '../../model/dieta.model';
import {TranslateService} from '@ngx-translate/core';
import {ModalController} from '@ionic/angular';
import {DiarioService} from '../../services/diario.service';
import {Alimento} from '../../model/alimento.model';
import {UtenteService} from '../../services/utente.service';
import {OverlayEventDetail} from '@ionic/core';
import {DettagliPastoPage} from '../dettagli-pasto/dettagli-pasto.page';
import {DateUtility} from '../../utility/date-utility';
import {DettagliAttivitaFisicaPage} from '../dettagli-attivita-fisica/dettagli-attivita-fisica.page';

@Component({
    selector: 'app-diario',
    templateUrl: './diario.page.html',
    styleUrls: ['./diario.page.scss'],
})
export class DiarioPage implements OnInit {

    private data: string;
    private diarioAlimentare: DiarioAlimentare;
    private dieta: Dieta;

    constructor(private translateService: TranslateService,
                private diarioService: DiarioService,
                private utenteService: UtenteService,
                private modalController: ModalController) {

        this.data = DateUtility.fromDatetoIsoDateString(new Date());
        // TODO remove
        this.diarioAlimentare = new DiarioAlimentare();
        this.dieta = new Dieta();
    }

    ngOnInit() {
        this.getDiarioByDate();
        this.getDietaCorrenteUtente();
    }

    incrementAcqua() {
        this.diarioAlimentare.incrementAcqua();
        this.diarioService.updateAcqua(this.diarioAlimentare.id, this.diarioAlimentare.acqua).subscribe();
    }

    decrementAcqua() {
        if (this.diarioAlimentare.acqua > 0) {
            this.diarioAlimentare.decrementAcqua();
            this.diarioService.updateAcqua(this.diarioAlimentare.id, this.diarioAlimentare.acqua).subscribe();
        }
    }

    async showDettagliPasto(pastoSelezionato: Array<{ alimento: Alimento, quantita: number }>, pasto: string) {
        const modal = await this.modalController.create({
            component: DettagliPastoPage,
            componentProps: {appParam: pastoSelezionato}
        });
        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
            this.diarioService.updateDiario(this.diarioAlimentare).subscribe();
        });
        await modal.present();
    }

    async showDettagliAttivitaFisica() {
        const modal = await this.modalController.create({
            component: DettagliAttivitaFisicaPage,
            componentProps: {appParam: this.diarioAlimentare.eserciziFisici}
        });
        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
            this.diarioService.updateDiario(this.diarioAlimentare).subscribe();
        });
        await modal.present();
    }

    getDiarioByDate() {
        this.diarioService.getDiarioByDate(this.data).subscribe((response: DiarioAlimentare) => {
            this.diarioAlimentare.id = response.id;
            this.diarioAlimentare.acqua = response.acqua;
            this.diarioAlimentare.alimentiSnack = response.alimentiSnack;
            this.diarioAlimentare.alimentiCena = response.alimentiCena;
            this.diarioAlimentare.eserciziFisici = response.eserciziFisici;
            this.diarioAlimentare.alimentiColazione = response.alimentiColazione;
            this.diarioAlimentare.alimentiPranzo = response.alimentiPranzo;
        });
    }

    getDietaCorrenteUtente() {
        this.utenteService.getUtente().subscribe((utente) => {
            const d = utente.diete[utente.diete.length - 1];
            this.dieta.obiettivo = d.obiettivo;
            this.dieta.calorieColazione = d.calorieColazione;
            this.dieta.caloriePranzo = d.caloriePranzo;
            this.dieta.calorieSnack = d.calorieSnack;
            this.dieta.calorieCena = d.calorieCena;
            this.dieta.carboidrati = d.carboidrati;
            this.dieta.proteine = d.proteine;
            this.dieta.grassi = d.grassi;
        });
    }
}
