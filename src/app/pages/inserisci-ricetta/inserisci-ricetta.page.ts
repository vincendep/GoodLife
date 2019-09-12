import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AlertController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {RicettaService} from '../../services/ricetta.service';
import {Ricetta} from '../../model/ricetta.model';
import {DiarioAlimentare} from '../../model/diario.model';
import {DiarioService} from '../../services/diario.service';
import {Alimento} from '../../model/alimento.model';
import {PastoService} from '../../services/pasto.service';

@Component({
    selector: 'app-inserisci-ricetta',
    templateUrl: './inserisci-ricetta.page.html',
    styleUrls: ['./inserisci-ricetta.page.scss'],
})
export class InserisciRicettaPage implements OnInit {
    private ricette$: Observable<Ricetta[]>;
    private diarioAlimentare: DiarioAlimentare;
    private pasto: Array<{ alimento: Alimento, quantita: number }>;

    constructor(private translateService: TranslateService,
                private alertController: AlertController,
                private ricettaService: RicettaService,
                private diarioService: DiarioService,
                private pastoService: PastoService,
                private navController: NavController) {
        this.diarioAlimentare = new DiarioAlimentare();
        this.pasto = new Array<{ alimento: Alimento, quantita: number }>();
    }

    ngOnInit() {
        this.ricette$ = this.ricettaService.listRicette();
        this.diarioAlimentare = this.diarioService.getDiario();
        this.pasto = this.pastoService.getPasto();
    }

    onClick(ricetta: Ricetta) {
        for (const value of ricetta.ingredienti) {
            this.pasto.push({alimento: value.alimento, quantita: value.quantita});
        }
        this.diarioService.updateDiario(this.diarioAlimentare).subscribe();
        this.navController.back();
    }

}
