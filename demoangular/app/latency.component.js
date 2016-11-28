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
var links_1 = require('./links');
var getdata_service_1 = require('./getdata.service');
var LatencyComponent = (function () {
    /*data = {
        labels: [],
        datasets: []
    };
    type = 'bar';
    options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            yAxes: [{
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: "left",
                id: "y-axis-1",
                scaleLabel: { labelString: 'Frames', display: true }
            }, {
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: "right",
                id: "y-axis-2",
                gridLines: {
                    drawOnChartArea: true
                },
                scaleLabel: { labelString: '%', display: true }
            }]
        },
        zoom: {
            enabled: true,
            mode: 'x',
            sensitivity: 3,
            limits: {
                max: 10,
                min: 0.5
            }
        }

    };*/
    function LatencyComponent(getdataservice) {
        this.getdataservice = getdataservice;
        this.selectedArray = [];
    }
    LatencyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getdataservice.getData(links_1.links[6])
            .subscribe(function (res) {
            //console.log(res);
            _this.latencyTimers = res;
        }, function (err) { return _this.error = err; });
    };
    LatencyComponent.prototype.onChange = function (newObj) {
        var _this = this;
        /*this.data = {
            labels: [],
            datasets: []
        }*/
        var procent = [];
        var sumArray = [];
        var valueArray = [];
        //console.log(newObj);
        this.selectedArray = [];
        this.selectedTimer = null;
        this.selectedTimer = newObj;
        this.getdataservice.getData(links_1.links[7])
            .subscribe(function (res) {
            res.forEach(function (element) {
                if (element.TIMER_ID == _this.selectedTimer.ID) {
                    _this.selectedArray.push(element.LATENCYTIME);
                }
            });
            //console.log(this.selectedArray);
            _this.selectedArray.sort(function (a, b) { return b - a; });
            //console.log(this.selectedArray);
            var temp = 0;
            //let temp2 = 0;
            var a = _this.selectedArray[0];
            valueArray.push(a + 0.0001);
            sumArray.push(0);
            _this.selectedArray.forEach(function (element) {
                if (element >= a) {
                    temp++;
                }
                else {
                    sumArray.push(temp);
                    temp = 0;
                    valueArray.push(a);
                    //procent.push(temp2);
                    a -= 0.0001;
                }
            });
            sumArray.push(0);
            valueArray.push(0);
            //console.log(sumArray);
            //console.log(valueArray);
            sumArray.reverse();
            valueArray.reverse();
            var b = 0;
            sumArray.forEach(function (element) {
                procent.push(b + element);
                b += element;
            });
            var max = procent[procent.length - 1];
            var procent1 = [];
            procent.forEach(function (element) {
                procent1.push(element / max);
            });
            /*return this.data = {
                labels: valueArray,
                datasets: [{
                    type: 'bar',
                    yAxisID: "y-axis-1",
                    label: 'my latency',
                    data: sumArray,
                    backgroundColor: 'rgba(255, 142, 114,0.5)'

                },
                {
                    type: 'line',
                    yAxisID: "y-axis-2",
                    label: 'my procent',
                    data: procent1,
                    borderColor: 'rgba(0, 255, 169,1)',
                    fill: false,
                    pointBorderWidth: 0.3
                }]
            }*/
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Time');
            data.addColumn('number', 'Frames');
            data.addColumn('number', 'Percentage');
            procent1.forEach(function (element, index) {
                data.addRow([valueArray[index], sumArray[index], element]);
            });
            var options = {
                title: 'Latency',
                hAxis: { title: 'second' },
                vAxes: {
                    0: {
                        title: 'Frames',
                        viewWindowMode: 'explicit',
                        viewWindow: {
                            max: max,
                            min: 0
                        },
                        gridlines: { color: 'transparent' },
                    },
                    1: {
                        title: 'Percentage',
                        gridlines: { color: 'transparent' },
                        format: "#%",
                        ticks: [0, 0.5, 1]
                    },
                },
                seriesType: 'bars',
                series: {
                    0: { targetAxisIndex: 0 },
                    1: { targetAxisIndex: 1, type: 'line' },
                },
                colors: ["red", "green", "orange"],
                //chartArea: { left: 100, top: 100, width: 1000, height: 150 },
                animation: {
                    //startup:true,
                    durationm: 2000,
                    easing: 'in',
                }
            };
            var chart = new google.visualization.ComboChart(document.getElementById('my-latency-chart'));
            chart.draw(data, options);
            return chart;
        }, function (err) { return _this.error = err; });
    };
    LatencyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Latency',
            templateUrl: 'latency.html',
            providers: [getdata_service_1.GetDataService]
        }), 
        __metadata('design:paramtypes', [getdata_service_1.GetDataService])
    ], LatencyComponent);
    return LatencyComponent;
}());
exports.LatencyComponent = LatencyComponent;
//# sourceMappingURL=latency.component.js.map