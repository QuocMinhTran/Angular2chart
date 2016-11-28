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
        //this.destroy();
        this.nodes = new vis.DataSet([
            { id: 1, value: 3, label: 'Thomas', shape: 'dot', group: 0 },
            { id: 2, value: 4, label: 'Tom', shape: 'square', group: 1 },
        ]);
        let newnode = { id: 3, value: 2, label: 'Minh', shape: 'diamond', group: 1, size: 200 };
        console.log(this.nodes);
        console.log(newnode);
        this.nodes.add(newnode);
        this.nodes.update([{ id: 3, color: { background: 'white' } }]);
        this.edges = new vis.DataSet([
            { id: 1, from: 1, to: 2 },
            { id: 2, from: 2, to: 3 }
        ])
        let options = {
            layout: { randomSeed: 2 },
            physics: false,
            nodes: {
                font: {
                    size: 12,
                    face: 'Times New Roman'
                }
            },
            edges: {
                color: { inherit: true },
                width: 1,
                smooth: {
                    type: 'straightCross',
                    roundness: 0
                }
            },
            manipulation: {
                addEdge(data, callback) {
                    if (data.from == data.to) {
                        var r = confirm('Do you want to connect the node to itself?');
                        if (r == true) {
                            callback(data);
                        }
                    } else {
                        callback(data);
                    }
                },
                /*addNode: function (data, callback) {
                    // filling in the popup DOM elements
                    document.getElementById('operation').innerHTML = "Add Node";
                    (<HTMLInputElement>document.getElementById('node-id')).value = data.id;
                    (<HTMLInputElement>document.getElementById('node-label')).value = data.label;
                    document.getElementById('saveButton').addEventListener('click', function () {
                        data.id = (<HTMLInputElement>document.getElementById('node-id')).value;
                        data.label = (<HTMLInputElement>document.getElementById('node-label')).value;
                        document.getElementById('saveButton').onclick = null;
                        document.getElementById('cancelButton').onclick = null;
                        document.getElementById('network-popUp').style.display = 'none';
                        callback(data);
                    });
                    document.getElementById('cancelButton').addEventListener('click', function () {
                        document.getElementById('saveButton').onclick = null;
                        document.getElementById('cancelButton').onclick = null;
                        document.getElementById('network-popUp').style.display = 'none';
                    });//cannot bind
                    document.getElementById('network-popUp').style.display = 'block';
                },
                editNode: function (data, callback) {
                    // filling in the popup DOM elements
                    document.getElementById('operation').innerHTML = "Edit Node";
                    (<HTMLInputElement>document.getElementById('node-id')).value = data.id;
                    (<HTMLInputElement>document.getElementById('node-label')).value = data.label;
                    document.getElementById('saveButton').onclick = this.saveData.bind(this, data, callback);
                    document.getElementById('cancelButton').onclick = this.cancelEdit.bind(this, callback);
                    document.getElementById('network-popUp').style.display = 'block';
                },*/
            }
        };
        let data = {
            nodes: this.nodes,
            edges: this.edges
        };
        this.network = new vis.Network(document.getElementById('mynetwork'), data, options);
        this.network.on("selectNode",function(params){
            //let nodeInfo = JSON.stringify(params,null,4);
            console.log(params);
            
            //console.log(nodeInfo);
            (<HTMLInputElement>document.getElementById('node-id')).value = params.nodes;
            (<HTMLInputElement>document.getElementById('node-label')).value = '';
            (<HTMLInputElement>document.getElementById('node-shape')).value='';
        });
        this.network.on("selectEdge",function(params){
            //let nodeInfo = JSON.stringify(params,null,4);
            console.log(params);
            
            //console.log(nodeInfo);
            (<HTMLInputElement>document.getElementById('edge-id')).value = params.edges;
            (<HTMLInputElement>document.getElementById('edge-from')).value = '';
            (<HTMLInputElement>document.getElementById('edge-to')).value='';
        })
        /*function saveData(data, callback) {
            data.id = (<HTMLInputElement>document.getElementById('node-id')).value;
            data.label = (<HTMLInputElement>document.getElementById('node-label')).value;
            this.clearPopUp();
            callback(data);
        };
        function clearPopUp() {
            document.getElementById('saveButton').onclick = null;
            document.getElementById('cancelButton').onclick = null;
            document.getElementById('network-popUp').style.display = 'none';
        };
        function cancelEdit(callback) {
            this.clearPopUp();
            callback(null);
        }*/
    };
    addNode() {
         try {
             var popup = document.getElementById('myPopup');
             if ((<HTMLInputElement>document.getElementById('node-id')).value != '') {
                 this.nodes.add({
                     id: (<HTMLInputElement>document.getElementById('node-id')).value,
                     label: (<HTMLInputElement>document.getElementById('node-label')).value,
                     shape: (<HTMLInputElement>document.getElementById('node-shape')).value.toLowerCase(),
                     x:0,
                     y:0
 
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