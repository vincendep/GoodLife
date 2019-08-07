
export class Dieta {
    private _obiettivo: Obiettivo;
    private _calorieColazione: number;
    private _caloriePranzo: number;
    private _calorieSnack: number;
    private _calorieCena: number;
    private _carboidratiGiornalieri: number;
    private _proteineGiornaliere: number;
    private _grassiGiornalieri: number;
    private _dataInizioDieta: Date;
    private _dataFineDieta: Date;

    get obiettivo(): Obiettivo {
        return this._obiettivo;
    }

    set obiettivo(value: Obiettivo) {
        this._obiettivo = value;
    }

    public calorieGiornaliere(): number {
        return this.calorieColazione + this.caloriePranzo + this.calorieSnack + this.calorieCena;
    }

    get calorieColazione(): number {
        return this._calorieColazione;
    }

    set calorieColazione(value: number) {
        this._calorieColazione = value;
    }

    get caloriePranzo(): number {
        return this._caloriePranzo;
    }

    set caloriePranzo(value: number) {
        this._caloriePranzo = value;
    }

    get calorieSnack(): number {
        return this._calorieSnack;
    }

    set calorieSnack(value: number) {
        this._calorieSnack = value;
    }

    get calorieCena(): number {
        return this._calorieCena;
    }

    set calorieCena(value: number) {
        this._calorieCena = value;
    }

    get carboidratiGiornalieri(): number {
        return this._carboidratiGiornalieri;
    }

    set carboidratiGiornalieri(value: number) {
        this._carboidratiGiornalieri = value;
    }

    get proteineGiornaliere(): number {
        return this._proteineGiornaliere;
    }

    set proteineGiornaliere(value: number) {
        this._proteineGiornaliere = value;
    }

    get grassiGiornalieri(): number {
        return this._grassiGiornalieri;
    }

    set grassiGiornalieri(value: number) {
        this._grassiGiornalieri = value;
    }

    get dataInizioDieta(): Date {
        return this._dataInizioDieta;
    }

    set dataInizioDieta(value: Date) {
        this._dataInizioDieta = value;
    }

    get dataFineDieta(): Date {
        return this._dataFineDieta;
    }

    set dataFineDieta(value: Date) {
        this._dataFineDieta = value;
    }
}

export enum Obiettivo {
    DIMAGRIRE,
    MANGIARE_SANO,
    MASSA_MUSCOLARE
}
