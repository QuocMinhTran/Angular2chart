import { Component, OnInit } from '@angular/core';
import { GetDataService } from './getdata.service';

import { links } from './links';

@Component({
    moduleId: module.id,
    selector: 'my-switch-frame',
    templateUrl: 'switchframestats.html',
    providers: [GetDataService]
})
export class SwitchFrameStatsComponent implements OnInit {
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
    constructor(private getdataservice: GetDataService) { }
    ngOnInit() {
        this.getDataService();
    }
    getDataService(): void {
        this.getdataservice.getData(links[2]).subscribe(swfs => {
            this.getdataservice.getData(links[0]).subscribe(activesource => {
                let bitsArray = [];
                let framesArray = [];
                let namesArray = [];
                for (let a of swfs) {
                    bitsArray.push(a.BITS);
                    framesArray.push(a.FRAMES);
                }

                for (let a of swfs) {
                    for (let b of activesource) {
                        if (a.ACTIVERESOURCE_ID == b.ID) {
                            namesArray.push(b.NAME);
                        }
                    }
                }
                return this.data = {
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
                }
            }, err => this.error = <any>err)
        }, err => this.error = err)
    }
}