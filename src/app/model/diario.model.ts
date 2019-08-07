import {Alimento} from './alimento.model';
import {EsercizioFisico} from './esercizio-fisico.model';
import {DateUtility} from '../utility/date-utility';

export class DiarioAlimentare {

    idDiarioAlimentare: number;
    data: string;
    acqua: number;
    alimentiColazione: Array<{alimento: Alimento, dose: number}>;
    alimentiPranzo: Array<{alimento: Alimento, dose: number}>;
    alimentiSnack: Array<{alimento: Alimento, dose: number}>;
    alimentiCena: Array<{alimento: Alimento, dose: number}>;
    eserciziFisici: Array<{esercizio: EsercizioFisico, durata: number}>;


    constructor() {
        this.idDiarioAlimentare = 0;
        this.data = DateUtility.fromDatetoIsoDateString(new Date());
        this.acqua = 0;
        this.alimentiColazione = [];
        this.alimentiPranzo = [];
        this.alimentiCena = [];
        this.alimentiSnack = [];
        this.eserciziFisici = [];
    }

    public incrementAcqua() {
        this.acqua++;
    }

    public decrementAcqua() {
        if (this.acqua > 0) {
            this.acqua--;
        }
    }

    public getCalorieColazione(): number {
        let sum = 0;
        for (const value of this.alimentiColazione) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }

    public getCaloriePranzo(): number {
        let sum = 0;
        for (const value of this.alimentiPranzo) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }

    getCalorieSnack(): number {
        let sum = 0;
        for (const value of this.alimentiSnack) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }

    getCalorieCena(): number {
        let sum = 0;
        for (const value of this.alimentiCena) {

            sum += (value.alimento.calorie * value.dose) / 100 ;
        }
        return sum;
    }

    public getTotCalorie(): number {
        return this.getCalorieColazione() + this.getCaloriePranzo() + this.getCalorieSnack() + this.getCalorieCena();
    }

     public getTotProteine(): number {
        let sum = 0;
        for (const value of this.alimentiColazione) {

            sum += (value.alimento.proteine * value.dose) / 100 ;
        }
        for (const value of this.alimentiPranzo) {

            sum += (value.alimento.proteine * value.dose) / 100 ;
        }
        for (const value of this.alimentiSnack) {

            sum += (value.alimento.proteine * value.dose) / 100 ;
        }
        for (const value of this.alimentiCena) {

            sum += (value.alimento.proteine * value.dose) / 100 ;
        }
        return sum;
    }

     public getTotGrassi(): number {
        let sum = 0;
        for (const value of this.alimentiColazione) {

            sum += (value.alimento.grassi * value.dose) / 100 ;
        }
        for (const value of this.alimentiPranzo) {

            sum += (value.alimento.grassi * value.dose) / 100 ;
        }
        for (const value of this.alimentiSnack) {

            sum += (value.alimento.grassi * value.dose) / 100 ;
        }
        for (const value of this.alimentiCena) {

            sum += (value.alimento.grassi * value.dose) / 100 ;
        }
        return sum;
    }

     public getTotCarboidrati(): number {
        let sum = 0;
        for (const value of this.alimentiColazione) {

            sum += (value.alimento.carboidrati * value.dose) / 100 ;
        }
        for (const value of this.alimentiPranzo) {

            sum += (value.alimento.carboidrati * value.dose) / 100 ;
        }
        for (const value of this.alimentiSnack) {

            sum += (value.alimento.carboidrati * value.dose) / 100 ;
        }
        for (const value of this.alimentiCena) {

            sum += (value.alimento.carboidrati * value.dose) / 100 ;
        }
        return sum;
    }

     public getConsumoTotale(): number {
        let sum = 0;
        for (const value of this.eserciziFisici) {

            sum += (value.esercizio.consumoPerMinuto * value.durata);
        }
        return sum;
    }
}
