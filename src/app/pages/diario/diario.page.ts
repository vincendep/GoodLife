import {Component, OnDestroy, OnInit} from '@angular/core';
import {DiarioAlimentare} from '../../model/diario.model';
import {Dieta} from '../../model/dieta.model';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DiarioService} from '../../services/diario.service';
import {PastoService} from '../../services/pasto.service';
import {AttivitaFisicaService} from '../../services/attivita-fisica.service';
import {Alimento} from '../../model/alimento.model';
import {UtenteService} from '../../services/utente.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
})
export class DiarioPage implements OnInit {

  private diarioAlimentare: DiarioAlimentare;
  private dieta: Dieta;

  constructor(private translateService: TranslateService,
              private navController: NavController,
              private router: Router,
              private diarioService: DiarioService,
              private pastoService: PastoService,
              private attivitaFisicaService: AttivitaFisicaService,
              private utenteService: UtenteService,
              private screenOrientation: ScreenOrientation) {

    this.diarioAlimentare = new DiarioAlimentare();
    this.dieta = new Dieta();
  }

  ngOnInit() {
    this.getDiario();
    // TODO dietaService
    this.utenteService.getUtente().subscribe( (utente) => {
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
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  incrementAcqua() {
    this.diarioAlimentare.incrementAcqua();
    this.updateDiario();
  }

  decrementAcqua() {
    this.diarioAlimentare.decrementAcqua();
    this.updateDiario();
  }

  goToDettagliPasto(pastoSelezionato: Array<{alimento: Alimento, quantita: number}>, tipoPasto: string) {
    this.pastoService.setTipoPasto(tipoPasto);
    this.pastoService.setPasto(pastoSelezionato);
    this.diarioService.setDiario(this.diarioAlimentare);
    this.navController.navigateForward('dettagli-pasto');
  }

  goToDettagliAttivitaFisica() {
    this.diarioService.setDiario(this.diarioAlimentare);
    this.attivitaFisicaService.setAttivitaFisica(this.diarioAlimentare.eserciziFisici);
    this.navController.navigateForward('dettagli-attivita-fisica');
  }

  updateDiario() {
    this.diarioService.updateDiario(this.diarioAlimentare).subscribe();
  }

  getDiario() {
    const o = this.diarioService.getDiarioByDate(this.diarioAlimentare.data).subscribe((response: DiarioAlimentare) => {
      this.diarioAlimentare.id = response.id;
      this.diarioAlimentare.acqua = response.acqua;
      this.diarioAlimentare.alimentiSnack = response.alimentiSnack;
      this.diarioAlimentare.alimentiCena = response.alimentiCena;
      this.diarioAlimentare.eserciziFisici = response.eserciziFisici;
      this.diarioAlimentare.alimentiColazione = response.alimentiColazione;
      this.diarioAlimentare.alimentiPranzo = response.alimentiPranzo;
      o.unsubscribe();
    });
  }
}
