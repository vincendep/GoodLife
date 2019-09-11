import { Component, OnInit } from '@angular/core';
import {DiarioAlimentare} from '../../model/diario.model';
import {EsercizioFisico} from '../../model/esercizio-fisico.model';
import {DiarioService} from '../../services/diario.service';
import {AttivitaFisicaService} from '../../services/attivita-fisica.service';
import {AlertController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {AttivitaFisica} from '../../model/attivita-fisica.model';

@Component({
  selector: 'app-dettagli-attivita-fisica',
  templateUrl: './dettagli-attivita-fisica.page.html',
  styleUrls: ['./dettagli-attivita-fisica.page.scss'],
})
export class DettagliAttivitaFisicaPage implements OnInit {

  private attivitaFisica$: Observable<AttivitaFisica>;

  private diarioAlimentare: DiarioAlimentare;
  private attivitaFisica: Array<{esercizio: EsercizioFisico, durata: number}>;
  private deleteTitle: string;
  private deleteMessage: string;

  constructor(private diarioService: DiarioService,
              private attivitaFisicaService: AttivitaFisicaService,
              private navController: NavController,
              private alertController: AlertController,
              private translateService: TranslateService) {

    this.diarioAlimentare = new DiarioAlimentare();
    this.attivitaFisica = new Array<{esercizio: EsercizioFisico, durata: number}>();
  }

  ngOnInit() {
    this.diarioAlimentare = this.diarioService.getDiario();
    this.attivitaFisica = this.attivitaFisicaService.getAttivitaFisica();
  }

  public onAdd() {
    this.navController.navigateForward('inserisci-attivita');
  }


  public eliminaAttivita(attivita: any) {
    this.showDeleteAlert(attivita);
  }

  async showDeleteAlert(attivita: any) {
    this.initTranslate();
    const alert = await this.alertController.create({
      header: this.deleteTitle,
      message: this.deleteMessage + ' ' + attivita.esercizio.nome + '?',
      buttons: [{
        text: 'OK',
        handler: (data) => {
          const index = this.attivitaFisica.indexOf(attivita);
          if (index > -1) {
            this.attivitaFisica.splice(index, 1);
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
