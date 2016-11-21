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
var getdata_service_1 = require('./getdata.service');
var links_1 = require('./links');
require('./rxjs-operators');
require('rxjs/Rx');
var SwitchPortMemoryUtilizationComponent = (function () {
    function SwitchPortMemoryUtilizationComponent(getdataservice) {
        this.getdataservice = getdataservice;
        this.data = {
            labels: [],
            datasets: []
        };
        this.type = 'bar';
        this.options = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: [{
                        type: "linear",
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                    }, {
                        type: "linear",
                        display: true,
                        position: "right",
                        id: "y-axis-2",
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }],
            }
        };
        this.getDataService();
    }
    SwitchPortMemoryUtilizationComponent.prototype.ngOnInit = function () {
        // this.getDataService();
    };
    SwitchPortMemoryUtilizationComponent.prototype.getDataService = function () {
        var _this = this;
        this.getdataservice.getData(links_1.links[4]).subscribe(function (spmu) {
            _this.getdataservice.getData(links_1.links[0]).subscribe(function (activesource) {
                var pArray = [];
                var tArray = [];
                var nArray = [];
                for (var _i = 0, spmu_1 = spmu; _i < spmu_1.length; _i++) {
                    var a = spmu_1[_i];
                    // this.data.datasets[0].data.push(a.PERCENTAGE);
                    // this.data.datasets[1].data.push(a.TRANSMITTED_FRAMES);
                    pArray.push(a.PERCENTAGE);
                    tArray.push(a.TRANSMITTED_FRAMES);
                }
                for (var _a = 0, spmu_2 = spmu; _a < spmu_2.length; _a++) {
                    var a = spmu_2[_a];
                    for (var _b = 0, activesource_1 = activesource; _b < activesource_1.length; _b++) {
                        var b = activesource_1[_b];
                        if (a.ACTIVERESOURCE_ID == b.ID) {
                            // this.data.labels.push(b.NAME);
                            nArray.push(b.NAME);
                        }
                    }
                }
                return _this.data = {
                    labels: nArray,
                    datasets: [
                        {
                            yAxisID: "y-axis-1",
                            label: 'Percentage (%)',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                            data: pArray
                        },
                        {
                            yAxisID: "y-axis-2",
                            label: 'Transmitted frames',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                            data: tArray
                        }
                    ]
                };
            }, function (err) { return _this.error = err; });
        }, function (err) { return _this.error = err; });
    };
    SwitchPortMemoryUtilizationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-switch-port',
            templateUrl: 'switchportmemoryutilization.html',
            providers: [getdata_service_1.GetDataService]
        }), 
        __metadata('design:paramtypes', [getdata_service_1.GetDataService])
    ], SwitchPortMemoryUtilizationComponent);
    return SwitchPortMemoryUtilizationComponent;
}());
exports.SwitchPortMemoryUtilizationComponent = SwitchPortMemoryUtilizationComponent;
//# sourceMappingURL=switchportmemoryutilization.component.js.map