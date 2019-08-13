import {Component, OnInit} from '@angular/core';
import {Alimento} from '../../model/alimento.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlimentoService} from '../../services/alimento.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-dettagli-alimento',
  templateUrl: './dettagli-alimento.page.html',
  styleUrls: ['./dettagli-alimento.page.scss'],
})
export class DettagliAlimentoPage implements OnInit {

  private alimento: Alimento;
  private form: FormGroup;

  constructor(private alimentoService: AlimentoService, private modalController: ModalController, private formBuilder: FormBuilder) {
    this.alimento = new Alimento();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      calorie: [Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(2000)
      ])],
      proteine: ['', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ])],
      grassi: ['', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ])],
      carboidrati: ['', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ])],
      categoriaAlimentare: ['', Validators.required]
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  async saveModal() {
    this.alimento.nome = this.form.get('nome').value;
    this.alimento.calorie = this.form.get('calorie').value;
    this.alimento.carboidrati = this.form.get('carboidrati').value;
    this.alimento.grassi = this.form.get('grassi').value;
    this.alimento.proteine = this.form.get('proteine').value;
    this.alimento.categoriaAlimentare = this.form.get('categoriaAlimentare').value;
    this.alimentoService.createAlimento(this.alimento).subscribe();
    await this.modalController.dismiss();
  }
}
