import {Injectable} from '@angular/core';
import {Alimento} from '../model/alimento.model';
import {HttpClient} from '@angular/common/http';
import {URL} from '../constants';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  constructor(private http: HttpClient) {}

  public listAlimenti(): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(URL.ALIMENTI);
  }

  public createAlimento(alimento: Alimento) {
    return this.http.post<Alimento>(URL.ALIMENTI, alimento);
  }

  public listAlimentiCreati(): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(URL.ALIMENTI + '/creati');
  }

  public deleteAlimento(alimento: Alimento) {
    // return this.http.delete<Alimento>(URL.ALIMENTI, alimento);
}
}


