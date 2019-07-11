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
              private route1: ActivatedRoute,
              private alertController: AlertController,
              private esercizioService: EsercizioService) {
  }

  ngOnInit() {
    this.temp = new AttivitaFisica();
    alert();
    if (this.route1.snapshot.data['special']) {
      alert();
      this.attivita1 = this.route1.snapshot.data['special'];
    }
    alert(this.attivita1.consumoTotale());
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
  onClick(esercizio: EsercizioFisico) {}
  onUpdate() {}
}
