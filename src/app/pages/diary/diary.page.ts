import {Component, OnInit} from '@angular/core';
import {Dieta} from '../../model/dieta.model';
import {AlertController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Pasto, TipoPasto} from '../../model/pasto.model';
import {AlimentoService} from '../../services/alimento.service';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {

  private date: string;
  private dieta: Dieta;

  private colazione: Pasto;
  private pranzo: Pasto;
  private snacks: Pasto;
  private cena: Pasto;

  private calorieAttivita: number;

  private calorieTot: number;
  private proteineTot: number;
  private grassiTot: number;
  private carboidratiTot: number;

  private calorieTotMax: number;

  private showString: string;

  private percentualeCalorie: number[] = [0, 0, 0, 0];
  private percentualeCalorieTot: number;
  private percentualeProteine: number;
  private percentualeGrassi: number;
  private percentualeCarboidrati: number;

  private nAcqua: number;

  constructor(private translateService: TranslateService,
              private navController: NavController,
              private alertController: AlertController,
              private router: Router,
              private route: ActivatedRoute,
              private alimentntoService: AlimentoService) {

    this.dieta = new Dieta();
    this.colazione = new Pasto();
    this.colazione.tipoPasto = TipoPasto.COLAZIONE;
    this.pranzo = new Pasto();
    this.pranzo.tipoPasto = TipoPasto.PRANZO;
    this.snacks = new Pasto();
    this.snacks.tipoPasto = TipoPasto.SNACK;
    this.cena = new Pasto();
    this.cena.tipoPasto = TipoPasto.CENA;
  }

  ngOnInit() {
    // calorie[] è l'arrey che conserva i valori calorici degli alimenti mangiati nei vari pasti,
    // 0=colazione, 1=pranzo, 2=snacks, 3=cena
    this.nAcqua = 0;

    this.colazione.alimenti.push({ alimento: this.alimentntoService.getAll()[0], dose: Math.floor(Math.random() * 101)});
    this.colazione.alimenti.push({ alimento: this.alimentntoService.getAll()[1], dose: Math.floor(Math.random() * 101)});

    this.pranzo.alimenti.push({ alimento: this.alimentntoService.getAll()[0], dose: Math.floor(Math.random() * 101)});
    this.snacks.alimenti.push({ alimento: this.alimentntoService.getAll()[1], dose: Math.floor(Math.random() * 101)});
    this.cena.alimenti.push({ alimento: this.alimentntoService.getAll()[0], dose: Math.floor(Math.random() * 101)});

    this.dieta.calorieGiornaliere = [60, 100, 40, 120];

    this.date = new Date().toDateString();


    this.calorieAttivita = 50;
    document.getElementById('attivita').innerText = String(this.calorieAttivita);

    this.calorieTotMax = this.dieta.calorieGiornaliere.reduce(this.sum, 0);
    this.dieta.proteineGiornaliere = 200;
    this.dieta.grassiGiornalieri = 300;
    this.dieta.carboidratiGiornalieri = 400;

  }

  ionViewWillEnter() {
    this.calorieTot = this.pranzo.getTotCalorie() + this.colazione.getTotCalorie() + this.snacks.getTotCalorie() + this.cena.getTotCalorie();
    this.proteineTot = this.pranzo.getTotProteine() + this.colazione.getTotProteine() + this.snacks.getTotProteine() + this.cena.getTotProteine();
    this.grassiTot = this.pranzo.getTotGrassi() + this.colazione.getTotGrassi() + this.snacks.getTotGrassi() + this.cena.getTotGrassi();
    this.carboidratiTot = this.pranzo.getTotCarboidrati() + this.colazione.getTotCarboidrati() + this.snacks.getTotCarboidrati() + this.cena.getTotCarboidrati();
    this.percentualeCalorieTot = this.calcoloPercentuale(this.calorieTot, this.calorieTotMax);
    this.percentualeProteine = this.calcoloPercentuale(this.proteineTot, this.dieta.proteineGiornaliere);
    this.percentualeGrassi = this.calcoloPercentuale(this.grassiTot, this.dieta.grassiGiornalieri);
    this.percentualeCarboidrati = this.calcoloPercentuale(this.carboidratiTot, this.dieta.carboidratiGiornalieri);
    this.percentualeCalorie[0] = this.calcoloPercentuale(this.colazione.getTotCalorie(), this.dieta.calorieGiornaliere[0]);
    this.percentualeCalorie[1] = this.calcoloPercentuale(this.pranzo.getTotCalorie(), this.dieta.calorieGiornaliere[1]);
    this.percentualeCalorie[2] = this.calcoloPercentuale(this.snacks.getTotCalorie(), this.dieta.calorieGiornaliere[2]);
    this.percentualeCalorie[3] = this.calcoloPercentuale(this.cena.getTotCalorie(), this.dieta.calorieGiornaliere[3]);
    this.completamento(Math.round(this.colazione.getTotCalorie()), this.dieta.calorieGiornaliere[0]);
    document.getElementById('colazione').innerText = this.showString;
    this.completamento(Math.round(this.pranzo.getTotCalorie()), this.dieta.calorieGiornaliere[1]);
    document.getElementById('pranzo').innerText = this.showString;
    this.completamento(Math.round(this.snacks.getTotCalorie()), this.dieta.calorieGiornaliere[2]);
    document.getElementById('snacks').innerText = this.showString;
    this.completamento(Math.round(this.cena.getTotCalorie()), this.dieta.calorieGiornaliere[3]);
    document.getElementById('cena').innerText = this.showString;
    this.completamento(Math.round(this.calorieTot), this.calorieTotMax);
    document.getElementById('calorie').innerText = this.showString;
    this.completamento(Math.round(this.proteineTot), this.dieta.proteineGiornaliere);
    document.getElementById('proteine').innerText = this.showString;
    this.completamento(Math.round(this.grassiTot), this.dieta.grassiGiornalieri);
    document.getElementById('grassi').innerText = this. showString;
    this.completamento(Math.round(this.carboidratiTot), this.dieta.carboidratiGiornalieri);
    document.getElementById('carboidrati').innerText = this. showString;
  }

  completamento(a: number, b: number) {
    this.showString = a + '/' + b;
  }

  calcoloPercentuale(a: number, b: number): number {
    return a / b;
  }

  sum(a: number, b: number): number {
    return a + b;
  }
  addAcqua() {
    this.nAcqua += 1;
  }
  removeAcqua() {
    this.nAcqua -= 1;
  }

  addFood(a: Pasto) {
    alert(a.tipoPasto);
    const navigationExtra: NavigationExtras = {
      state: {
        meal: a
      }
    };
    this.router.navigate(['tabs/inserisci-cibo'], navigationExtra);
  }

}

