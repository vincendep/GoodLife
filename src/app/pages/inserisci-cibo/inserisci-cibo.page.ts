import { Component, OnInit } from '@angular/core';
import {Diary} from '../../services/diario.service';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-inserisci-cibo',
  templateUrl: './inserisci-cibo.page.html',
  styleUrls: ['./inserisci-cibo.page.scss'],
})

export class InserisciCiboPage implements OnInit {
  diario: Diary;
  constructor(private translateService: TranslateService,
              private navController: NavController) {
    this.diario = new Diary();
  }

  ngOnInit() {
    alert('1');
    alert(this.diario.calorie[0]);
  }

  updateDiary() {
    this.diario.calorie[0] += 10;
    this.navController.navigateRoot('tabs');
  }
}
