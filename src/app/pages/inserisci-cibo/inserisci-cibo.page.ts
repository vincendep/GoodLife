import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Pasto, TipoPasto} from '../../model/pasto.model';
import { AlimentoService1} from '../../services/alimento.service';
import {Alimento} from '../../model/alimento.model';
import {AlertController, IonSlides} from '@ionic/angular';
import {PastoService} from '../../services/pasto.service';
import {Observable} from 'rxjs';
import {DiarioService} from '../../services/diario.service';


@Component({
  selector: 'app-inserisci-cibo',
  templateUrl: './inserisci-cibo.page.html',
  styleUrls: ['./inserisci-cibo.page.scss'],
})

export class InserisciCiboPage implements OnInit {

    private carne$: Observable<Alimento[]>;
    private pesce$: Observable<Alimento[]>;
    private alcool$: Observable<Alimento[]>;
    private frutta$: Observable<Alimento[]>;
    private verdura$: Observable<Alimento[]>;
    private latticini$: Observable<Alimento[]>;
    private cereali$: Observable<Alimento[]>;
    private legumi$: Observable<Alimento[]>;
    private condimento$: Observable<Alimento[]>;
    private uova$: Observable<Alimento[]>;
    private dolce$: Observable<Alimento[]>;
    private preferiti$: Observable<Alimento[]>;

  private meal1: Pasto;
  private temp: Pasto;
  private title: string;
  private deleteTitle: string;
  private deleteMessage: string;
  private hideMe = [false, false, false, false, false, false, false, false, false, false, false, false];
  private flag = false;
  private flag2 = false;
    @ViewChild(IonSlides) slides: IonSlides;
    slideOpts = {
        initialSlide: 0,
        speed: 400
    };
  constructor(private translateService: TranslateService,
              private router: Router,
              private route: ActivatedRoute,
              private alimentoService1: AlimentoService1,
              private alertController: AlertController,
              private pastoService: PastoService,
              private diarioService: DiarioService) {

      this.carne$ = this.alimentoService1.list('CARNE');
      this.pesce$ = this.alimentoService1.list('PESCE');
      this.alcool$ = this.alimentoService1.list('ALCOOL');
      this.frutta$ = this.alimentoService1.list('FRUTTA');
      this.verdura$ = this.alimentoService1.list('VERDURA');
      this.latticini$ = this.alimentoService1.list('LATTICINI');
      this.legumi$ = this.alimentoService1.list('LEGUMI');
      this.cereali$ = this.alimentoService1.list('CEREALI');
      this.condimento$ = this.alimentoService1.list('CONDIMENTO');
      this.uova$ = this.alimentoService1.list('UOVA');
      this.dolce$ = this.alimentoService1.list('DOLCI');
      this.preferiti$ = this.alimentoService1.listPreferiti();
  }

  ngOnInit() {

    this.slides.lockSwipes(true);
    this.flag = false;
    this.temp = new Pasto();
    if (this.route.snapshot.data['special']) {
        this.meal1 = this.route.snapshot.data['special'];
    }
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
        default: {
            this.title = this.translateService.instant('CREA_PASTO');
            this.flag = true;
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
                ': ' + a.calorie + ' kcal <br/>' + this.translateService.instant('PROTEINE') +
                ': ' + a.proteine + ' g <br/>' + this.translateService.instant('GRASSI') +
                ': ' + a.grassi + ' g <br/>' + this.translateService.instant('CARBOIDRATI') +
                ': ' +  a.carboidrati + ' g',
          inputs: [
              {
                  name: 'quantita',
                  type: 'number',
                  placeholder: '0 g',
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
                      if (data.quantita > 0) {
                          this.temp.alimenti.push({alimento: a, quantita: data.quantita});
                      }
                  }
              }
          ],
      });
      await alert.present();
  }
  onClickPasto(pasto: Pasto) {
      this.temp.alimenti = this.temp.alimenti.concat(pasto.alimenti);
  }

  onUpdate() {
    if (this.flag) {
        this.router.navigateByUrl('tabs/favorite/meals/crea-pasto');
    } else {
        this.router.navigateByUrl('tabs/diary');
    }
    this.meal1.alimenti = this.meal1.alimenti.concat(this.temp.alimenti);
    this.temp.alimenti = [];
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
    eliminaPasto(pasto: { nome: string; pasto: Pasto }) {
        this.showDeleteAlertPasto(pasto);
    }

    async showDeleteAlertPasto(pasto: { nome: string; pasto: Pasto }) {
        this.initTranslate();
        const alert = await this.alertController.create({
            header: this.deleteTitle,
            message: this.deleteMessage + ' ' + pasto.nome + '?',
            buttons: [{
                text: 'OK',
                handler: (data) => {
                    let index = this.pastoService.getPasti().indexOf(pasto);
                    if (index > -1) {
                        this.pastoService.getPasti().splice(index, 1);
                    }
                }
            }
                , this.translateService.instant('CANCEL_BUTTON')]
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

    avanti() {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }

    indietro() {
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
    }


}
