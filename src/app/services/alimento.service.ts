import { Injectable } from '@angular/core';
import {Alimento} from '../model/alimento.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {
  alimenti: Alimento[] = [];

  constructor() {
    const riso: Alimento = new Alimento();
    riso.nome = 'orata';
    riso.calorie = 100;
    riso.carboidrati = 50;
    riso.grassi = 15;
    riso.proteine = 15;

    const manzo: Alimento = new Alimento();
    manzo.nome = 'manzo';
    manzo.calorie = 105;
    manzo.proteine = 70;
    manzo.grassi = 35;
    manzo.carboidrati = 15;


    this.alimenti.push(riso, manzo);
  }

  getAll(): Alimento[] {
    return this.alimenti;
  }

  getCarne(): Alimento {
    return this.alimenti[1];
  }

  getPesce(): Alimento {
    return this.alimenti[0];
  }

  add(a: Alimento) {
    this.alimenti.push(a);
  }
}


