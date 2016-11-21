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
var ActiveResourceTaskComponent = (function () {
    function ActiveResourceTaskComponent() {
    }
    ActiveResourceTaskComponent.prototype.ngOnInit = function () {
        this.nodes = new vis.DataSet([
            { id: 1, value: 3, label: 'Thomas', shape: 'dot' },
            { id: 2, value: 4, label: 'Tom', shape: 'square' },
        ]);
        var newnode = { id: 3, value: 2, label: 'Minh', shape: 'diamond' };
        console.log(this.nodes);
        console.log(newnode);
        this.nodes.add(newnode);
        this.nodes.update([{ id: 3, color: { background: 'white' } }]);
        this.edges = new vis.DataSet([
            { from: 1, to: 2 },
            { from: 2, to: 3 }
        ]);
        var options = {
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
            }
        };
        var data = {
            nodes: this.nodes,
            edges: this.edges
        };
        var timeline = new vis.Network(document.getElementById('mynetwork'), data, options);
    };
    ActiveResourceTaskComponent.prototype.addNode = function () {
        try {
            var popup = document.getElementById('myPopup');
            if (document.getElementById('node-id').value !== '') {
                this.nodes.add({
                    id: document.getElementById('node-id').value,
                    label: document.getElementById('node-label').value,
                    shape: document.getElementById('node-shape').value.toLowerCase()
                });
                popup.classList.toggle('hidden');
            }
            else {
                popup.classList.toggle('show');
            }
            console.log(document.getElementById('node-shape').value.toLowerCase());
        }
        catch (err) {
            alert(err);
        }
    };
    ActiveResourceTaskComponent.prototype.updateNode = function () {
        try {
            console.log(this.nodes.get(document.getElementById('node-id').value));
            if (this.nodes.get(document.getElementById('node-id').value) !== null) {
                this.nodes.update({
                    id: document.getElementById('node-id').value,
                    label: document.getElementById('node-label').value,
                    shape: document.getElementById('node-shape').value.toLowerCase()
                });
            }
            else {
                alert('This node does not exist yet');
            }
            ;
            console.log(this.nodes);
        }
        catch (err) {
            alert(err);
        }
    };
    ActiveResourceTaskComponent.prototype.removeNode = function () {
        try {
            if (this.nodes.get(document.getElementById('node-id').value) !== null) {
                this.nodes.remove({
                    id: document.getElementById('node-id').value,
                });
            }
            else {
                alert('You cannot delete an unexist node');
            }
        }
        catch (err) {
            alert(err);
        }
    };
    ActiveResourceTaskComponent.prototype.addEdge = function () {
        try {
            this.edges.add({
                id: document.getElementById('edge-id').value,
                from: document.getElementById('edge-from').value,
                to: document.getElementById('edge-to').value,
                arrows: 'to'
            });
        }
        catch (err) {
            alert(err);
        }
    };
    ActiveResourceTaskComponent.prototype.updateEdge = function () {
        try {
            this.edges.update({
                id: document.getElementById('edge-id').value,
                from: document.getElementById('edge-from').value,
                to: document.getElementById('edge-to').value,
                arrows: 'to'
            });
        }
        catch (err) {
            alert(err);
        }
    };
    ActiveResourceTaskComponent.prototype.removeEdge = function () {
        try {
            this.edges.remove({ id: document.getElementById('edge-id').value });
        }
        catch (err) {
            alert(err);
        }
    };
    ActiveResourceTaskComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'active-resource-task',
            templateUrl: 'activeresourcetask.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ActiveResourceTaskComponent);
    return ActiveResourceTaskComponent;
}());
exports.ActiveResourceTaskComponent = ActiveResourceTaskComponent;
//# sourceMappingURL=activeresourcetask.component.js.map