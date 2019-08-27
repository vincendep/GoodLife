import {EsercizioFisico} from './esercizio-fisico.model';

// TODO delete
export class AttivitaFisica {
    esercizi: Array<{esercizio: EsercizioFisico, durata: number}>;

    constructor() {
        this.esercizi = new Array<{esercizio: EsercizioFisico, durata: number}>();
    }

    addAll(attivita: AttivitaFisica) {
        for (const esercizio of attivita.esercizi) {
            this.esercizi.push(esercizio);
        }
    }

    replaceAll(attivita: AttivitaFisica) {
        this.esercizi = new Array<{esercizio: EsercizioFisico, durata: number}>();
        this.addAll(attivita);
    }

    public consumoTotale(): number {
        let sum = 0;
        for (const value of this.esercizi) {

            sum += (value.esercizio.consumoPerMinuto * value.durata);
        }
        return sum;
    }
}
