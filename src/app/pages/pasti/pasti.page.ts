import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PastoService} from '../../services/pasto.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Pasto} from '../../model/pasto.model';

@Component({
  selector: 'app-pasti',
  templateUrl: './pasti.page.html',
  styleUrls: ['./pasti.page.scss'],
})
export class PastiPage implements OnInit {
  private deleteTitle: string;
  private deleteMessage: string;

  constructor(private translateService: TranslateService,
              private pastoService: PastoService,
              private alertController: AlertController,
              private router: Router) {
  }

  ngOnInit() {
  }

  addPasto() {
    this.router.navigateByUrl('tabs/preferiti/pasti/dettagli-pasto');
  }

  eliminaPasto(pasto: { nome: string; pasto: Pasto }) {
    this.showDeleteAlert(pasto);
  }

  async showDeleteAlert(pasto: { nome: string; pasto: Pasto }) {
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
}

