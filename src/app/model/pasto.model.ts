import {Alimento} from './alimento.model';

export class Pasto {
    alimenti: Array<{alimento: Alimento, quantita: number}>;

    constructor() {
        this.alimenti = new Array<{alimento: Alimento, quantita: number}>();
    }

    addAll(pasto: Pasto) {
        for (const alimento of pasto.alimenti) {
            this.alimenti.push(alimento);
        }
    }

    replaceAll(pasto: Pasto) {
        this.alimenti = new Array<{alimento: Alimento, quantita: number}>();
        this.addAll(pasto);
}

    getTotCalorie(): number {
        let sum = 0;
        for (const value of this.alimenti) {

            sum += (value.alimento.calorie * value.quantita) / 100 ;
        }
        return sum;
    }

    getTotProteine(): number {
        let sum = 0;
        for (const value of this.alimenti) {

            sum += (value.alimento.proteine * value.quantita) / 100 ;
        }
        return sum;
    }
    getTotGrassi(): number {
        let sum = 0;
        for (const value of this.alimenti) {

            sum += (value.alimento.grassi * value.quantita) / 100 ;
        }
        return sum;
    }

    getTotCarboidrati(): number {
        let sum = 0;
        for (const value of this.alimenti) {

            sum += (value.alimento.carboidrati * value.quantita) / 100 ;
        }
        return sum;
    }

}
