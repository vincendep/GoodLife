import { Component, OnInit } from '@angular/core';
import {DiarioAlimentare} from '../../model/diario.model';
import {TranslateService} from '@ngx-translate/core';
import {AlertController, NavController} from '@ionic/angular';
import {DiarioService} from '../../services/diario.service';
import {PastoService} from '../../services/pasto.service';
import {Pasto} from '../../model/pasto.model';

@Component({
  selector: 'app-dettagli-pasto',
  templateUrl: './dettagli-pasto.page.html',
  styleUrls: ['./dettagli-pasto.page.scss'],
})
export class DettagliPastoPage implements OnInit {

  diarioAlimentare: DiarioAlimentare;
  pasto: Pasto;
  private deleteTitle: string;
  private deleteMessage: string;

  constructor(private translateService: TranslateService,
              private navController: NavController,
              private diarioService: DiarioService,
              private pastoService: PastoService,
              private alertController: AlertController) {

    this.diarioAlimentare = new DiarioAlimentare();
    this.pasto = new Pasto();
  }

  ngOnInit() {
    this.diarioAlimentare = this.diarioService.getDiario();
    this.pasto.alimenti = this.pastoService.getPasto();
  }

  addCibo() {
    this.navController.navigateForward('inserisci-cibo');
  }
  addRicetta() {
    this.navController.navigateForward('inserisci-ricetta');
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
          let index = this.pasto.alimenti.indexOf(alimento);
          if (index > -1) {
            this.pasto.alimenti.splice(index, 1);
          }
          this.diarioService.updateDiario(this.diarioAlimentare).subscribe();
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
}
