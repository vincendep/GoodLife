import {Alimento} from './alimento.model';

// TODO modify
export class Pasto {
    private _tipoPasto: TipoPasto;
    private _alimenti: Array<{alimento: Alimento, dose: number}>;

    constructor() {
        this._alimenti = [];
    }

    get alimenti() {
        return this._alimenti;
    }

    set alimenti(a: Array<{alimento: Alimento, dose: number}>) {
        this._alimenti = a;
    }

    get tipoPasto(): TipoPasto {
        return this._tipoPasto;
    }

    set tipoPasto(value: TipoPasto) {
        this._tipoPasto = value;
    }

    getTotCalorie(): number {
        let sum = 0;
        for (const value of this._alimenti) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }

    getTotProteine(): number {
        let sum = 0;
        for (const value of this._alimenti) {

            sum += (value.alimento.proteine * value.dose) / 100 ;
        }
        return sum;
    }
    getTotGrassi(): number {
        let sum = 0;
        for (const value of this._alimenti) {

            sum += (value.alimento.grassi * value.dose) / 100 ;
        }
        return sum;
    }

    getTotCarboidrati(): number {
        let sum = 0;
        for (const value of this._alimenti) {

            sum += (value.alimento.carboidrati * value.dose) / 100 ;
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
