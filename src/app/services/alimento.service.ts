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

    public findAlimentoById(id: number) {
        return this.http.get<Alimento>(URL.ALIMENTI);
    }

    public listAlimenti(): Observable<Alimento[]> {
        return this.http.get<Alimento[]>(URL.ALIMENTI);
    }

    public createAlimento(alimento: Alimento) {
        return this.http.post<Alimento>(URL.ALIMENTI, alimento);
    }

    public listAlimentiCreati(): Observable<Alimento[]> {
        return this.http.get<Alimento[]>(URL.ALIMENTI + '/creati');
    }

    public deleteAlimento(idAlimento: number) {
        const apiURL = `${URL.ALIMENTI}/${idAlimento}`;
        return this.http.delete<Alimento>(apiURL);
    }
}


