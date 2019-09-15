import {InformazioniFisiche, Sesso, Utente} from '../../model/utente.model';
import {Dieta, Obiettivo} from '../../model/dieta.model';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit, ViewChild} from '@angular/core';

import {AlertController, IonSlides, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Account, UtenteService} from '../../services/utente.service';
import {HttpErrorResponse} from '@angular/common/http';

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
    signupErrorEmail: string;
    signupErrorPassword: string;

    constructor(private formBuilder: FormBuilder,
                private translateService: TranslateService,
                private navController: NavController,
                private alertController: AlertController,
                private utenteService: UtenteService) {
        this.nuovoUtente = new Utente();
        this.informazioni = new InformazioniFisiche();
        this.nuovoUtente.informazioniFisiche.push(this.informazioni);
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
        dieta.inizioDieta = new Date();
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
        if (this.stepThreeForm.get('password').value === this.stepThreeForm.get('passwordCheck').value) {
            this.nuovoUtente.email = this.stepThreeForm.get('email').value;
            this.nuovoUtente.password = this.stepThreeForm.get('password').value;
            this.nuovoUtente.nome = this.stepThreeForm.get('nome').value;
            this.nuovoUtente.cognome = this.stepThreeForm.get('cognome').value;
            this.signup();
        } else {
            this.showErrorPassword();
            this.stepThreeForm.get('password').setValue('');
            this.stepThreeForm.get('passwordCheck').setValue('');
        }
    }

    signup() {
        this.utenteService.signup(this.nuovoUtente).subscribe((utente: Utente) => {
                const account: Account = {
                    username: this.stepThreeForm.get('email').value,
                    password: this.stepThreeForm.get('password').value
                };
                this.utenteService.login(account).subscribe((u: Utente) => {
                    this.navController.navigateRoot('tabs');
                });
            }
            ,
            (err: HttpErrorResponse) => {
                if (err.status === 500) {
                    console.error('login request error: ' + err.status);
                    this.stepThreeForm.reset();
                    this.showErrorEmail();
                }
            });
    }

    async showErrorPassword() {
        const alert = await this.alertController.create({
            header: this.signupErrorTitle,
            message: this.signupErrorPassword,
            buttons: ['OK']
        });
        await alert.present();
    }

    async showErrorEmail() {
        const alert = await this.alertController.create({
            header: this.signupErrorTitle,
            message: this.signupErrorEmail,
            buttons: ['OK']
        });
        await alert.present();
    }

    initTranslate() {
        this.translateService.get('SIGNUP_ERROR_TITLE').subscribe((data) => {
            this.signupErrorTitle = data;
        });
        this.translateService.get('SIGNUP_ERROR_PASSWORD').subscribe((data) => {
            this.signupErrorPassword = data;
        });
        this.translateService.get('SIGNUP_ERROR_EMAIL').subscribe((data) => {
            this.signupErrorEmail = data;
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

