import {Dieta} from './dieta.model';

export class Utente {
    private _nome: string;
    private _cognome: string;
    private _email: string;
    private _sesso: Sesso;
    private _dataDiNascita: string;
    private _diete: Array<Dieta>;
    private _informazioniFisiche: Array<{informazioniFisiche: InformazioniFisiche, dataInserimento: Date}>;

    constructor() {
        this._diete = new Array<Dieta>();
        this._informazioniFisiche = new Array<{informazioniFisiche: InformazioniFisiche, dataInserimento: Date}>();
    }

    get nome() {
        return this._nome;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    get cognome() {
        return this._cognome;
    }

    set cognome(cognome: string) {
        this._cognome = cognome;
    }

    get email() {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }

    get sesso() {
        return this._sesso;
    }

    set sesso(sesso: Sesso) {
        this._sesso = sesso;
    }

    get dataDiNascita() {
        return this._dataDiNascita;
    }

    set dataDiNascita(dataDiNascita: string) {
        this._dataDiNascita = dataDiNascita;
    }

    get diete(): Array<Dieta> {
        return this._diete;
    }

    set diete(value: Array<Dieta>) {
        this._diete = value;
    }

    get informazioniFisiche(): Array<{ informazioniFisiche: InformazioniFisiche; dataInserimento: Date }> {
        return this._informazioniFisiche;
    }

    set informazioniFisiche(value: Array<{ informazioniFisiche: InformazioniFisiche; dataInserimento: Date }>) {
        this._informazioniFisiche = value;
    }
}

export enum Sesso {
    MASCHIO,
    FEMMINA
}


export class InformazioniFisiche {
    private _altezza: number;
    private _peso: number;
    private _vita: number;
    private _fianchi: number;
    private _coscia: number;
    private _braccio: number;
    private _livelloAttivitàFisica: Livello;
    private _liverlloAttivitàGiornaliera: Livello;

    get altezza() {
        return this._altezza;
    }

    set altezza(altezza: number) {
        this._altezza = altezza;
    }

    get peso() {
        return this._peso;
    }

    set peso(peso: number) {
        this._peso = peso;
    }

    get vita() {
        return this._vita;
    }

    set vita(vita: number) {
        this._vita = vita;
    }

    get fianchi() {
        return this._fianchi;
    }

    set fianchi(fianchi: number) {
        this._fianchi = fianchi;
    }

    get coscia() {
        return this._coscia;
    }

    set coscia(coscia: number) {
        this._coscia = coscia;
    }

    get braccio() {
        return this._braccio;
    }

    set braccio(braccio: number) {
        this._braccio = braccio;
    }

    get livelloAttivitaFisica() {
        return this._livelloAttivitàFisica;
    }

    set livelloAttivitaFisisca(livelloAttivitaFisica: Livello) {
        this._livelloAttivitàFisica = livelloAttivitaFisica;
    }

    get livelloAttivitaGiornaliera() {
        return this._liverlloAttivitàGiornaliera;
    }

    set livelloAttivitaGiornaliera(livelloAttivitaGiornaliera: Livello) {
        this._liverlloAttivitàGiornaliera = livelloAttivitaGiornaliera;
    }

}

export enum Livello {
    Basso,
    Medio,
    Alto
}
