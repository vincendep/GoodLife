import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {forEach} from '@angular-devkit/schematics';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {

  private calorie: number[];
  private calorieMax: number[];
  private calorieAttivita: number;

  private calorieTot: number;
  private calorieTotMax: number;

  private proteine1: number;
  private proteineMax: number;
  private grassi1: number;
  private grassiMax: number;
  private carboidrati1: number;
  private carboidratiMax: number;

  private showString: string;

  private percentualeCalorie: number[];
  private percentualeCalorieTot: number;
  private percentualeProteine: number;
  private percentualeGrassi: number;
  private percentualeCarboidrati: number;

  constructor() { }

  ngOnInit() {
    // calorie[] è l'arrey che conserva i valori calorici degli alimenti mangiati nei vari pasti,
    // 0=colazione, 1=pranzo, 2=snacks, 3=cena
    this.calorie = [10, 4, 7, 50];
    this.calorieMax = [60, 100, 40, 120];

    this.calorieTot = this.calorie.reduce(this.sum, 0);
    this.calorieTotMax = this.calorieMax.reduce(this.sum, 0);

    this.proteine1 = 1;
    this.proteineMax = 200;
    this.grassi1 = 150;
    this.grassiMax = 300;
    this.carboidrati1 = 300;
    this.carboidratiMax = 400;

    this.percentualeCalorieTot = this.calcoloPercentuale(this.calorieTot, this.calorieTotMax);
    this.percentualeProteine = this.calcoloPercentuale(this.proteine1, this.proteineMax);
    this.percentualeGrassi = this.calcoloPercentuale(this.grassi1, this.grassiMax);
    this.percentualeCarboidrati = this.calcoloPercentuale(this.carboidrati1, this.carboidratiMax);
    this.percentualeCalorie = this.calcoloPercentualeArray(this.calorie, this.calorieMax);

    this.completamento(this.calorie[0], this.calorieMax[0]);
    document.getElementById('colazione').innerText = this.showString;
    this.completamento(this.calorie[1], this.calorieMax[1]);
    document.getElementById('pranzo').innerText = this.showString;
    this.completamento(this.calorie[2], this.calorieMax[2]);
    document.getElementById('snacks').innerText = this.showString;
    this.completamento(this.calorie[3], this.calorieMax[3]);
    document.getElementById('cena').innerText = this.showString;
    this.completamento(this.calorieTot, this.calorieTotMax);
    document.getElementById('calorie').innerText = this.showString;
    this.completamento(this.proteine1, this.proteineMax);
    document.getElementById('proteine').innerText = this.showString;
    this.completamento(this.grassi1, this.grassiMax);
    document.getElementById('grassi').innerText = this. showString;
    this.completamento(this.carboidrati1, this.carboidratiMax);
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
}

