
export class Dieta {
    private _obiettivo: Obiettivo;
    private _calorieGiornaliere: number;
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

    get calorieGiornaliere(): number {
        return this._calorieGiornaliere;
    }

    set calorieGiornaliere(value: number) {
        this._calorieGiornaliere = value;
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
