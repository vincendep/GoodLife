import {EsercizioFisico} from './esercizio-fisico.model';

export class AttivitaFisica {

    esercizi: Array<{ esercizio: EsercizioFisico, durata: number }>;

    constructor() {
        this.esercizi = new Array<{ esercizio: EsercizioFisico, durata: number }>();
    }

    public consumoTotale(): number {
        let sum = 0;
        for (const value of this.esercizi) {

            sum += (value.esercizio.consumoPerMinuto * value.durata);
        }
        return sum;
    }
}
