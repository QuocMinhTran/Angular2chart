import { Component, OnInit } from '@angular/core';
import { GetDataService } from './getdata.service';

import { links } from './links';

import './rxjs-operators';
import 'rxjs/Rx';
@Component({
    moduleId: module.id,
    selector: 'my-switch-port',
    templateUrl: 'switchportmemoryutilization.html',
    providers: [GetDataService]
})
export class SwitchPortMemoryUtilizationComponent implements OnInit {
    data = {
        labels: [],
        datasets: []
    }
    error: string;
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
            }, {
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: "right",
                id: "y-axis-2",
                gridLines: {
                    drawOnChartArea: false
                }
            }],
        }
    }
    constructor(private getdataservice: GetDataService) { this.getDataService(); }
    ngOnInit() {
        // this.getDataService();
    }
    getDataService(): void {
        this.getdataservice.getData(links[4]).subscribe(spmu => {
            this.getdataservice.getData(links[0]).subscribe(activesource => {
                let pArray = [];
                let tArray = [];
                let nArray = [];
                for (let a of spmu) {
                    // this.data.datasets[0].data.push(a.PERCENTAGE);
                    // this.data.datasets[1].data.push(a.TRANSMITTED_FRAMES);
                    pArray.push(a.PERCENTAGE);
                    tArray.push(a.TRANSMITTED_FRAMES);
                }
                for (let a of spmu) {
                    for (let b of activesource) {
                        if (a.ACTIVERESOURCE_ID == b.ID) {
                            // this.data.labels.push(b.NAME);
                            nArray.push(b.NAME);
                        }
                    }
                }
                return this.data = {
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
                }

            }, err => this.error = <any>err)
        }, err => this.error = err)
    }
}