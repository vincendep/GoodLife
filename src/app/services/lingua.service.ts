import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {LINGUA} from '../constants';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

export class Lingua {
  etichetta: string;
  valore: string;

}

@Injectable({
  providedIn: 'root'
})
export class LinguaService {

  italiano: Lingua = {etichetta: 'Italiano', valore: 'it'};
  inglese: Lingua = {etichetta: 'English', valore: 'en'};
  lingue: Lingua[] = [this.italiano, this.inglese];

  constructor(private storage: Storage) {

  }

  getLinguaAttuale(): Observable<string> {
    return fromPromise(this.storage.get(LINGUA));
  }

  getLinguaPreferita(): string {
    return this.italiano.valore;
  }

  getLingue(): Lingua[] {
    return this.lingue;
  }

  updateLingua(nuovaLingua: string) {
    this.storage.set(LINGUA, nuovaLingua);
  }
}
