import {InformazioniFisiche, Sesso, Utente} from '../../model/utente.model';
import {Dieta, Obiettivo} from '../../model/dieta.model';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit, ViewChild} from '@angular/core';

import {AlertController, IonSlides, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
    stepTwoForm: FormGroup;
    stepThreeForm: FormGroup;
    @ViewChild(IonSlides) slides: IonSlides;
    slideOpts = {
        initialSlide: 0,
        speed: 400
    };
    nuovoUtente: Utente;
    informazioni: InformazioniFisiche;
    signupErrorTitle: string;
    signupErrorMessage: string;

    constructor(private formBuilder: FormBuilder,
                private translateService: TranslateService,
                private navController: NavController,
                private alertController: AlertController) {
        this.nuovoUtente = new Utente();
        this.informazioni = new InformazioniFisiche();
        this.nuovoUtente.informazioniFisiche.push({informazioniFisiche: this.informazioni, dataInserimento: new Date()});
    }

    ngOnInit() {
        this.slides.lockSwipes(true);
        this.stepTwoForm = this.formBuilder.group({
            altezza: ['', Validators.compose([
                Validators.required,
                Validators.min(100),
                Validators.max(299)
            ])],
            peso: ['', Validators.compose([
                Validators.required,
                Validators.min(30),
                Validators.max(299)
            ])],
            dataDiNascita: ['', Validators.compose([
                Validators.required,
                // TODO signup data validators
            ])],
            sesso: ['', Validators.compose([
                Validators.required
            ])]
        });
        this.stepThreeForm = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            nome: ['', Validators.required],
            cognome: ['', Validators.required],
            password: ['', Validators.required],
            passwordCheck: ['', Validators.required]
            }
        );
        this.initTranslate();
    }

    onConfirmStepOne(event) {
        const dieta: Dieta = new Dieta();
        dieta.dataInizioDieta = new Date();
        switch (event.srcElement.id) {
          case 'obiettivoDimagrimento':
            dieta.obiettivo = Obiettivo.DIMAGRIRE;
            break;
          case 'obiettivoMassa':
            dieta.obiettivo = Obiettivo.MASSA_MUSCOLARE;
            break;
          case 'obiettivoSano':
            dieta.obiettivo = Obiettivo.MANGIARE_SANO;
        }
        this.nuovoUtente.diete.push(dieta);
        this.goToNextStep();
    }

    onConfirmStepTwo() {
        this.informazioni.altezza = this.stepTwoForm.get('altezza').value;
        this.informazioni.peso = this.stepTwoForm.get('peso').value;
        this.nuovoUtente.dataDiNascita = this.stepTwoForm.get('dataDiNascita').value;
        this.nuovoUtente.sesso = this.stepTwoForm.get('sesso').value === 'maschio' ? Sesso.MASCHIO : Sesso.FEMMINA;
        this.goToNextStep();
    }

    onConfirmStepThree() {
        this.signup();
    }

    // TODO utente service call
    signup() {
        if (this.stepThreeForm.get('password').value === this.stepThreeForm.get('passwordCheck').value) {
            this.nuovoUtente.email = this.stepThreeForm.get('email').value;
            this.nuovoUtente.nome = this.stepThreeForm.get('nome').value;
            this.nuovoUtente.cognome = this.stepThreeForm.get('cognome').value;
            this.navController.navigateRoot('tabs');
        } else {
            this.showPasswordErrorMessage();
            this.stepThreeForm.get('password').setValue('');
            this.stepThreeForm.get('passwordCheck').setValue('');
        }

    }

    async showPasswordErrorMessage() {
        const alert = await this.alertController.create({
            header: this.signupErrorTitle,
            message: this.signupErrorMessage,
            buttons: ['OK']
        });

        await alert.present();
    }

    initTranslate() {
        this.translateService.get('SIGNUP_ERROR_TITLE').subscribe((data) => {
            this.signupErrorTitle = data;
        });
        this.translateService.get('SIGNUP_ERROR_MESSAGE').subscribe((data) => {
            this.signupErrorMessage = data;
        });
    }

    goToNextStep() {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }

    goToPreviousStep() {
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
    }
}

