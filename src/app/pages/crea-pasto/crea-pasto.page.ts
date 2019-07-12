import { Component, OnInit } from '@angular/core';
import {Pasto} from '../../model/pasto.model';
import {PastoService} from '../../services/pasto.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {AlertController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crea-pasto',
  templateUrl: './crea-pasto.page.html',
  styleUrls: ['./crea-pasto.page.scss'],
})
export class CreaPastoPage implements OnInit {
  private form: FormGroup;
  private newPasto: Pasto;
  private a: string;
  private deleteTitle: string;
  private deleteMessage: string;
  constructor(private translateService: TranslateService,
              private pastoService: PastoService,
              private router: Router,
              private dataService: DataService,
              private alertController: AlertController,
              private formBuilder: FormBuilder) {

    this.newPasto = new Pasto();

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required], });
    this.a = this.translateService.instant('NUOVO-NOME');
    this.dataService.setData('inserisci-cibo', this.newPasto);
  }

  addFood() {
    this.router.navigateByUrl('tabs/favorite/meals/crea-pasto/inserisci-cibo');
  }

  onCancel() {
    this.router.navigateByUrl('tabs/favorite/meals');
  }
  onUpdate() {
    this.pastoService.addPasto(this.form.get('nome').value, this.newPasto);
    this.router.navigateByUrl('tabs/favorite/meals');
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
          let index = this.newPasto.alimenti.indexOf(alimento);
          if (index > -1) {
            this.newPasto.alimenti.splice(index, 1);
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

}
