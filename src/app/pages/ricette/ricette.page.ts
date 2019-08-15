import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PastoService} from '../../services/pasto.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Ricetta} from '../../model/ricetta.model';
import {Observable} from 'rxjs';
import {RicettaService} from '../../services/ricetta.service';

@Component({
  selector: 'ricette',
  templateUrl: './ricette.page.html',
  styleUrls: ['./ricette.page.scss'],
})
export class RicettePage implements OnInit {private deleteTitle: string;
  private deleteMessage: string;
  private ricette$: Observable<Ricetta[]>;

  constructor(private translateService: TranslateService,
              private pastoService: PastoService,
              private alertController: AlertController,
              private router: Router,
              private ricettaService: RicettaService) {
  }

  ngOnInit() {
    console.log(1);
    this.ricette$ = this.ricettaService.listRicette();
  }



  addPasto() {
    this.router.navigateByUrl('tabs/preferiti/ricette/dettagli-ricetta');
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
      this.ricette$ = this.ricettaService.listRicette();
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
