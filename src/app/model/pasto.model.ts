import {Alimento} from './alimento.model';

export class Pasto {
    private _tipoPasto: TipoPasto;
    private _data: Date;
    private _alimenti: Array<{alimento: Alimento, dose: number}>;

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

    get data(): Date {
        return this._data;
    }

    set data(value: Date) {
        this._data = value;
    }
}

export enum TipoPasto {
    COLAZIONE,
    PRANZO,
    SNACK,
    CENA
}
