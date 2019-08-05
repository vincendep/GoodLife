import {Alimento} from './alimento.model';
import {EsercizioFisico} from './esercizio-fisico.model';

export class DiarioAlimentare {

    private _acqua: number;
    private _alimentiColazione: Array<{alimento: Alimento, dose: number}>;
    private _alimentiPranzo: Array<{alimento: Alimento, dose: number}>;
    private _alimentiSnack: Array<{alimento: Alimento, dose: number}>;
    private _alimentiCena: Array<{alimento: Alimento, dose: number}>;
    private _eserciziFisici: Array<{esercizio: EsercizioFisico, durata: number}>;

    constructor() {
        this._alimentiColazione = [];
        this._alimentiPranzo = [];
        this._alimentiCena = [];
        this._alimentiSnack = [];
        this._eserciziFisici = [];
    }

    get acqua(): number {
        return this._acqua;
    }

    set acqua(value: number) {
        this._acqua = value;
    }

    get alimentiColazione(): Array<{ alimento: Alimento; dose: number }> {
        return this._alimentiColazione;
    }

    set alimentiColazione(value: Array<{ alimento: Alimento; dose: number }>) {
        this._alimentiColazione = value;
    }

    get alimentiPranzo(): Array<{ alimento: Alimento; dose: number }> {
        return this._alimentiPranzo;
    }

    set alimentiPranzo(value: Array<{ alimento: Alimento; dose: number }>) {
        this._alimentiPranzo = value;
    }

    get alimentiSnack(): Array<{ alimento: Alimento; dose: number }> {
        return this._alimentiSnack;
    }

    set alimentiSnack(value: Array<{ alimento: Alimento; dose: number }>) {
        this._alimentiSnack = value;
    }

    get alimentiCena(): Array<{ alimento: Alimento; dose: number }> {
        return this._alimentiCena;
    }

    set alimentiCena(value: Array<{ alimento: Alimento; dose: number }>) {
        this._alimentiCena = value;
    }

    get eserciziFisici(): Array<{ esercizio: EsercizioFisico; durata: number }> {
        return this._eserciziFisici;
    }

    set eserciziFisici(value: Array<{ esercizio: EsercizioFisico; durata: number }>) {
        this._eserciziFisici = value;
    }

    getCalorieColazione(): number {
        let sum = 0;
        for (const value of this._alimentiColazione) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }
    getCaloriePranzo(): number {
        let sum = 0;
        for (const value of this._alimentiPranzo) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }
    getCalorieSnack(): number {
        let sum = 0;
        for (const value of this._alimentiSnack) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }
    getCalorieCena(): number {
        let sum = 0;
        for (const value of this._alimentiCena) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }

    getTotCalorie(): number {
        let sum = 0;
        for (const value of this._alimentiColazione) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        for (const value of this._alimentiPranzo) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        for (const value of this._alimentiSnack) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        for (const value of this._alimentiCena) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }
    getTotProteine(): number {
        let sum = 0;
        for (const value of this._alimentiColazione) {

            sum += (value.alimento.proteine * value.dose) / 100 ;
        }
        for (const value of this._alimentiPranzo) {

            sum += (value.alimento.proteine * value.dose) / 100 ;
        }
        for (const value of this._alimentiSnack) {

            sum += (value.alimento.proteine * value.dose) / 100 ;
        }
        for (const value of this._alimentiCena) {

            sum += (value.alimento.proteine * value.dose) / 100 ;
        }
        return sum;
    }
    getTotGrassi(): number {
        let sum = 0;
        for (const value of this._alimentiColazione) {

            sum += (value.alimento.grassi * value.dose) / 100 ;
        }
        for (const value of this._alimentiPranzo) {

            sum += (value.alimento.grassi * value.dose) / 100 ;
        }
        for (const value of this._alimentiSnack) {

            sum += (value.alimento.grassi * value.dose) / 100 ;
        }
        for (const value of this._alimentiCena) {

            sum += (value.alimento.grassi * value.dose) / 100 ;
        }
        return sum;
    }
    getTotCarboidrati(): number {
        let sum = 0;
        for (const value of this._alimentiColazione) {

            sum += (value.alimento.carboidrati * value.dose) / 100 ;
        }
        alert(sum);
        for (const value of this._alimentiPranzo) {

            sum += (value.alimento.carboidrati * value.dose) / 100 ;
        }
        for (const value of this._alimentiSnack) {

            sum += (value.alimento.carboidrati * value.dose) / 100 ;
        }
        for (const value of this._alimentiCena) {

            sum += (value.alimento.carboidrati * value.dose) / 100 ;
        }
        return sum;
    }
    public consumoTotale(): number {
        let sum = 0;
        for (const value of this._eserciziFisici) {

            sum += (value.esercizio.consumoPerMinuto * value.durata);
        }
        return sum;
    }
}
