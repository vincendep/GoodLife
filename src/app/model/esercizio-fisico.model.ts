export class EsercizioFisico {
    private _nome: string;
    private _consumoPerMinuto: number;

    get nome() {
        return this._nome;
    }

    set nome(n: string) {
        this._nome = n;
    }

    get consumoPerMinuto() {
        return this.consumoPerMinuto;
    }

    set consumoPerMinuto(cpm: number) {
        this._consumoPerMinuto = cpm;
    }
}

