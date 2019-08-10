import { Component, OnInit } from '@angular/core';
import {AttivitaFisica} from '../../model/attivita-fisica.model';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {EsercizioService} from '../../services/esercizio.service';
import {EsercizioFisico} from '../../model/esercizio-fisico.model';

@Component({
  selector: 'app-inserisci-attivita',
  templateUrl: './inserisci-attivita.page.html',
  styleUrls: ['./inserisci-attivita.page.scss'],
})
export class InserisciAttivitaPage implements OnInit {

  private attivita1: AttivitaFisica;
  private temp: AttivitaFisica;
  private deleteTitle: string;
  private deleteMessage: string;
  constructor(private translateService: TranslateService,
              private router: Router,
              private route: ActivatedRoute,
              private alertController: AlertController,
              private esercizioService: EsercizioService) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.attivita1 = this.router.getCurrentNavigation().extras.state.user;
    }
  }

  ngOnInit() {
    this.temp = new AttivitaFisica();
    this.temp = this.attivita1;
  }

  eliminaEsercizio(esercizio: any) {
    this.showDeleteAlert(esercizio);
  }
  async showDeleteAlert(esercizio: any) {
    this.initTranslate();
    const alert = await this.alertController.create({
      header: this.deleteTitle,
      message: this.deleteMessage + ' ' + esercizio.esercizio.nome + '?',
      buttons: [{
        text: 'OK',
        handler: (data) => {
          let index = this.temp.attivita.indexOf(esercizio);
          if (index > -1) {
            this.temp.attivita.splice(index, 1);
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
  onClick(a: EsercizioFisico): void {
    this.selezionaDurata(a);
  }

  async selezionaDurata(a: EsercizioFisico) {
    const alert = await this.alertController.create({
      header: a.nome,
      message: this.translateService.instant('CALMIN') + ': ' + a.consumoPerMinuto + ' kcal',
      inputs: [
        {
          name: 'durata',
          type: 'number',
          placeholder: '0 min',
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
            if (data.durata > 0) {
              this.temp.attivita.push({esercizio: a, durata: data.durata});
            }
          }
        }
      ],
    });
    await alert.present();
  }


  onUpdate() {
    this.attivita1.attivita = this.temp.attivita;
    this.router.navigateByUrl('tabs/diario');
  }
}
