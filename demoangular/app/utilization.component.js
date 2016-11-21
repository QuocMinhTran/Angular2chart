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
var UtilizationConponent = (function () {
    function UtilizationConponent(getdataservice) {
        this.getdataservice = getdataservice;
        this.type = 'bar';
        this.data = {
            labels: [],
            datasets: []
        };
        this.options = {
            responsive: true,
            maintainAspectRatio: true
        };
    }
    UtilizationConponent.prototype.ngOnInit = function () {
        this.getUtilization();
    };
    UtilizationConponent.prototype.getUtilization = function () {
        var _this = this;
        this.getdataservice.getData(links_1.links[5])
            .subscribe(function (res) {
            _this.getdataservice.getData(links_1.links[0]).subscribe(function (activesource) {
                var labelsArray = [];
                var dataArray = [];
                for (var _i = 0, activesource_1 = activesource; _i < activesource_1.length; _i++) {
                    var a = activesource_1[_i];
                    for (var _a = 0, res_1 = res; _a < res_1.length; _a++) {
                        var b = res_1[_a];
                        if (a.ID == b.ACTIVERESOURCE_ID) {
                            labelsArray.push(a.NAME);
                            dataArray.push(b.PERCENTAGE);
                        }
                    }
                }
                console.log(labelsArray);
                console.log(dataArray);
                return _this.data = {
                    labels: labelsArray,
                    datasets: [{
                            label: 'my database',
                            data: dataArray,
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
                            ]
                        }]
                };
            });
        }, function (err) { return _this.error = err; });
    };
    UtilizationConponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-utilization',
            templateUrl: 'utilization.html',
            providers: [getdata_service_1.GetDataService]
        }), 
        __metadata('design:paramtypes', [getdata_service_1.GetDataService])
    ], UtilizationConponent);
    return UtilizationConponent;
}());
exports.UtilizationConponent = UtilizationConponent;
//# sourceMappingURL=utilization.component.js.map