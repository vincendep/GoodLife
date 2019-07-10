import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavigationExtras, Router} from '@angular/router';
import {Pasto, TipoPasto} from '../../model/pasto.model';
import {AlimentoService} from '../../services/alimento.service';



@Component({
  selector: 'app-inserisci-cibo',
  templateUrl: './inserisci-cibo.page.html',
  styleUrls: ['./inserisci-cibo.page.scss'],
})

export class InserisciCiboPage implements OnInit {
  private meal1: Pasto;
  private temp: Pasto;
  private title: string;
  constructor(private translateService: TranslateService,
              private router: Router,
              private alimentntoService: AlimentoService) {
    alert();
    if (this.router.getCurrentNavigation().extras.state) {
      this.meal1 = this.router.getCurrentNavigation().extras.state.meal;
    }
    this.temp = new Pasto();
  }

  ngOnInit() {
    switch (this.meal1.tipoPasto) {
       case 0: {
        this.title = this.translateService.instant('COLAZIONE');
        break;
       }
       case 1: {
         this.title = this.translateService.instant('PRANZO');
         break;
       }
       case 2: {
         this.title = this.translateService.instant('SNACKS');
         break;
       }
       case 3: {
         this.title = this.translateService.instant('CENA');
         break;
       }
    }
  }

  onClick(): void {
    this.temp.alimenti.push({alimento: this.alimentntoService.getAll()[1],  dose: Math.floor(Math.random() * 101)});
}
  onUpdate() {
    this.meal1.alimenti = this.meal1.alimenti.concat(this.temp.alimenti);
    this.router.navigateByUrl('tabs/diary');
  }
}
