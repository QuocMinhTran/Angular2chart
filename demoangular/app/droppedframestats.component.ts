import { Component, ElementRef, OnInit } from '@angular/core';
import { GetDataService } from './getdata.service';

import { links } from './links';
declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'my-dropped-frame',
    templateUrl: 'droppedframestats.html',
    providers: [GetDataService]
})
export class DroppedFrameStatsComponent implements OnInit {
    error: any;
    constructor(private getdataservice: GetDataService) { }
    ngOnInit() {        
        this.getdataservice.getData(links[5])
            .subscribe(res => {
                this.getdataservice.getData(links[0]).subscribe(activesource => {
                    let labelsArray = [];
                    let dataArray = [];
                    let data = new google.visualization.DataTable();
                    data.addColumn('string', 'NAME');
                    data.addColumn('number', 'PERCENTAGE');
                    for (let a of activesource) {
                        for (let b of res) {
                            if (a.ID == b.ACTIVERESOURCE_ID) {
                                // labelsArray.push(a.NAME);
                                // dataArray.push(b.PERCENTAGE);
                                data.addRow([a.NAME, b.PERCENTAGE]);
                            }
                        }
                    }

                    let options = {
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
                    let chart = new google.charts.Bar(document.getElementById('top_x_div'));
                    chart.draw(data, google.charts.Bar.convertOptions(options));
                    // console.log(labelsArray);
                    // console.log(dataArray);                    
                })
            }, err => this.error = <any>err);
    }
}