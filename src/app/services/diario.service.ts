import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL} from '../constants';
import {Observable} from 'rxjs';
import {DiarioAlimentare} from '../model/diario.model';
import {Pasto} from '../model/pasto.model';
import {Alimento} from '../model/alimento.model';

@Injectable({
    providedIn: 'root'
})



export class DiarioService {

    diario: DiarioAlimentare;
    pastoSelezionato: Array<{alimento: Alimento, quantita: number}>;

    constructor(private http: HttpClient) {}

    public getDiario() {
        return this.diario;
    }

    public setDiario(diario: DiarioAlimentare) {
        this.diario = diario;
    }

    public getPastoSelezionato() {
        return this.pastoSelezionato;
    }

    public setPastoSelezionato(a: Array<{alimento: Alimento, quantita: number}>) {
        this.pastoSelezionato = a;
    }

    public getDiarioByDate(data: string): Observable<DiarioAlimentare> {
        return this.http.get<DiarioAlimentare>(URL.DIARIO + '?data=' + data);
    }

    public updateDiario(diario: DiarioAlimentare) {
        return this.http.post(URL.DIARIO, diario);
    }

}
