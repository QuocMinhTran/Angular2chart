"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var angular2_chartjs_1 = require('angular2-chartjs');
//import {ChartsModule} from 'ng2-charts/ng2-charts';
var app_component_1 = require('./app.component');
var utilization_component_1 = require('./utilization.component');
var switchframestats_component_1 = require('./switchframestats.component');
var droppedframestats_component_1 = require('./droppedframestats.component');
var switchportmemoryutilization_component_1 = require('./switchportmemoryutilization.component');
var activeresourcetask_component_1 = require('./activeresourcetask.component');
var latency_component_1 = require('./latency.component');
var home_component_1 = require('./home.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                //ChartsModule,
                angular2_chartjs_1.ChartModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        component: home_component_1.HomeComponent
                    },
                    {
                        path: 'Utilization',
                        component: utilization_component_1.UtilizationConponent
                    },
                    {
                        path: 'Switch-Frame-Stats',
                        component: switchframestats_component_1.SwitchFrameStatsComponent
                    },
                    {
                        path: 'Dropped-Frame-Stats',
                        component: droppedframestats_component_1.DroppedFrameStatsComponent
                    },
                    {
                        path: 'Switch-Port-Memory-Utilization',
                        component: switchportmemoryutilization_component_1.SwitchPortMemoryUtilizationComponent
                    },
                    {
                        path: 'Active-Resource-Task',
                        component: activeresourcetask_component_1.ActiveResourceTaskComponent
                    },
                    {
                        path: 'Latency',
                        component: latency_component_1.LatencyComponent
                    }
                ]),
                http_1.HttpModule,
                http_1.JsonpModule
            ],
            declarations: [
                app_component_1.AppComponent,
                utilization_component_1.UtilizationConponent,
                switchframestats_component_1.SwitchFrameStatsComponent,
                switchportmemoryutilization_component_1.SwitchPortMemoryUtilizationComponent,
                droppedframestats_component_1.DroppedFrameStatsComponent,
                activeresourcetask_component_1.ActiveResourceTaskComponent,
                latency_component_1.LatencyComponent,
                home_component_1.HomeComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map