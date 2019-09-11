import {Component, OnInit} from '@angular/core';
import {Alimento} from '../../model/alimento.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlimentoService} from '../../services/alimento.service';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-dettagli-alimento',
    templateUrl: './dettagli-alimento.page.html',
    styleUrls: ['./dettagli-alimento.page.scss'],
})
export class DettagliAlimentoPage implements OnInit {

    private alimento: Alimento;
    private alimentoFormModel: FormGroup;

    constructor(private alimentoService: AlimentoService,
                private modalController: ModalController,
                private formBuilder: FormBuilder,
                private navParams: NavParams) {
    }

    ngOnInit() {
        this.alimento = this.navParams.data.appParam;
        this.alimentoFormModel = this.formBuilder.group({
            nome: [this.alimento.nome, Validators.required],
            calorie: [this.alimento.calorie, Validators.compose([
                Validators.required,
                Validators.min(0),
                Validators.max(2000)
            ])],
            proteine: [this.alimento.proteine, Validators.compose([
                Validators.required,
                Validators.min(0),
                Validators.max(100)
            ])],
            grassi: [this.alimento.grassi, Validators.compose([
                Validators.required,
                Validators.min(0),
                Validators.max(100)
            ])],
            carboidrati: [this.alimento.carboidrati, Validators.compose([
                Validators.required,
                Validators.min(0),
                Validators.max(100)
            ])],
            categoriaAlimentare: [this.alimento.categoriaAlimentare, Validators.required]
        });
    }

    async onCancel() {
        await this.modalController.dismiss();
    }

    async onConfirm() {
        this.alimento.nome = this.alimentoFormModel.value.nome;
        this.alimento.calorie = this.alimentoFormModel.value.calorie;
        this.alimento.carboidrati = this.alimentoFormModel.value.carboidrati;
        this.alimento.grassi = this.alimentoFormModel.value.grassi;
        this.alimento.proteine = this.alimentoFormModel.value.proteine;
        this.alimento.categoriaAlimentare = this.alimentoFormModel.value.categoriaAlimentare;
        await this.modalController.dismiss(this.alimento);
    }
}
