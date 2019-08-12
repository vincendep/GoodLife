import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Pasto} from '../../model/pasto.model';
import {AlimentoService} from '../../services/alimento.service';
import {Alimento} from '../../model/alimento.model';
import {AlertController} from '@ionic/angular';
import {PastoService} from '../../services/pasto.service';
import {Observable} from 'rxjs';
import {DiarioAlimentare} from '../../model/diario.model';
import {DiarioService} from '../../services/diario.service';


@Component({
  selector: 'app-inserisci-cibo',
  templateUrl: './inserisci-cibo.page.html',
  styleUrls: ['./inserisci-cibo.page.scss'],
})

export class InserisciCiboPage implements OnInit {

    private alimenti$: Observable<Alimento[]>;
    private diarioAlimentare: DiarioAlimentare;
    private pasto: Array<{alimento: Alimento, quantita: number}>;
    private categoriaSelezionata: string;

    constructor(private translateService: TranslateService,
                private router: Router,
                private route: ActivatedRoute,
                private diarioService: DiarioService,
                private alimentoService: AlimentoService,
                private pastoService: PastoService) {
        this.diarioAlimentare = new DiarioAlimentare();
        this.pasto = new Array<{alimento: Alimento, quantita: number}>();
    }


    ngOnInit() {
        this.alimenti$ = this.alimentoService.listAlimenti();
        this.diarioAlimentare = this.diarioService.getDiario();
        this.pasto = this.pastoService.getPasto();
        console.log(this.alimenti$);
    }
}
