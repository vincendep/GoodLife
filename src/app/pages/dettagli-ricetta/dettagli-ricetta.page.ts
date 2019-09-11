import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {PastoService} from '../../services/pasto.service';
import {Router} from '@angular/router';
import {AlertController, NavController} from '@ionic/angular';
import {Ricetta} from '../../model/ricetta.model';
import {RicettaService} from '../../services/ricetta.service';

@Component({
    selector: 'app-dettagli-ricetta',
    templateUrl: './dettagli-ricetta.page.html',
    styleUrls: ['./dettagli-ricetta.page.scss'],
})
export class DettagliRicettaPage implements OnInit, OnDestroy {
    private form: FormGroup;
    private newRicetta: Ricetta;
    private a: string;
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private translateService: TranslateService,
                private pastoService: PastoService,
                private router: Router,
                private alertController: AlertController,
                private formBuilder: FormBuilder,
                private ricettaService: RicettaService,
                private navController: NavController) {

        this.newRicetta = new Ricetta();

    }

    ngOnInit() {
        if (this.ricettaService.getRicetta() != null) {
            this.form = this.formBuilder.group({
                nome: [this.ricettaService.getRicetta().nome, Validators.required],
            });
            this.newRicetta.id = this.ricettaService.getRicetta().id;
            this.newRicetta.nome = this.ricettaService.getRicetta().nome;
            this.newRicetta.ingredienti = this.ricettaService.getRicetta().ingredienti;
        } else {
            this.form = this.formBuilder.group({
                nome: ['', Validators.required],
            });
        }
        this.a = this.translateService.instant('NUOVO-NOME');
    }

    ngOnDestroy(): void {
        this.ricettaService.setRicette(null);
    }

    addFood() {
        this.pastoService.setTipoPasto('nuovaRicetta');
        this.pastoService.setPasto(this.newRicetta.ingredienti);
        this.navController.navigateForward('inserisci-cibo');
    }

    onCancel() {
        this.navController.navigateBack('tabs/preferiti/ricette');
    }

    onUpdate() {
        this.newRicetta.nome = this.form.get('nome').value;
        this.ricettaService.createRicetta(this.newRicetta).subscribe((a) => {
            this.navController.back();
        });
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
                    let index = this.newRicetta.ingredienti.indexOf(alimento);
                    if (index > -1) {
                        this.newRicetta.ingredienti.splice(index, 1);
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
