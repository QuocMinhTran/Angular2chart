import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';

import {ChartModule} from 'angular2-chartjs';
//import {ChartsModule} from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { UtilizationConponent} from './utilization.component';
import { SwitchFrameStatsComponent} from './switchframestats.component';
import { DroppedFrameStatsComponent} from './droppedframestats.component';
import { SwitchPortMemoryUtilizationComponent} from './switchportmemoryutilization.component';
import {ActiveResourceTaskComponent} from './activeresourcetask.component';

@NgModule({
    imports: [
        //ChartsModule,
        ChartModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path:'',
                component:UtilizationConponent,
                pathMatch:'full'
            },
            {
                path:'Utilization',
                component: UtilizationConponent
            },
            {
                path:'Switch-Frame-Stats',
                component: SwitchFrameStatsComponent
            },
            {
                path:'Dropped-Frame-Stats',
                component: DroppedFrameStatsComponent
            },
            {
                path:'Switch-Port-Memory-Utilization',
                component: SwitchPortMemoryUtilizationComponent
            },
            {
                path:'Active-Resource-Task',
                component: ActiveResourceTaskComponent
            }
        ]),
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        UtilizationConponent,
        SwitchFrameStatsComponent,
        SwitchPortMemoryUtilizationComponent,
        DroppedFrameStatsComponent,
        ActiveResourceTaskComponent
        ],
    bootstrap: [AppComponent]
})

export class AppModule{}