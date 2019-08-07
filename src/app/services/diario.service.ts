import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UtenteService} from './utente.service';
import {Utente} from '../model/utente.model';
import {URL} from '../constants';
import {Observable} from 'rxjs';
import {DiarioAlimentare} from '../model/diario.model';

@Injectable({
    providedIn: 'root'
})



export class DiarioService {

    private  utente: Utente;

    constructor(private http: HttpClient, private utenteService: UtenteService) {
        this.utenteService.getUtente().subscribe((utente) => {this.utente = utente;
        });
    }

    getDiarioByDate(data: string): Observable<DiarioAlimentare> {
        return this.http.get<DiarioAlimentare>(URL.DIARIO + '/' + this.utente.id + '?data=' + data);
    }

    updateDiario(diario: DiarioAlimentare) {
        return this.http.post(URL.DIARIO + '/' + this.utente.id, diario);
    }

}
