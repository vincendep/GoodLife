import {Injectable} from '@angular/core';
import {URL} from '../constants';
import {EsercizioFisico} from '../model/esercizio-fisico.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EsercizioService {

    constructor(private http: HttpClient) {
    }

    listEsercizi(): Observable<EsercizioFisico[]> {
        return this.http.get<EsercizioFisico[]>(URL.ESERCIZI);
    }
}
