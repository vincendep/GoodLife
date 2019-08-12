
export class Dieta {
    obiettivo: Obiettivo;
    calorieColazione: number;
    caloriePranzo: number;
    calorieSnack: number;
    calorieCena: number;
    carboidratiGiornalieri: number;
    proteineGiornaliere: number;
    grassiGiornalieri: number;
    dataInizioDieta: Date;
    dataFineDieta: Date;

    constructor() {
        this.dataInizioDieta = new Date();
    }

    public calorieGiornaliere(): number {
        return this.calorieColazione + this.caloriePranzo + this.calorieSnack + this.calorieCena;
    }
}

export enum Obiettivo {
    DIMAGRIRE,
    MANGIARE_SANO,
    MASSA_MUSCOLARE
}
