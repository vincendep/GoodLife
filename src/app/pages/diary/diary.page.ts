import {Component, OnInit} from '@angular/core';
import {Dieta} from '../../model/dieta.model';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {NavigationExtras, Router} from '@angular/router';
import {DiarioService} from '../../services/diario.service';
import {DiarioAlimentare} from '../../model/diario.model';
import {Utility} from '../../utility/utility';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {

  private dataString: string;
  private diarioAlimentare: DiarioAlimentare;
  private dieta: Dieta;

  constructor(private translateService: TranslateService,
              private navController: NavController,
              private router: Router,
              private diarioService: DiarioService) {

    this.diarioAlimentare = new DiarioAlimentare();
    this.dataString = Utility.toIsoDate(new Date());
    this.getDiario();
  }

  ngOnInit() {
    // TODO dietaService
    this.dieta = new Dieta();
    this.dieta.calorieColazione = 60;
    this.dieta.caloriePranzo = 100;
    this.dieta.calorieSnack = 40;
    this.dieta.calorieCena = 120;
    this.dieta.proteineGiornaliere = 200;
    this.dieta.grassiGiornalieri = 300;
    this.dieta.carboidratiGiornalieri = 400;
  }

  // debug
  addFood() {}

  updateDiario() {
    this.diarioService.updateDiario(this.diarioAlimentare);
  }

  getDiario() {
    this.updateDiario();
    this.diarioService.getDiario(this.dataString).subscribe((response: DiarioAlimentare) => {
      this.diarioAlimentare.idDiarioAlimentare = response.idDiarioAlimentare;
      this.diarioAlimentare.data = new Date(response.data);
      this.diarioAlimentare.acqua = response.acqua;
      this.diarioAlimentare.alimentiColazione = response.alimentiColazione;
      this.diarioAlimentare.alimentiPranzo = response.alimentiPranzo;
      this.diarioAlimentare.alimentiColazione = response.alimentiSnack;
      this.diarioAlimentare.alimentiColazione = response.alimentiCena;
      this.diarioAlimentare.eserciziFisici = response.eserciziFisici;
      this.dataString = Utility.toIsoDate(response.data);
    });
  }
}

