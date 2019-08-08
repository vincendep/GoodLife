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
import {DateUtility} from '../../utility/utility';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {

  private diarioAlimentare: DiarioAlimentare;
  private date: string;
  private dieta: Dieta;

  private colazione: Pasto;
  private pranzo: Pasto;
  private snacks: Pasto;
  private cena: Pasto;

  private attivita: AttivitaFisica;

  constructor(private translateService: TranslateService,
              private navController: NavController,
              private router: Router,
              private dataService: DataService,
              private diarioService: DiarioService) {

    this.diarioAlimentare = new DiarioAlimentare();
    this.date = DateUtility.toIsoDate(new Date());
    this.getDiario();

    this.dieta = new Dieta();
    this.colazione = new Pasto();
    this.colazione.alimenti = this.diarioAlimentare.alimentiColazione;
    this.colazione.tipoPasto = TipoPasto.COLAZIONE;
    this.pranzo = new Pasto();
    this.pranzo.alimenti = this.diarioAlimentare.alimentiPranzo;
    this.pranzo.tipoPasto = TipoPasto.PRANZO;
    this.snacks = new Pasto();
    this.snacks.alimenti = this.diarioAlimentare.alimentiSnack;
    this.snacks.tipoPasto = TipoPasto.SNACK;
    this.cena = new Pasto();
    this.cena.alimenti = this.diarioAlimentare.alimentiCena;
    this.cena.tipoPasto = TipoPasto.CENA;
    this.attivita = new AttivitaFisica();
    this.attivita.attivita = this.diarioAlimentare.eserciziFisici;

    this.dieta = new Dieta();
    this.dieta.calorieColazione = 60;
    this.dieta.caloriePranzo = 100;
    this.dieta.calorieSnack = 40;
    this.dieta.calorieCena = 120;
    this.dieta.proteineGiornaliere = 200;
    this.dieta.grassiGiornalieri = 300;
    this.dieta.carboidratiGiornalieri = 400;
  }

  ngOnInit() {
    this.dataService.setData(0, this.colazione);
    this.dataService.setData(1, this.pranzo);
    this.dataService.setData(2, this.snacks);
    this.dataService.setData(3, this.cena);
  }

  ionViewWillEnter() {
    this.diarioAlimentare.alimentiColazione = this.colazione.alimenti;
    this.diarioAlimentare.alimentiPranzo = this.pranzo.alimenti;
    this.diarioAlimentare.alimentiSnack = this.snacks.alimenti;
    this.diarioAlimentare.alimentiCena = this.cena.alimenti;
    this.diarioAlimentare.eserciziFisici = this.attivita.attivita;
  }

  addAcqua() {
    // a.acqua += 1;
    // this.diarioService.updateAcqua(this.date.slice(0, 10), a.acqua).subscribe();
  }
  removeAcqua() {
   // a.acqua -= 1;
    // this.diarioService.updateAcqua(this.date.slice(0, 10), a.acqua).subscribe();
  }

  async changeDay() {
    this.diarioService.update(this.diarioAlimentare).subscribe();
    this.getDiario();
  }
  getDiario() {
    this.diarioService.getDiario(this.date.slice(0, 10)).subscribe((response: DiarioAlimentare) => {
      this.diarioAlimentare.idDiarioAlimentare = response.idDiarioAlimentare;
      this.diarioAlimentare.data = new Date(response.data);
      this.diarioAlimentare.acqua = response.acqua;
      // TODO doesn't work
      this.diarioAlimentare.addAllAlimentiColazione(response.alimentiColazione);
      this.diarioAlimentare.addAllAlimentiPranzo(response.alimentiPranzo);
      this.diarioAlimentare.addAllAlimentiSnack(response.alimentiSnack);
      this.diarioAlimentare.addAllAlimentiCena(response.alimentiCena);
      this.diarioAlimentare.addAllEserciziFisici(response.eserciziFisici);
    });
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

}

