import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-inserisci-cibo',
  templateUrl: './inserisci-cibo.page.html',
  styleUrls: ['./inserisci-cibo.page.scss'],
})

export class InserisciCiboPage implements OnInit {
  private meal1: string;
  private title: string;
  private flag: number;
  constructor(private translateService: TranslateService,
              private route: ActivatedRoute,
              private router: Router) {
    /*
    if (this.router.getCurrentNavigation().extras.state) {
      this.diario1 = this.router.getCurrentNavigation().extras.state.diario;
      this.meal1 = this.router.getCurrentNavigation().extras.state.meal;
    }*/
  }

  ngOnInit() {
   /*  switch (this.meal1) {
       case 'colazione': {
        this.title = this.translateService.instant('COLAZIONE');
        this.flag = 0;
        break;
       }
       case 'pranzo': {
         this.title = this.translateService.instant('PRANZO');
         this.flag = 1;
         break;
       }
       case 'snacks': {
         this.title = this.translateService.instant('SNACKS');
         this.flag = 2;
         break;
       }
       case 'cena': {
         this.title = this.translateService.instant('CENA');
         this.flag = 3;
         break;
       }
     }
*/
  }

}
