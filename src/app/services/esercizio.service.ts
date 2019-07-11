import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {EsercizioFisico} from '../model/esercizio-fisico.model';

@Injectable({
    providedIn: 'root'
})
export class EsercizioService {
    esercizio: EsercizioFisico[] = [];

    constructor() {
        const piegamenti: EsercizioFisico = new EsercizioFisico();
        piegamenti.nome = 'piegamenti';
        piegamenti.consumoPerMinuto = 9;

        const corsa: EsercizioFisico = new EsercizioFisico();
        corsa.nome = 'corsa';
        corsa.consumoPerMinuto = 13;

        this.esercizio.push(piegamenti, corsa);
    }

    getAll(): EsercizioFisico [] {
        return this.esercizio;
    }
    add(e: EsercizioFisico) {
        this.esercizio.push(e);
    }
}
