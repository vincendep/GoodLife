import { Component, OnInit } from '@angular/core';
import {Lingua, LinguaService} from '../../services/lingua.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utente} from '../../model/utente.model';
import {TranslateService} from '@ngx-translate/core';
import {UtenteService} from '../../services/utente.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  private lingue: Lingua[];
  private profiloFormModel: FormGroup;
  private utente: Utente;

  constructor(private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private linguaService: LinguaService,
              private utenteService: UtenteService,
              private navController: NavController) { }

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
  }

  onSubmit(): void {
    this.translateService.use(this.profiloFormModel.value.linguaPreferita);
    this.linguaService.updateLingua(this.profiloFormModel.value.linguaPreferita);
  }

  cancel() {
    this.navController.back();
  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('login');
  }
}
