import { Component, OnInit } from '@angular/core';
import {DiarioAlimentare} from '../../model/diario.model';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DiarioService} from '../../services/diario.service';
import {Alimento} from '../../model/alimento.model';
import {PastoService} from '../../services/pasto.service';

@Component({
  selector: 'app-dettagli-pasto',
  templateUrl: './dettagli-pasto.page.html',
  styleUrls: ['./dettagli-pasto.page.scss'],
})
export class DettagliPastoPage implements OnInit {

  diarioAlimentare: DiarioAlimentare;
  tipoPasto: string;
  pasto: Array<{alimento: Alimento, quantita: number}>;

  constructor(private translateService: TranslateService,
              private navController: NavController,
              private router: Router,
              private diarioService: DiarioService,
              private pastoService: PastoService) {

    this.diarioAlimentare = new DiarioAlimentare();
    this.pasto = new Array<{alimento: Alimento, quantita: number}>();
  }

  ngOnInit() {
    this.diarioAlimentare = this.diarioService.getDiario();
    this.pasto = this.pastoService.getPasto();
  }

  onAdd() {
    this.navController.navigateForward('inserisci-cibo');
  }
}
