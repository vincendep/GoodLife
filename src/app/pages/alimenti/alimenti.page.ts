import { Component, OnInit } from '@angular/core';
import {Alimento} from '../../model/alimento.model';
import {AlimentoService} from '../../services/alimento.service';
import {AlertController, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {DettagliAlimentoPage} from '../dettagli-alimento/dettagli-alimento.page';


@Component({
  selector: 'app-alimenti',
  templateUrl: './alimenti.page.html',
  styleUrls: ['./alimenti.page.scss'],
})
export class AlimentiPage implements OnInit {

  // TODO aggiustare nome alimento

  private alimenti: Alimento[] = new Array();
  private deleteTitle: string;
  private deleteMessage: string;

  constructor(private alimentoService: AlimentoService,
              private alertController: AlertController,
              private translateService: TranslateService,
              private modalController: ModalController) {
  }

  ngOnInit() {
    this.getAlimenti();
    this.initTranslate();
  }

  async creaAlimento() {
    const modal = await this.modalController.create({
      component: DettagliAlimentoPage,
    });
    modal.onDidDismiss().then(() => {
      this.getAlimenti();
    });
    modal.present();
  }

  eliminaAlimento(alimento: Alimento) {
    this.showDeleteAlert(alimento);
  }

  async showDeleteAlert(alimento: Alimento) {
    this.initTranslate();
    let flag = false;
    const alert = await this.alertController.create({
      header: this.deleteTitle,
      message: this.deleteMessage + ' ' + alimento.nome + '?',
      buttons: [{
        text: 'OK',
        handler: (data) => {
          this.alimentoService.deleteAlimento(alimento).subscribe();
          flag = true;
        }
      }
        , this.translateService.instant('CANCEL_BUTTON')]
    });
    alert.onDidDismiss().then(() => {
      if (flag) {
        this.getAlimenti();
      }
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

  public getAlimenti() {
    this.alimentoService.listAlimentiCreati().subscribe(next => {
      this.alimenti = [];
      for (const a of next) {
        this.alimenti.push(a);
      }
    });
  }
}
