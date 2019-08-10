import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Alimento} from '../../model/alimento.model';
import {AlimentoService} from '../../services/alimento.service';
import {AlertController, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {CreaAlimentoPage} from '../crea-alimento/crea-alimento.page';

@Component({
  selector: 'app-aliments',
  templateUrl: './aliments.page.html',
  styleUrls: ['./aliments.page.scss'],
})
export class AlimentsPage implements OnInit {

  private alimenti: Alimento[];
  private deleteTitle: string;
  private deleteMessage: string;

  constructor(private alimentoService: AlimentoService,
              private alertController: AlertController,
              private translateService: TranslateService,
              private modalController: ModalController) {
  }

  ngOnInit() {
    this.initTranslate();
  }
  ionViewWillEnter() {
    this.alimenti = this.alimentoService.getAll();
  }

  async showModal() {
    const modal = await this.modalController.create({
      component: CreaAlimentoPage,
    });
    modal.present();
  }

  eliminaAlimento(alimento: Alimento) {
    this.showDeleteAlert(alimento);
  }

  async showDeleteAlert(alimento: Alimento) {
    this.initTranslate();
    const alert = await this.alertController.create({
      header: this.deleteTitle,
      message: this.deleteMessage + ' ' + alimento.nome + '?',
      buttons: [{
        text: 'OK',
        handler: (data) => {
          let index = this.alimenti.indexOf(alimento);
          if (index > -1) {
            this.alimenti.splice(index, 1);
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
}