import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';

@Component({
  selector: 'app-profilo-menu',
  templateUrl: './profilo-menu.component.html',
  styleUrls: ['./profilo-menu.component.scss'],
})
export class ProfiloMenuComponent implements OnInit {

  constructor(private navController: NavController,
              private utenteService: UtenteService) { }

  ngOnInit() {}

  showSettings() {
    this.navController.navigateForward('impostazioni');
  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('login');
  }
}
