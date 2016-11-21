import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

declare let vis: any;
@Component({
    moduleId: module.id,
    selector: 'active-resource-task',
    templateUrl: 'activeresourcetask.html'
})
export class ActiveResourceTaskComponent {
    nodes: any;
    edges: any;
    network: any;

    ngOnInit() {
        this.nodes = new vis.DataSet([
            { id: 1, value: 3, label: 'Thomas', shape: 'dot' },
            { id: 2, value: 4, label: 'Tom', shape: 'square' },
        ]);
        let newnode = { id: 3, value: 2, label: 'Minh', shape: 'diamond' };
        console.log(this.nodes);
        console.log(newnode);
        this.nodes.add(newnode);
        this.nodes.update([{ id: 3, color: { background: 'white' } }]);
        this.edges = new vis.DataSet([
            { from: 1, to: 2 },
            {from :2, to :3}
        ])
        let options = {
            physics: false,
            nodes: {
                font: {
                    size: 12,
                    face: 'Times New Roman'
                }
            },
            edges:{
                color:{inherit:true},
                width:1,
                smooth:{
                    type:'straightCross',
                    roundness:0
                }
            }
        };
        let data = {
            nodes: this.nodes,
            edges: this.edges
        }
        let timeline = new vis.Network(document.getElementById('mynetwork'), data, options);
    }
    addNode() {
        try {
            var popup = document.getElementById('myPopup');
            if ((<HTMLInputElement>document.getElementById('node-id')).value !== '') {
                this.nodes.add({
                    id: (<HTMLInputElement>document.getElementById('node-id')).value,
                    label: (<HTMLInputElement>document.getElementById('node-label')).value,
                    shape: (<HTMLInputElement>document.getElementById('node-shape')).value.toLowerCase()

                });
                popup.classList.toggle('hidden');
            } else {
                popup.classList.toggle('show');
            }
            console.log((<HTMLInputElement>document.getElementById('node-shape')).value.toLowerCase())
        }
        catch (err) {
            alert(err);
        }
    }
    updateNode() {
        try {
            console.log(this.nodes.get((<HTMLInputElement>document.getElementById('node-id')).value))
            if (this.nodes.get((<HTMLInputElement>document.getElementById('node-id')).value) !== null) {
                this.nodes.update({
                    id: (<HTMLInputElement>document.getElementById('node-id')).value,
                    label: (<HTMLInputElement>document.getElementById('node-label')).value,
                    shape: (<HTMLInputElement>document.getElementById('node-shape')).value.toLowerCase()
                })
            } else { alert('This node does not exist yet') };
            console.log(this.nodes);
        }
        catch (err) {
            alert(err);
        }
    }
    removeNode() {
        try {
            if (this.nodes.get((<HTMLInputElement>document.getElementById('node-id')).value) !== null) {
                this.nodes.remove({
                    id: (<HTMLInputElement>document.getElementById('node-id')).value,
                })
            } else {
                alert('You cannot delete an unexist node')
            }
        }
        catch (err) {
            alert(err);
        }
    }
    addEdge() {
        try {
            this.edges.add({
                id: (<HTMLInputElement>document.getElementById('edge-id')).value,
                from: (<HTMLInputElement>document.getElementById('edge-from')).value,
                to: (<HTMLInputElement>document.getElementById('edge-to')).value,
                arrows: 'to'
            });
        }
        catch (err) {
            alert(err);
        }
    }
    updateEdge() {
        try {
            this.edges.update({
                id: (<HTMLInputElement>document.getElementById('edge-id')).value,
                from: (<HTMLInputElement>document.getElementById('edge-from')).value,
                to: (<HTMLInputElement>document.getElementById('edge-to')).value,
                arrows: 'to'
            });
        }
        catch (err) {
            alert(err);
        }
    }
    removeEdge() {
        try {
            this.edges.remove({ id: (<HTMLInputElement>document.getElementById('edge-id')).value });
        }
        catch (err) {
            alert(err);
        }
    }
}