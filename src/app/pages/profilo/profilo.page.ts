import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lingua, LinguaService} from '../../services/lingua.service';
import {UtenteService} from '../../services/utente.service';
import {Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  private lingue: Lingua[];
  private profiloFormModel: FormGroup;
  private utente$: Observable<Utente>;
  private utente: Utente;

  constructor(private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private linguaService: LinguaService,
              private utenteService: UtenteService,
              private navController: NavController) {

    //this.utente$ = this.utenteService.getUtente();
    this.utente = new Utente();
  }

  ngOnInit() {
    this.lingue = this.linguaService.getLingue();
    this.profiloFormModel = this.formBuilder.group({
      linguaPreferita: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.linguaService.getLinguaAttuale().subscribe((lingua) => {
      this.profiloFormModel.patchValue({linguaPreferita: lingua});
    });

    this.utenteService.getUtente().subscribe((utente) => {
      this.utente.nome = utente.nome;
      this.utente.cognome = utente.cognome;
      this.utente.sesso = utente.sesso;
      this.utente.email = utente.email;
      alert(utente.email);
      this.utente.dataDiNascita = utente.dataDiNascita;
      alert(utente.diete.length);
      this.utente.diete = utente.diete;
      this.utente.informazioniFisiche = utente.informazioniFisiche;
    });
  }

  onChangeLanguage(): void {
    if (this.profiloFormModel.value.linguaPreferita != '') {
      this.linguaService.updateLingua(this.profiloFormModel.value.linguaPreferita);
      this.translateService.use(this.profiloFormModel.value.linguaPreferita);
    }
  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('login');
  }
}
