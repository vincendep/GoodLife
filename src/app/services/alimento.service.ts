import {Injectable} from '@angular/core';
import {Alimento, Categorie} from '../model/alimento.model';
import {HttpClient} from '@angular/common/http';
import {URL} from '../constants';
import {Observable} from 'rxjs';
import {UtenteService} from './utente.service';
import {Utente} from '../model/utente.model';


@Injectable({
  providedIn: 'root'
})
export class AlimentoService1 {

  private utente: Utente;

  constructor(private http: HttpClient, private utenteService: UtenteService) {
    this.utenteService.getUtente().subscribe((utente) => {this.utente = utente;
    });
  }

  list(categoria: string): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(URL.ALIMENTI + '?categoria=' + categoria);
  }

  listPreferiti(): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(URL.ALIMENTI + '/' + this.utente.id);
  }
}

export class AlimentoService {
  alimenti: Alimento[] = [];

  constructor() {
    const orata: Alimento = new Alimento();
    orata.nome = 'orata';
    orata.calorie = 100;
    orata.carboidrati = 50;
    orata.grassi = 15;
    orata.proteine = 15;
    orata.categoria = Categorie.PESCE;

    const manzo: Alimento = new Alimento();
    manzo.nome = 'manzo';
    manzo.calorie = 105;
    manzo.proteine = 70;
    manzo.grassi = 35;
    manzo.carboidrati = 15;
    manzo.categoria = Categorie.CARNE;


    this.alimenti.push(orata, manzo);
  }

  getAll(): Alimento[] {
    return this.alimenti;
  }

  getCarne(): Alimento[] {
    const a = [];
    for (const value of this.alimenti) {
      if (value.categoria === Categorie.CARNE) {
        a.push(value);
      }
    }
    return a;
  }

  getPesce(): Alimento[] {
    const a = [];
    for (const value of this.alimenti) {
      if (value.categoria === Categorie.PESCE) {
        a.push(value);
      }
    }
    return a;
  }

  add(a: Alimento) {
    this.alimenti.push(a);
  }
}


