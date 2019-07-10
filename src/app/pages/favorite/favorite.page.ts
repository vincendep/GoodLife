import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs} from '@ionic/angular';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  private currentTab: string;
  @ViewChild(IonTabs) tabs: IonTabs;

  constructor() { }

  ngOnInit() {}

  getSelectedTab(): void {
    this.currentTab = this.tabs.getSelected() === 'aliments' ? 'ALIMENTI' : 'PASTI';
  }
}
