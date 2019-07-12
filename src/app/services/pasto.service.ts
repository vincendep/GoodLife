import { Injectable } from '@angular/core';
import {Pasto} from '../model/pasto.model';
import {Alimento} from '../model/alimento.model';


@Injectable({
  providedIn: 'root'
})
export class PastoService {

  private _favPasto: Array<{nome: string, pasto: Pasto}>;

  constructor() {
    this._favPasto = [];
  }


  getPasti(): Array<{ nome: string; pasto: Pasto }> {
    return this._favPasto;
  }

  addPasto(a: string, b: Pasto) {
    this._favPasto.push({ nome: a, pasto: b });
  }
}
