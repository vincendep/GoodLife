import {Alimento} from './alimento.model';

export interface Ingrediente {
    id: number;
    alimento: Alimento;
    quantita: number;
}

export class Ricetta {
    id: number;
    nome: string;
    ingredienti: Array<Ingrediente>;

    constructor() {
        this.ingredienti = new Array<Ingrediente>();
    }

    getTotCalorie(): number {
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
