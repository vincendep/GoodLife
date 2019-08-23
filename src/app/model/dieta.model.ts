
export class Dieta {
    obiettivo: Obiettivo;
    calorieColazione: number;
    caloriePranzo: number;
    calorieSnack: number;
    calorieCena: number;
    carboidrati: number;
    proteine: number;
    grassi: number;
    inizioDieta: Date;
    fineDieta: Date;

    constructor() {
        this.inizioDieta = new Date();
        this.fineDieta = new Date();
    }

    public calorieGiornaliere(): number {
        return this.calorieColazione + this.caloriePranzo + this.calorieSnack + this.calorieCena;
    }
}

export enum Obiettivo {
    DIMAGRIRE,
    MASSA_MUSCOLARE,
    MANGIARE_SANO
}
