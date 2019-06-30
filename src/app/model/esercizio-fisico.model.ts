
export class EsercizioFisico {
    private _nome: string;
    private _durata: number;
    private _consumoPerMinuto: number;

    get nome() {
        return this._nome;
    }

    set nome(n: string) {
        this._nome = n;
    }

    get durata() {
        return this._durata;
    }

    set durata(d: number) {
        this._durata = d;
    }

    get consumoPerMinuto() {
        return this.consumoPerMinuto;
    }

    set consumoPerMinuto(cpm: number) {
        this._consumoPerMinuto = cpm;
    }

    public consumoTotale(): number {
        return this._consumoPerMinuto * this._durata;
    }
}
