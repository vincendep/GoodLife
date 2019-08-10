import {Component, OnDestroy, OnInit} from '@angular/core';
import {DiarioAlimentare} from '../../model/diario.model';
import {Dieta} from '../../model/dieta.model';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DiarioService} from '../../services/diario.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
})
export class DiarioPage implements OnInit, OnDestroy {

  private diarioAlimentare: DiarioAlimentare;
  private dieta: Dieta;

  constructor(private translateService: TranslateService,
              private navController: NavController,
              private router: Router,
              private diarioService: DiarioService) {

    this.diarioAlimentare = new DiarioAlimentare();
    this.dieta = new Dieta();
  }

  ngOnInit() {
    this.getDiario();

    // TODO dietaService
    this.dieta.calorieColazione = 60;
    this.dieta.caloriePranzo = 100;
    this.dieta.calorieSnack = 40;
    this.dieta.calorieCena = 120;
    this.dieta.proteineGiornaliere = 200;
    this.dieta.grassiGiornalieri = 300;
    this.dieta.carboidratiGiornalieri = 400;
  }

  ngOnDestroy() {
    this.updateDiario();
  }

  // debug
  addFood() {}

  updateDiario() {
    this.diarioService.updateDiario(this.diarioAlimentare).subscribe();
  }

  getDiario() {
    this.diarioService.getDiarioByDate(this.diarioAlimentare.data).subscribe((response: DiarioAlimentare) => {
      this.diarioAlimentare.idDiarioAlimentare = response.idDiarioAlimentare;
      this.diarioAlimentare.acqua = response.acqua;
      this.diarioAlimentare.alimentiColazione = response.alimentiColazione;
      this.diarioAlimentare.alimentiPranzo = response.alimentiPranzo;
      this.diarioAlimentare.alimentiColazione = response.alimentiSnack;
      this.diarioAlimentare.alimentiColazione = response.alimentiCena;
      this.diarioAlimentare.eserciziFisici = response.eserciziFisici;
    });
  }
}
