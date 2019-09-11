import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ProfiloPage} from './profilo.page';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {createTranslateLoader} from '../../app.module';
import {ProfiloMenuComponent} from '../../components/profilo-menu/profilo-menu.component';

const routes: Routes = [
    {
        path: '',
        component: ProfiloPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [ProfiloPage, ProfiloMenuComponent],
    entryComponents: [ProfiloMenuComponent]
})
export class ProfiloPageModule {
}
