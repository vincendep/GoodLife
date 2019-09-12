import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ricetta} from '../model/ricetta.model';
import {URL} from '../constants';

@Injectable({
    providedIn: 'root'
})

export class RicettaService {
    private ricetta: Ricetta;

    constructor(private http: HttpClient) {
        this.ricetta = null;
    }

    public getRicetta(): Ricetta {
        return this.ricetta;
    }

    public setRicette(ricetta: Ricetta) {
        this.ricetta = ricetta;
    }

    public listRicette(): Observable<Ricetta[]> {
        return this.http.get<Ricetta[]>(URL.RICETTE);
    }

    public findById(ricettaId: number): Observable<Ricetta> {
        const apiURL = `${URL.RICETTE}/${ricettaId}`;
        return this.http.get<Ricetta>(apiURL);
    }

    public createRicetta(ricetta: Ricetta) {
        return this.http.post<Ricetta>(URL.RICETTE, ricetta);
    }

    public deleteRicetta(ricetta: Ricetta) {
        return this.http.delete<Ricetta>(URL.RICETTE + '/' + ricetta.id);
    }
}
