import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Pasto, TipoPasto} from '../../model/pasto.model';
import {AlimentoService} from '../../services/alimento.service';
import {Alimento} from '../../model/alimento.model';
import {AlertController} from '@ionic/angular';
import {branch} from '@angular-devkit/schematics/src/tree/static';


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
  private hideMe = [false, false];
  private dose1 = 0;
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

  onClick(a: number): void {
    switch (a) {
        case 0: {
            this.selezionaDose(this.alimentoService.getCarne());
            break;
        }
        case 1: {
            this.selezionaDose(this.alimentoService.getPesce());
            break;
        }
    }
  }

  async selezionaDose(a: Alimento) {
      const alert = await this.alertController.create({
          header: a.nome,
          message: 'calorie: ' + a.calorie.toString() + ' kcal <br/>proteine: ' + a.proteine + ' g <br/>grassi: ' + a.grassi + ' g <br/>carboidrati: ' +  a.carboidrati + ' g',
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
                  text: 'CANCEL',
                  role: 'cancel',
              },
              {
                  text: 'OK',
                  handler: (data) => {
                      if (data.dose) {
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
            }, 'CANCEL']
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
      if (this.hideMe[a]) {
          this.hideMe[a] = false;
      } else {
          this.hideMe[a] = true;
      }
    }
}
