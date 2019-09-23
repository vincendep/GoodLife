import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs} from '@ionic/angular';

@Component({
    selector: 'app-preferiti',
    templateUrl: './preferiti.page.html',
    styleUrls: ['./preferiti.page.scss'],
})
export class PreferitiPage implements OnInit {

    @ViewChild(IonTabs) tabs: IonTabs;

    constructor() {}

    ngOnInit() {}

    getNomeTabCorrente(): string {
        return this.tabs.getSelected() === 'alimenti' ? 'ALIMENTI' : 'RICETTE';
    }
}
