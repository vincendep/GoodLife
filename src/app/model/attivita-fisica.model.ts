import {EsercizioFisico} from './esercizio-fisico.model';

// TODO refactor
export class AttivitaFisica {
    private _attivita: Array<{esercizio: EsercizioFisico, durata: number}>;

    constructor() {
        this._attivita = [];
    }

    get attivita() {
        return this._attivita;
    }

    set attivita(a: Array<{esercizio: EsercizioFisico, durata: number}>) {
        this._attivita = a;
    }

    public consumoTotale(): number {
        let sum = 0;
        for (const value of this._attivita) {

            sum += (value.esercizio.consumoPerMinuto * value.durata);
        }
        return sum;
    }
}
