import {Alimento} from './alimento.model';
import {EsercizioFisico} from './esercizio-fisico.model';
import {DateUtility} from '../utility/date-utility';

export class DiarioAlimentare {

    private _idDiarioAlimentare: number;
    private _data: string;
    private _acqua: number;
    private _alimentiColazione: Array<{alimento: Alimento, dose: number}>;
    private _alimentiPranzo: Array<{alimento: Alimento, dose: number}>;
    private _alimentiSnack: Array<{alimento: Alimento, dose: number}>;
    private _alimentiCena: Array<{alimento: Alimento, dose: number}>;
    private _eserciziFisici: Array<{esercizio: EsercizioFisico, durata: number}>;


    constructor() {
        this.idDiarioAlimentare = 0;
        this.data = DateUtility.fromDatetoIsoDateString(new Date());
        this.acqua = 0;
        this._alimentiColazione = [];
        this._alimentiPranzo = [];
        this._alimentiCena = [];
        this._alimentiSnack = [];
        this._eserciziFisici = [];
    }

    get idDiarioAlimentare(): number {
        return this._idDiarioAlimentare;
    }

    set idDiarioAlimentare(value: number) {
        this._idDiarioAlimentare = value;
    }

    get data(): string {
        return this._data;
    }

    set data(value: string) {
        this._data = value;
    }

    get acqua(): number {
        return this._acqua;
    }

    public incrementAcqua() {
        this.acqua++;
    }

    public decrementAcqua() {
        if (this.acqua > 0) {
            this.acqua--;
        }
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

    public getCalorieColazione(): number {
        let sum = 0;
        for (const value of this._alimentiColazione) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }

    public getCaloriePranzo(): number {
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

    public getTotCalorie(): number {
        return this.getCalorieColazione() + this.getCaloriePranzo() + this.getCalorieSnack() + this.getCalorieCena();
    }

     public getTotProteine(): number {
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

     public getTotGrassi(): number {
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

     public getTotCarboidrati(): number {
        let sum = 0;
        for (const value of this._alimentiColazione) {

            sum += (value.alimento.carboidrati * value.dose) / 100 ;
        }
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

     public getConsumoTotale(): number {
        let sum = 0;
        for (const value of this._eserciziFisici) {

            sum += (value.esercizio.consumoPerMinuto * value.durata);
        }
        return sum;
    }
}
