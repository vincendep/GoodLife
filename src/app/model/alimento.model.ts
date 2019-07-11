
export class Alimento {
    private _nome: string;
    private _calorie: number;
    private _carboidrati: number;
    private _proteine: number;
    private _grassi: number;
    private _categoria: Categorie;

    get carboidrati(): number {
        return this._carboidrati;
    }

    set carboidrati(value: number) {
        this._carboidrati = value;
    }
    get nome() {
        return this._nome;
    }

    set nome(n: string) {
        this._nome = n;
    }

    get calorie() {
        return this._calorie;
    }

    set calorie(c: number) {
        this._calorie = c;
    }

    get proteine() {
        return this._proteine;
    }

    set proteine(p: number) {
        this._proteine = p;
    }

    get grassi() {
        return this._grassi;
    }

    set grassi(g: number) {
        this._grassi = g;
    }

    get categoria(): Categorie {
        return this._categoria;
    }

    set categoria(value: Categorie) {
        this._categoria = value;
    }
}

export enum Categorie {
    PREFERITI,
    CARNE,
    PESCE,
}
