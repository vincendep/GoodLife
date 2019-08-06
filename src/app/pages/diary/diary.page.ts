import {Component, OnInit} from '@angular/core';
import {Dieta} from '../../model/dieta.model';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {NavigationExtras, Router} from '@angular/router';
import {DiarioService} from '../../services/diario.service';
import {DiarioAlimentare} from '../../model/diario.model';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {

  private data: Date;
  private diarioAlimentare: DiarioAlimentare;
  private dieta: Dieta;

  constructor(private translateService: TranslateService,
              private navController: NavController,
              private router: Router,
              private diarioService: DiarioService) {

    this.diarioAlimentare = new DiarioAlimentare();
    this.data = new Date();

    // this.diarioService.getDiario(this.data).subscribe((diario: DiarioAlimentare) => {
    //   this.diarioAlimentare = diario;
    // });
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
    this.diarioService.getDiario(this.data);
  }
}

