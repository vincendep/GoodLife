import {Component, OnInit} from '@angular/core';
import {UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {PopoverController, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {ProfiloMenuComponent} from '../../components/profilo-menu/profilo-menu.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-profilo',
    templateUrl: './profilo.page.html',
    styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

    private utente: Utente;
    private profiloFormModel: FormGroup;
    private showSelect = true;
    private toastMessage: string;

    constructor(private translateService: TranslateService,
                private utenteService: UtenteService,
                public popoverController: PopoverController,
                private formBuilder: FormBuilder,
                private toastController: ToastController) {
    }

    ngOnInit() {
        this.initTranslate();
        this.profiloFormModel = this.formBuilder.group({
            nome: ['', Validators.compose([
                Validators.required
            ])],
            cognome: ['', Validators.compose([
                Validators.required
            ])],
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            dataDiNascita: ['', Validators.compose([
                Validators.required
            ])],
            sesso: ['', Validators.compose([
                Validators.required
            ])],
            tipoDieta: ['', Validators.compose([
                Validators.required
            ])],
            altezza: ['', Validators.compose([
                Validators.required,
                Validators.min(100),
                Validators.max(299)
            ])],
            peso: ['', Validators.compose([
                Validators.required,
                Validators.min(30),
                Validators.max(299)
            ])]
        });
    }

    ionViewWillEnter() {
        this.resetFormFields();
    }

    submitForm() {
        this.utente.nome = this.profiloFormModel.value.nome;
        this.utente.cognome = this.profiloFormModel.value.cognome;
        this.utente.email = this.profiloFormModel.value.email;
        this.utente.dataDiNascita = this.profiloFormModel.value.dataDiNascita;
        this.utente.sesso = this.profiloFormModel.value.sesso;
        this.utente.diete[this.utente.diete.length - 1].obiettivo = this.profiloFormModel.value.tipoDieta;
        this.utente.informazioniFisiche[this.utente.informazioniFisiche.length - 1].altezza = this.profiloFormModel.value.altezza;
        this.utente.informazioniFisiche[this.utente.informazioniFisiche.length - 1].peso = this.profiloFormModel.value.peso;

        this.utenteService.updateProfilo(this.utente).subscribe(() => {
            this.showToastConfirmation();
        });
    }

    resetFormFields() {
        this.utenteService.getUtente().subscribe((utente) => {
            this.utente = utente;
            this.profiloFormModel.patchValue({
                nome: this.utente.nome,
                cognome: utente.cognome,
                email: utente.email,
                dataDiNascita: utente.dataDiNascita,
                sesso: utente.sesso.toString(),
                tipoDieta: utente.diete[utente.diete.length - 1].obiettivo.toString(),
                altezza: utente.informazioniFisiche[utente.informazioniFisiche.length - 1].altezza,
                peso: utente.informazioniFisiche[utente.informazioniFisiche.length - 1].peso
            });
            this.profiloFormModel.markAsUntouched({onlySelf: true});
        });
    }

    async showToastConfirmation() {
        const toast = await this.toastController.create({
            message: this.toastMessage,
            duration: 2000
        });
        toast.present();
    }

    async presentMenu(ev: any) {
        const popover = await this.popoverController.create({
            component: ProfiloMenuComponent,
            event: ev,
            translucent: true
        });

        return await popover.present();
    }

    private initTranslate() {
        this.translateService.get('PROFILO_AGGIORNATO').subscribe((data) => {
            this.toastMessage = data;
        });
    }
}
