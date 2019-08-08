import {Alimento} from './alimento.model';

// TODO modify
export class Pasto {
    tipoPasto: TipoPasto;
    alimenti: Array<{alimento: Alimento, quantita: number}>;

    constructor() {
        this.alimenti = [];
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

export enum TipoPasto {
    COLAZIONE,
    PRANZO,
    SNACK,
    CENA
}
