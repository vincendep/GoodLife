import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lingua, LinguaService} from '../../services/lingua.service';
import {UtenteService} from '../../services/utente.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private lingue: Lingua[];
  private profiloFormModel: FormGroup;
  private utente$: Observable<Utente>;

  constructor(private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private linguaService: LinguaService,
              private utenteService: UtenteService,
              private navController: NavController) {

    this.utente$ = this.utenteService.getUtente();
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
