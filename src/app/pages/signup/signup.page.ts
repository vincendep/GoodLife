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

    formStepDue: FormGroup;
    formStepTre: FormGroup;
    @ViewChild(IonSlides) slides: IonSlides;
    slideOpts = {
        initialSlide: 0,
        speed: 400
    };
    utente: Utente;
    informazioni: InformazioniFisiche;
    signupErrorTitle: string;
    signupErrorEmail: string;
    signupErrorPassword: string;

    constructor(private formBuilder: FormBuilder,
                private translateService: TranslateService,
                private navController: NavController,
                private alertController: AlertController,
                private utenteService: UtenteService) {
        this.utente = new Utente();
        this.informazioni = new InformazioniFisiche();
        this.utente.informazioniFisiche.push(this.informazioni);
    }

    ngOnInit() {
        this.slides.lockSwipes(true);
        this.formStepDue = this.formBuilder.group({
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
        this.formStepTre = this.formBuilder.group({
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
        this.utente.diete.push(dieta);
        this.goToNextStep();
    }

    onConfirmStepTwo() {
        this.informazioni.altezza = this.formStepDue.get('altezza').value;
        this.informazioni.peso = this.formStepDue.get('peso').value;
        this.utente.dataDiNascita = this.formStepDue.get('dataDiNascita').value;
        this.utente.sesso = this.formStepDue.get('sesso').value === 'maschio' ? Sesso.MASCHIO : Sesso.FEMMINA;
        this.goToNextStep();
    }

    onConfirmStepThree() {
        if (this.formStepTre.get('password').value === this.formStepTre.get('passwordCheck').value) {
            this.utente.email = this.formStepTre.get('email').value;
            this.utente.password = this.formStepTre.get('password').value;
            this.utente.nome = this.formStepTre.get('nome').value;
            this.utente.cognome = this.formStepTre.get('cognome').value;
            this.signup();
        } else {
            this.showErrorPassword();
            this.formStepTre.get('password').setValue('');
            this.formStepTre.get('passwordCheck').setValue('');
        }
    }

    signup() {
        this.utenteService.signup(this.utente).subscribe((utente: Utente) => {
                const account: Account = {
                    username: this.formStepTre.get('email').value,
                    password: this.formStepTre.get('password').value
                };
                this.utenteService.login(account).subscribe((u: Utente) => {
                    this.navController.navigateRoot('tabs');
                });
            }
            ,
            (err: HttpErrorResponse) => {
                if (err.status === 500) {
                    console.error('login request error: ' + err.status);
                    this.formStepTre.reset();
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
}

