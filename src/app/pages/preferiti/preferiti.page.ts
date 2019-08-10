import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs} from '@ionic/angular';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.page.html',
  styleUrls: ['./preferiti.page.scss'],
})
export class PreferitiPage implements OnInit {
  private currentTab: string;
  @ViewChild(IonTabs) tabs: IonTabs;

  constructor() { }

  ngOnInit() {}

  getSelectedTab(): void {
    this.currentTab = this.tabs.getSelected() === 'aliments' ? 'ALIMENTI' : 'PASTI';
  }
}
