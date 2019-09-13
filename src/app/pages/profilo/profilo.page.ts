import {Component, OnInit} from '@angular/core';
import {UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {PopoverController} from '@ionic/angular';
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

    constructor(private translateService: TranslateService,
                private utenteService: UtenteService,
                public popoverController: PopoverController,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.profiloFormModel = this.formBuilder.group({
            nome: ['', Validators.compose([
                Validators.required
            ])],
            cognome: ['', Validators.compose([
                Validators.required
            ])],
            email: ['', Validators.compose([
                Validators.required
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
                Validators.required
            ])],
            peso: ['', Validators.compose([
                Validators.required
            ])]
        });
        this.utenteService.getUtente().subscribe((utente) => {
            this.utente = utente;
            this.profiloFormModel.disable();
            this.profiloFormModel.patchValue({
                nome: utente.nome,
                cognome: utente.cognome,
                email: utente.email,
                dataDiNascita: utente.dataDiNascita,
                sesso: utente.sesso.toString(),
                tipoDieta: utente.diete[utente.diete.length - 1].obiettivo.toString(),
                altezza: utente.informazioniFisiche[utente.informazioniFisiche.length - 1].altezza,
                peso: utente.informazioniFisiche[utente.informazioniFisiche.length - 1].peso
            });
        });
    }

    async presentMenu(ev: any) {
        const popover = await this.popoverController.create({
            component: ProfiloMenuComponent,
            event: ev,
            translucent: true
        });
        return await popover.present();
    }
}
