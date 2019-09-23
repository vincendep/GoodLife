import {Dieta} from './dieta.model';

export class Utente {

    id: number;
    nome: string;
    cognome: string;
    email: string;
    password: string;
    sesso: Sesso;
    dataDiNascita: string;
    diete: Array<Dieta>;
    informazioniFisiche: Array<InformazioniFisiche>;

    constructor() {
        this.diete = new Array<Dieta>();
        this.informazioniFisiche = new Array<InformazioniFisiche>();
    }
}

export enum Sesso {
    MASCHIO,
    FEMMINA
}


export class InformazioniFisiche {
    dataMisurazione: Date;
    altezza: number;
    peso: number;
    vita: number;
    fianchi: number;
    coscia: number;
    braccio: number;
    livelloAttivitàFisica: Livello;
    liverlloAttivitàGiornaliera: Livello;

    constructor() {
        this.dataMisurazione = new Date();
    }
}

export enum Livello {
    Basso,
    Medio,
    Alto
}
