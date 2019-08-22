import {Component, OnInit} from '@angular/core';
import {UtenteService} from '../../services/utente.service';
import {Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {NavController, PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {ProfiloMenuComponent} from '../../menues/profilo-menu/profilo-menu.component';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  private utente$: Observable<Utente>;
  private utente: Utente;

  constructor(private translateService: TranslateService,
              private utenteService: UtenteService,
              private navController: NavController,
              public popoverController: PopoverController) {

    this.utente = new Utente();
  }

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente.nome = utente.nome;
      this.utente.cognome = utente.cognome;
      this.utente.sesso = utente.sesso;
      this.utente.email = utente.email;
      this.utente.dataDiNascita = utente.dataDiNascita;
      this.utente.diete = utente.diete;
      this.utente.informazioniFisiche = utente.informazioniFisiche;
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
