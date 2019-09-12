import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {Ricetta} from '../../model/ricetta.model';
import {RicettaService} from '../../services/ricetta.service';
import {InserisciCiboPage} from '../inserisci-cibo/inserisci-cibo.page';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'app-dettagli-ricetta',
    templateUrl: './dettagli-ricetta.page.html',
    styleUrls: ['./dettagli-ricetta.page.scss'],
})
export class DettagliRicettaPage implements OnInit, OnDestroy {
    private form: FormGroup;
    private ricetta: Ricetta;
    private nome: string;
    private deleteTitle: string;
    private deleteMessage: string;

    constructor(private translateService: TranslateService,
                private route: ActivatedRoute,
                private alertController: AlertController,
                private formBuilder: FormBuilder,
                private ricettaService: RicettaService,
                private navController: NavController,
                private modalController: ModalController) {

        this.ricetta = new Ricetta();

    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            if (params.get('id') === 'nuovo') {
                this.form = this.formBuilder.group({
                    nome: ['', Validators.required],
                });
            } else {
                this.ricettaService.findById(parseInt(params.get('id'), 0)).subscribe((ricetta: Ricetta) => {
                    this.ricetta.id = ricetta.id;
                    this.ricetta.nome = ricetta.nome;
                    this.ricetta.ingredienti = ricetta.ingredienti;
                });
                this.form = this.formBuilder.group({
                    nome: [this.ricetta.nome, Validators.required],
                });
            }
        });
        this.nome = this.translateService.instant('NUOVO-NOME');
    }

    ngOnDestroy(): void {
        this.ricettaService.setRicette(null);
    }

    async addFood() {
        const modal = await this.modalController.create({
            component: InserisciCiboPage,
            componentProps: {appParam: this.ricetta.ingredienti}
        });
        await modal.present();
    }

    onCancel() {
        this.navController.navigateBack('tabs/preferiti/ricette');
    }

    onUpdate() {
        this.ricetta.nome = this.form.get('nome').value;
        this.ricettaService.createRicetta(this.ricetta).subscribe((a) => {
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
                    let index = this.ricetta.ingredienti.indexOf(alimento);
                    if (index > -1) {
                        this.ricetta.ingredienti.splice(index, 1);
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
