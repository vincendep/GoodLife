import { Injectable } from '@angular/core';
import {Alimento} from '../model/alimento.model';

@Injectable({
  providedIn: 'root'
})
export class PastoService {

  tipoPasto: string;
  pasto: Array<{alimento: Alimento, quantita: number}>;

  constructor() {
    this.pasto = [];
  }

  getTipoPasto(): string {
    return this.tipoPasto;
  }

  setTipoPasto(tp: string) {
    this.tipoPasto = tp;
  }

  getPasto(): Array<{alimento: Alimento; quantita: number}> {
    return this.pasto;
  }

  setPasto(pasto: Array<{alimento: Alimento, quantita: number}>) {
    this.pasto = pasto;
  }
}
