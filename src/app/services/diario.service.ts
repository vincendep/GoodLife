import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL} from '../constants';
import {Observable} from 'rxjs';
import {DiarioAlimentare} from '../model/diario.model';

@Injectable({
    providedIn: 'root'
})


export class DiarioService {

    constructor(private http: HttpClient) {
    }

    public getDiarioByDate(data: string): Observable<DiarioAlimentare> {
        return this.http.get<DiarioAlimentare>(URL.DIARIO + '?data=' + data);
    }

    public updateAcqua(idDiario: number, acqua: number) {
        const apiURL = `${URL.DIARIO}/${idDiario}/acqua`;
        return this.http.post<DiarioAlimentare>(apiURL, acqua);
    }

    public updateDiario(diario: DiarioAlimentare) {
        return this.http.post(URL.DIARIO, diario);
    }

}
