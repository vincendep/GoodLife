import { Injectable } from '@angular/core';
import {EsercizioFisico} from '../model/esercizio-fisico.model';

@Injectable({
  providedIn: 'root'
})
export class AttivitaFisicaService {

  private attivitaFisica: Array<{esercizio: EsercizioFisico, durata: number}>

  constructor() {
    this.attivitaFisica = new Array<{esercizio: EsercizioFisico, durata: number}>();
  }

  public getAttivitaFisica() {
    return this.attivitaFisica;
  }

  public setAttivitaFisica(attivitaFisica: Array<{esercizio: EsercizioFisico, durata: number}>) {
    this.attivitaFisica = attivitaFisica;
  }
}
