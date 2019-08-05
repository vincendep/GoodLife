import {Component, OnInit} from '@angular/core';
import {Dieta} from '../../model/dieta.model';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {NavigationExtras, Router} from '@angular/router';
import {Pasto, TipoPasto} from '../../model/pasto.model';
import {DataService} from '../../services/data.service';
import {AttivitaFisica} from '../../model/attivita-fisica.model';
import {DiarioService} from '../../services/diario.service';
import {Observable} from 'rxjs';
import {DiarioAlimentare} from '../../model/diario.model';
import set = Reflect.set;


@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {

  private diarioAlimentare$: Observable<DiarioAlimentare>;
  private date: string;
  private dieta: Dieta;

  private colazione: Pasto;
  private pranzo: Pasto;
  private snacks: Pasto;
  private cena: Pasto;

  private attivita: AttivitaFisica;

  private calorieTotMax: number;

  constructor(private translateService: TranslateService,
              private navController: NavController,
              private router: Router,
              private dataService: DataService,
              private diarioService: DiarioService) {
    this.date = new Date().toISOString();

    this.diarioAlimentare$ = this.diarioService.getDiario(this.date.slice(0, 10));

    this.dieta = new Dieta();
    this.colazione = new Pasto();
    this.colazione.tipoPasto = TipoPasto.COLAZIONE;
    this.pranzo = new Pasto();
    this.pranzo.tipoPasto = TipoPasto.PRANZO;
    this.snacks = new Pasto();
    this.snacks.tipoPasto = TipoPasto.SNACK;
    this.cena = new Pasto();
    this.cena.tipoPasto = TipoPasto.CENA;
    this.attivita = new AttivitaFisica();
  }

  async ngOnInit() {
    this.dataService.setData(0, this.colazione);
    this.dataService.setData(1, this.pranzo);
    this.dataService.setData(2, this.snacks);
    this.dataService.setData(3, this.cena);

    this.dieta.calorieGiornaliere = [60, 100, 40, 120];

    this.calorieTotMax = this.dieta.calorieGiornaliere.reduce(this.sum, 0);
    this.dieta.proteineGiornaliere = 200;
    this.dieta.grassiGiornalieri = 300;
    this.dieta.carboidratiGiornalieri = 400;

  }

  sum(a: number, b: number): number {
    return a + b;
  }

  addAcqua(a: DiarioAlimentare) {
    a.acqua += 1;
    this.diarioService.updateAcqua(this.date.slice(0, 10), a.acqua).subscribe();
  }
  removeAcqua(a: DiarioAlimentare) {
    a.acqua -= 1;
    this.diarioService.updateAcqua(this.date.slice(0, 10), a.acqua).subscribe();
  }

  addFood(a: Pasto) {
    this.router.navigateByUrl('tabs/diary/' + a.tipoPasto);
  }

  addAttivita() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.attivita
      }
    };
    this.router.navigate(['tabs/diary/4'], navigationExtras);
  }

  async changeDay() {
    this.diarioAlimentare$ = this.diarioService.getDiario(this.date.slice(0, 10));
  }
}

