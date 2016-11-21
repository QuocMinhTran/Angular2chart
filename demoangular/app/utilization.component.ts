import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GetDataService } from './getdata.service';
import { links } from './links';



import './rxjs-operators';
import 'rxjs/Rx';
@Component({
    moduleId: module.id,
    selector: 'my-utilization',
    templateUrl: 'utilization.html',
    providers: [GetDataService]
})
export class UtilizationConponent implements OnInit {
    error: string;    
    type = 'bar';    
    data: any = {
        labels: [],
        datasets: []
    };
    options = {
        responsive: true,
        maintainAspectRatio: true
    };

    constructor(private getdataservice: GetDataService) {        
    }
    ngOnInit() {
        this.getUtilization();        
    }
    getUtilization(): void {
        this.getdataservice.getData(links[5])
            .subscribe(res => {
                this.getdataservice.getData(links[0]).subscribe(activesource => {
                    let labelsArray = [];
                    let dataArray = [];
                    for (let a of activesource) {
                        for (let b of res) {
                            if (a.ID == b.ACTIVERESOURCE_ID) {
                                labelsArray.push(a.NAME);
                                dataArray.push(b.PERCENTAGE);
                            }
                        }
                    }
                    console.log(labelsArray);
                    console.log(dataArray);
                    return this.data = {
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
                    }
                })
            }, err => this.error = <any>err);
    }
}