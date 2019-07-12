import {Component, OnInit} from '@angular/core';
import {AlimentoService} from '../../services/alimento.service';
import {Alimento, Categorie} from '../../model/alimento.model';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crea-alimento',
  templateUrl: './crea-alimento.page.html',
  styleUrls: ['./crea-alimento.page.scss'],
})
export class CreaAlimentoPage implements OnInit {

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
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  saveModal() {
    this.alimento.nome = this.form.get('nome').value;
    this.alimento.calorie = this.form.get('calorie').value;
    this.alimento.carboidrati = this.form.get('carboidrati').value;
    this.alimento.grassi = this.form.get('grassi').value;
    this.alimento.proteine = this.form.get('proteine').value;
    this.alimento.categoria = Categorie.PREFERITI;
    this.alimentoService.add(this.alimento);
    this.modalController.dismiss();
  }
}
