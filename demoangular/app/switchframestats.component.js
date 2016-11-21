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
var SwitchFrameStatsComponent = (function () {
    function SwitchFrameStatsComponent(getdataservice) {
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
    }
    SwitchFrameStatsComponent.prototype.ngOnInit = function () {
        this.getDataService();
    };
    SwitchFrameStatsComponent.prototype.getDataService = function () {
        var _this = this;
        this.getdataservice.getData(links_1.links[2]).subscribe(function (swfs) {
            _this.getdataservice.getData(links_1.links[0]).subscribe(function (activesource) {
                var bitsArray = [];
                var framesArray = [];
                var namesArray = [];
                for (var _i = 0, swfs_1 = swfs; _i < swfs_1.length; _i++) {
                    var a = swfs_1[_i];
                    bitsArray.push(a.BITS);
                    framesArray.push(a.FRAMES);
                }
                for (var _a = 0, swfs_2 = swfs; _a < swfs_2.length; _a++) {
                    var a = swfs_2[_a];
                    for (var _b = 0, activesource_1 = activesource; _b < activesource_1.length; _b++) {
                        var b = activesource_1[_b];
                        if (a.ACTIVERESOURCE_ID == b.ID) {
                            namesArray.push(b.NAME);
                        }
                    }
                }
                return _this.data = {
                    labels: namesArray,
                    datasets: [
                        {
                            yAxisID: "y-axis-1",
                            label: 'BITS',
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
                            data: bitsArray
                        },
                        {
                            yAxisID: "y-axis-2",
                            label: 'FRAMES',
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
                            data: framesArray
                        }
                    ]
                };
            }, function (err) { return _this.error = err; });
        }, function (err) { return _this.error = err; });
    };
    SwitchFrameStatsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-switch-frame',
            templateUrl: 'switchframestats.html',
            providers: [getdata_service_1.GetDataService]
        }), 
        __metadata('design:paramtypes', [getdata_service_1.GetDataService])
    ], SwitchFrameStatsComponent);
    return SwitchFrameStatsComponent;
}());
exports.SwitchFrameStatsComponent = SwitchFrameStatsComponent;
//# sourceMappingURL=switchframestats.component.js.map