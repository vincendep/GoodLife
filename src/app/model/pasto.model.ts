import {Alimento} from './alimento.model';

export class Pasto {
    ingredienti: Array<{ alimento: Alimento, quantita: number }>;

    constructor() {
        this.ingredienti = new Array<{ alimento: Alimento, quantita: number }>();
    }

    addAll(pasto: Pasto) {
        for (const alimento of pasto.ingredienti) {
            this.ingredienti.push(alimento);
        }
    }

    replaceAll(pasto: Pasto) {
        this.ingredienti = new Array<{ alimento: Alimento, quantita: number }>();
        this.addAll(pasto);
    }

    getTotaleCalorie(): number {
        let sum = 0;
        for (const value of this.ingredienti) {

            sum += (value.alimento.calorie * value.quantita) / 100;
        }
        return sum;
    }

    getTotProteine(): number {
        let sum = 0;
        for (const value of this.ingredienti) {

            sum += (value.alimento.proteine * value.quantita) / 100;
        }
        return sum;
    }

    getTotGrassi(): number {
        let sum = 0;
        for (const value of this.ingredienti) {

            sum += (value.alimento.grassi * value.quantita) / 100;
        }
        return sum;
    }

    getTotCarboidrati(): number {
        let sum = 0;
        for (const value of this.ingredienti) {

            sum += (value.alimento.carboidrati * value.quantita) / 100;
        }
        return sum;
    }

}
