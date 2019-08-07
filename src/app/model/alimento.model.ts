
export class Alimento {
    idAlimento: number;
    nome: string;
    calorie: number;
    proteine: number;
    carboidrati: number;
    grassi: number;
    categoria: Categorie;
}

export enum Categorie {
    ALCOOL,
    FRUTTA,
    VERDURA,
    CARNE,
    PESCE,
    LATTICINI,
    LEGUMI,
    CEREALI,
    CONDIMENTO,
    UOVA,
    DOLCE,
    ERROR
}
