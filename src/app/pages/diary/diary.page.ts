import {Component, OnInit} from '@angular/core';
import {Dieta} from '../../model/dieta.model';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {NavigationExtras, Router} from '@angular/router';
import {Pasto, TipoPasto} from '../../model/pasto.model';
import {DataService} from '../../services/data.service';
import {AttivitaFisica} from '../../model/attivita-fisica.model';


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

  private attivita: AttivitaFisica;

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
              private router: Router,
              private dataService: DataService) {

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

  ngOnInit() {
    this.dataService.setData(0, this.colazione);
    this.dataService.setData(1, this.pranzo);
    this.dataService.setData(2, this.snacks);
    this.dataService.setData(3, this.cena);

    // calorie[] è l'arrey che conserva i valori calorici degli alimenti mangiati nei vari pasti,
    // 0=colazione, 1=pranzo, 2=snacks, 3=cena
    this.nAcqua = 0;

   /* this.colazione.alimenti.push({ alimento: this.alimentntoService.getAll()[0], dose: Math.floor(Math.random() * 101)});
    this.colazione.alimenti.push({ alimento: this.alimentntoService.getAll()[1], dose: Math.floor(Math.random() * 101)});

    this.pranzo.alimenti.push({ alimento: this.alimentntoService.getAll()[0], dose: Math.floor(Math.random() * 101)});
    this.snacks.alimenti.push({ alimento: this.alimentntoService.getAll()[1], dose: Math.floor(Math.random() * 101)});
    this.cena.alimenti.push({ alimento: this.alimentntoService.getAll()[0], dose: Math.floor(Math.random() * 101)});
    */

    this.dieta.calorieGiornaliere = [60, 100, 40, 120];

    this.date = new Date().toDateString();

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
    document.getElementById('colazione').innerText = this.showString + ' kcal';
    this.completamento(Math.round(this.pranzo.getTotCalorie()), this.dieta.calorieGiornaliere[1]);
    document.getElementById('pranzo').innerText = this.showString + ' kcal';
    this.completamento(Math.round(this.snacks.getTotCalorie()), this.dieta.calorieGiornaliere[2]);
    document.getElementById('snacks').innerText = this.showString + ' kcal';
    this.completamento(Math.round(this.cena.getTotCalorie()), this.dieta.calorieGiornaliere[3]);
    document.getElementById('cena').innerText = this.showString + ' kcal';
    this.completamento(Math.round(this.calorieTot), this.calorieTotMax);
    document.getElementById('calorie').innerText = this.showString + ' kcal';
    this.completamento(Math.round(this.proteineTot), this.dieta.proteineGiornaliere);
    document.getElementById('proteine').innerText = this.showString  + ' g';
    this.completamento(Math.round(this.grassiTot), this.dieta.grassiGiornalieri);
    document.getElementById('grassi').innerText = this. showString + ' g';
    this.completamento(Math.round(this.carboidratiTot), this.dieta.carboidratiGiornalieri);
    document.getElementById('carboidrati').innerText = this. showString + ' g';
    this.calorieAttivita = this.attivita.consumoTotale();
    document.getElementById('attivita').innerText = String(this.calorieAttivita);
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

