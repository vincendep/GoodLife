import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PastoService} from '../../services/pasto.service';
import {AlertController, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Ricetta} from '../../model/ricetta.model';
import {RicettaService} from '../../services/ricetta.service';

@Component({
  selector: 'ricette',
  templateUrl: './ricette.page.html',
  styleUrls: ['./ricette.page.scss'],
})
export class RicettePage implements OnInit {private deleteTitle: string;
  private deleteMessage: string;
  private ricette: Ricetta[] = []

  // TODO aggiungere calorie totali

  constructor(private translateService: TranslateService,
              private pastoService: PastoService,
              private alertController: AlertController,
              private router: Router,
              private navController: NavController,
              private ricettaService: RicettaService) {
  }

  ngOnInit() {
    this.getRicette();
  }

  addPasto() {
    this.navController.navigateRoot('dettagli-ricetta');
  }

  modificaRicetta(ricetta: Ricetta) {
    this.ricettaService.setRicette(ricetta);
    this.navController.navigateRoot('dettagli-ricetta');
  }

  eliminaPasto(ricetta: Ricetta) {
    this.showDeleteAlert(ricetta);
  }

  async showDeleteAlert(ricetta: Ricetta) {
    this.initTranslate();
    const alert = await this.alertController.create({
      header: this.deleteTitle,
       message: this.deleteMessage + ' ' + ricetta.nome + '?',
       buttons: [{
         text: 'OK',
         handler: (data) => {
             this.ricettaService.deleteRicetta(ricetta).subscribe();
        }
       }
         , this.translateService.instant('CANCEL_BUTTON')]
     });
    alert.onDidDismiss().then(() => {
      this.getRicette();
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

  getRicette() {
    this.ricette = [];
    const o = this.ricettaService.listRicette().subscribe((next: Ricetta[]) => {
      for (const r of next) {
        const ricetta: Ricetta = new Ricetta();
        ricetta.id = r.id;
        ricetta.nome = r.nome;
        ricetta.ingredienti = r.ingredienti;
        this.ricette.push(ricetta);
      }
      o.unsubscribe();
    });
  }
}
