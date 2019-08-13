import { Component, OnInit } from '@angular/core';
import {DiarioAlimentare} from '../../model/diario.model';
import {EsercizioFisico} from '../../model/esercizio-fisico.model';
import {DiarioService} from '../../services/diario.service';
import {AttivitaFisicaService} from '../../services/attivita-fisica.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-dettagli-attivita-fisica',
  templateUrl: './dettagli-attivita-fisica.page.html',
  styleUrls: ['./dettagli-attivita-fisica.page.scss'],
})
export class DettagliAttivitaFisicaPage implements OnInit {

  private diarioAlimentare: DiarioAlimentare;
  private attivitaFisica: Array<{esercizio: EsercizioFisico, durata: number}>;

  constructor(private diarioService: DiarioService,
              private attivitaFisicaService: AttivitaFisicaService,
              private navController: NavController) {

    this.diarioAlimentare = new DiarioAlimentare();
    this.attivitaFisica = new Array<{esercizio: EsercizioFisico, durata: number}>();
  }

  ngOnInit() {
    this.diarioAlimentare = this.diarioService.getDiario();
    this.attivitaFisica = this.attivitaFisicaService.getAttivitaFisica();
  }

  public onAdd() {
    this.navController.navigateForward('inserisci-attivita');
  }
}
