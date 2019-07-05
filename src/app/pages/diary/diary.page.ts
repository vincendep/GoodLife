import { Component, OnInit } from '@angular/core';
import {Dieta, Obiettivo} from '../../model/dieta.model';
import {AlertController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {forEach} from '@angular-devkit/schematics';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {

  private dieta: Dieta;
  private calorie: number[];
  private calorieAttivita: number;

  private calorieTot: number;
  private calorieTotMax: number;

  private proteine1: number;
  private grassi1: number;
  private carboidrati1: number;

  private showString: string;

  private percentualeCalorie: number[];
  private percentualeCalorieTot: number;
  private percentualeProteine: number;
  private percentualeGrassi: number;
  private percentualeCarboidrati: number;

  private nAcqua: number;

  constructor() { }

  ngOnInit() {
    // calorie[] è l'arrey che conserva i valori calorici degli alimenti mangiati nei vari pasti,
    // 0=colazione, 1=pranzo, 2=snacks, 3=cena
    this.nAcqua = 0;
    this.calorie = [10, 4, 7, 50];
    this.dieta.calorieGiornaliere = [60, 100, 40, 120];
    alert('1');

    this.calorieAttivita = 50;
    document.getElementById('attivita').innerText = String(this.calorieAttivita);
    this.calorieTot = this.calorie.reduce(this.sum, 0);
    this.calorieTotMax = this.dieta.calorieGiornaliere.reduce(this.sum, 0);

    this.proteine1 = 1;
    this.dieta.proteineGiornaliere = 200;
    this.grassi1 = 150;
    this.dieta.grassiGiornalieri = 300;
    this.carboidrati1 = 300;
    this.dieta.carboidratiGiornalieri = 400;

    this.percentualeCalorieTot = this.calcoloPercentuale(this.calorieTot, this.calorieTotMax);
    this.percentualeProteine = this.calcoloPercentuale(this.proteine1, this.dieta.proteineGiornaliere);
    this.percentualeGrassi = this.calcoloPercentuale(this.grassi1, this.dieta.grassiGiornalieri);
    this.percentualeCarboidrati = this.calcoloPercentuale(this.carboidrati1, this.dieta.carboidratiGiornalieri);
    this.percentualeCalorie = this.calcoloPercentualeArray(this.calorie, this.dieta.calorieGiornaliere);

    this.completamento(this.calorie[0], this.dieta.calorieGiornaliere[0]);
    document.getElementById('colazione').innerText = this.showString;
    this.completamento(this.calorie[1], this.dieta.calorieGiornaliere[1]);
    document.getElementById('pranzo').innerText = this.showString;
    this.completamento(this.calorie[2], this.dieta.calorieGiornaliere[2]);
    document.getElementById('snacks').innerText = this.showString;
    this.completamento(this.calorie[3], this.dieta.calorieGiornaliere[3]);
    document.getElementById('cena').innerText = this.showString;
    this.completamento(this.calorieTot, this.calorieTotMax);
    document.getElementById('calorie').innerText = this.showString;
    this.completamento(this.proteine1, this.dieta.proteineGiornaliere);
    document.getElementById('proteine').innerText = this.showString;
    this.completamento(this.grassi1, this.dieta.grassiGiornalieri);
    document.getElementById('grassi').innerText = this. showString;
    this.completamento(this.carboidrati1, this.dieta.carboidratiGiornalieri);
    document.getElementById('carboidrati').innerText = this. showString;
  }

  completamento(a: number, b: number) {
    this.showString = a + '/' + b;
  }

  calcoloPercentuale(a: number, b: number): number {
    return a / b;
  }

  calcoloPercentualeArray(a: number[], b: number[]) {
   const percent = [0, 0, 0, 0];
   for (const i in a) {
     if (a.hasOwnProperty(i)) {
       percent[i] = this.calcoloPercentuale(a[i], b[i]);
     }
    }
   return percent;
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
}

