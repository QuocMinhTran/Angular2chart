import { Component, OnInit, OnChanges } from '@angular/core';
import { links } from './links';
import { GetDataService } from './getdata.service';

declare var google: any;
@Component({
    moduleId: module.id,
    selector: 'Latency',
    templateUrl: 'latency.html',
    providers: [GetDataService]
})
export class LatencyComponent implements OnInit {
    latencyTimers: any;
    error: string;
    selectedTimer: any;
    selectedArray = [];

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
    constructor(private getdataservice: GetDataService) {
    }
    ngOnInit() {
        this.getdataservice.getData(links[6])
            .subscribe(res => {
                //console.log(res);
                this.latencyTimers = res;
            },
            err => this.error = err);
    }
    onChange(newObj) {
        /*this.data = {
            labels: [],
            datasets: []
        }*/
        let procent = [];
        let sumArray = [];
        let valueArray = [];
        //console.log(newObj);
        this.selectedArray = [];
        this.selectedTimer = null;
        this.selectedTimer = newObj;
        this.getdataservice.getData(links[7])
            .subscribe(res => {
                res.forEach(element => {
                    if (element.TIMER_ID == this.selectedTimer.ID) {
                        this.selectedArray.push(element.LATENCYTIME);
                    }
                });
                //console.log(this.selectedArray);
                this.selectedArray.sort(function (a, b) { return b - a });
                //console.log(this.selectedArray);
                let temp = 0;
                //let temp2 = 0;
                let a = this.selectedArray[0];
                valueArray.push(a + 0.0001);
                sumArray.push(0);
                this.selectedArray.forEach(element => {
                    if (element >= a) {
                        temp++;
                        //temp2++;
                    } else {
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
                let b = 0;
                sumArray.forEach((element) => {
                    procent.push(b + element);
                    b += element;
                });
                let max = procent[procent.length - 1];
                let procent1 = [];
                procent.forEach(element => {
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

                let data = new google.visualization.DataTable();
                data.addColumn('number', 'Time');
                data.addColumn('number', 'Frames');
                data.addColumn('number', 'Percentage');
                procent1.forEach((element, index) => {
                    data.addRow([valueArray[index], sumArray[index], element]);
                });
                let options = {
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
                    animation:{
                        //startup:true,
                        durationm:2000,
                        easing:'in',
                    }
                };
                let chart = new google.visualization.ComboChart(document.getElementById('my-latency-chart'));
                chart.draw(data, options);
                return chart;
            }, err => this.error = <any>err);
    }
}