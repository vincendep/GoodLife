import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ricetta} from '../model/ricetta.model';
import {URL} from '../constants';

@Injectable({
    providedIn: 'root'
})

export class RicettaService {
    constructor(private http: HttpClient) {}

    public listRicette(): Observable<Ricetta[]> {
        return this.http.get<Ricetta[]>(URL.RICETTE);
    }

    public createRicetta(ricetta: Ricetta) {
        return this.http.post<Ricetta>(URL.RICETTE, ricetta);
    }

    public deleteRicetta(ricetta: Ricetta) {
        return this.http.delete<Ricetta>(URL.RICETTE + '/' + ricetta.id);
    }
}
