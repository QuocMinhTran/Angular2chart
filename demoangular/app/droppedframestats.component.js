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
var DroppedFrameStatsComponent = (function () {
    function DroppedFrameStatsComponent(getdataservice) {
        this.getdataservice = getdataservice;
    }
    DroppedFrameStatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getdataservice.getData(links_1.links[5])
            .subscribe(function (res) {
            _this.getdataservice.getData(links_1.links[0]).subscribe(function (activesource) {
                var labelsArray = [];
                var dataArray = [];
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'NAME');
                data.addColumn('number', 'PERCENTAGE');
                for (var _i = 0, activesource_1 = activesource; _i < activesource_1.length; _i++) {
                    var a = activesource_1[_i];
                    for (var _a = 0, res_1 = res; _a < res_1.length; _a++) {
                        var b = res_1[_a];
                        if (a.ID == b.ACTIVERESOURCE_ID) {
                            // labelsArray.push(a.NAME);
                            // dataArray.push(b.PERCENTAGE);
                            data.addRow([a.NAME, b.PERCENTAGE]);
                        }
                    }
                }
                var options = {
                    title: 'Utilization',
                    width: 900,
                    legend: { position: 'none' },
                    chart: { subtitle: 'published by Minh' },
                    axes: {
                        x: {
                            0: { side: 'bottom', label: 'Element' } // Top x-axis.
                        }
                    },
                    bar: { groupWidth: "90%" },
                    vAxis: { format: 'decimal' },
                    animation: {
                        duration: 6000,
                        easing: 'out'
                    }
                };
                var chart = new google.charts.Bar(document.getElementById('top_x_div'));
                chart.draw(data, google.charts.Bar.convertOptions(options));
                // console.log(labelsArray);
                // console.log(dataArray);                    
            });
        }, function (err) { return _this.error = err; });
    };
    DroppedFrameStatsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-dropped-frame',
            templateUrl: 'droppedframestats.html',
            providers: [getdata_service_1.GetDataService]
        }), 
        __metadata('design:paramtypes', [getdata_service_1.GetDataService])
    ], DroppedFrameStatsComponent);
    return DroppedFrameStatsComponent;
}());
exports.DroppedFrameStatsComponent = DroppedFrameStatsComponent;
//# sourceMappingURL=droppedframestats.component.js.map