import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Pasto, TipoPasto} from '../../model/pasto.model';
import {AlimentoService} from '../../services/alimento.service';
import {Alimento} from '../../model/alimento.model';
import {AlertController} from '@ionic/angular';


@Component({
  selector: 'app-inserisci-cibo',
  templateUrl: './inserisci-cibo.page.html',
  styleUrls: ['./inserisci-cibo.page.scss'],
})

export class InserisciCiboPage implements OnInit {
  private meal1: Pasto;
  private temp: Pasto;
  private title: string;
  private deleteTitle: string;
  private deleteMessage: string;
  private hideMe = [false, false, false];
  constructor(private translateService: TranslateService,
              private router: Router,
              private route: ActivatedRoute,
              private alimentoService: AlimentoService,
              private alertController: AlertController) {
  }

  ngOnInit() {
    this.temp = new Pasto();
    if (this.route.snapshot.data['special']) {
          this.meal1 = this.route.snapshot.data['special'];
    }
    this.temp = this.meal1;
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

  onClick(element: Alimento): void {
            this.selezionaDose(element);
  }

  async selezionaDose(a: Alimento) {
      const alert = await this.alertController.create({
          header: a.nome,
          message: this.translateService.instant('CALORIE') +
                ': ' + a.calorie.toString() + ' kcal <br/>' + this.translateService.instant('PROTEINE') +
                ': ' + a.proteine + ' g <br/>' + this.translateService.instant('GRASSI') +
                ': ' + a.grassi + ' g <br/>' + this.translateService.instant('CARBOIDRATI') +
                ': ' +  a.carboidrati + ' g',
          cssClass: 'alertDimension',
          inputs: [
              {
                  name: 'dose',
                  type: 'number',
                  value: 0,
              }
          ],
          buttons: [
              {
                  text: this.translateService.instant('CANCEL_BUTTON'),
                  role: 'cancel',
              },
              {
                  text: 'OK',
                  handler: (data) => {
                      if (data.dose > 0) {
                          this.temp.alimenti.push({alimento: a, dose: data.dose});
                      }
                  }
              }
          ],
      });
      await alert.present();
  }

  onUpdate() {
    this.meal1.alimenti = this.temp.alimenti;
    this.router.navigateByUrl('tabs/diary');
  }
    eliminaAlimento(alimento: any) {
        this.showDeleteAlert(alimento);
    }
    async showDeleteAlert(alimento: any) {
        this.initTranslate();
        const alert = await this.alertController.create({
            header: this.deleteTitle,
            message: this.deleteMessage + ' ' + alimento.alimento.nome + '?',
            buttons: [{
                text: 'OK',
                handler: (data) => {
                    let index = this.temp.alimenti.indexOf(alimento);
                    if (index > -1) {
                        this.temp.alimenti.splice(index, 1);
                    }
                }
            }, this.translateService.instant('CANCEL_BUTTON')]
        });
        await alert.present();
    }
    initTranslate() {
        this.translateService.get('DELETE_TITLE').subscribe((data) => {
            this.deleteTitle = data;
        });
        this.translateService.get('DELETE_MESSAGE').subscribe((data) => {
            this.deleteMessage = data;
        });
    }

    hide(a: number) {
      this.hideMe[a] = !this.hideMe[a];
    }
}
