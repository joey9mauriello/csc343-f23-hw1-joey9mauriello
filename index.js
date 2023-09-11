// index.js
const fs = require("fs");

class GraphClass {
  constructor() {
    this.graph = {
      nodes: [],
      edges: [],
      nodeDegrees: {}
    };
    this.degreeHistogram = {};
  }

  addEdge(source, target) {
    edges.push([source, target]);
    nodeDegrees[source] = nodeDegrees[source] + 1;
    nodeDegrees[target] = nodeDegrees[target] + 1;
  }

  readGraphFromJSON(filePath) {
    let data = require('./'+filePath);
    var givenNodes = data['nodes'];
    var givenLinks = data['links'];
    for (var i = 0; i < givenNodes.length; i++) {
      this.graph.nodes.push(givenNodes[i]);
      this.graph.nodeDegrees[givenNodes[i]['id']] = 0;
    }
    this.graph.edges = givenLinks;
  }

  writeGraphToJSON(filePath) {
    var data = {"directed": false,
  "multigraph": false,
  "graph": {},
  "nodes": [],
  "links": []};
    data["graph"] = this.degreeHistogram;
    data["nodes"] = this.graph["nodes"];
    data["links"] = this.graph["edges"];
    fs.writeFileSync(filePath, JSON.stringify(data));
  }

  writeDegreeToJSON() {
    fs.writeFileSync("degrees.json", JSON.stringify(this.degreeHistogram));
  }

  computeDegree(node) {
    for (var i = 0; i < this.graph.edges.length; i++) {
      var edge = this.graph.edges[i];
      if (edge['source'] == node || edge['target'] == node) {
        this.graph.nodeDegrees[node] = this.graph.nodeDegrees[node] + 1;
      }
    }
  }

  addNodeDegreesAsAttributes() {
    for (var i = 0; i < this.graph.nodes.length; i++) {
      this.computeDegree(this.graph.nodes[i]["id"]);
      this.graph.nodes[i]["degree"] = this.graph.nodeDegrees[this.graph.nodes[i]["id"]];
    }
   

  }

  calculateDegreeHistogram() {
    
    for (var i = 0; i < this.graph.nodes.length; i++) {
      var node = this.graph.nodes[i]["id"];
      var degree = this.graph.nodeDegrees[node];
      if (degree in this.degreeHistogram) {
        this.degreeHistogram[degree] = this.degreeHistogram[degree]+1;
      }
      else {
        this.degreeHistogram[degree] = 1;
      }
    }
  }

  displayHistogram() {
    const max = Math.max(...Object.values(this.degreeHistogram));
    const svg = document.getElementById('histogram');
    const barHeight = 20;
    const barWidthScale = 200/max;
    let yPosition = 10;

    for (const [label, value] of Object.entries(this.degreeHistogram)) {
      const rect = document.createElemnetNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', '10');
      rect.setAttribute('y', yPosition);
      rect.setAttribute('width', value * barWidthScale);
      rect.setAttribute('height', barHeight);
      rect.setAttribute('fill', 'blue');
      svg.appendChild(rect);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '220');
      text.setAttribute('y', yPosition + barHeight / 2);
      text.setAttribute('font-size', '12');
      text.setAttribute('fill', 'black');
      text.textContent = label;
      svg.appendChild(text);

      yPosition += 30;
    }
  
  }


  
}

module.exports = GraphClass;

//const graphClass = new GraphClass();
//graphClass.changeName();
//graphClass.readGraphFromJSON('test_data.json');
//graphClass.addNodeDegreesAsAttributes();
//graphClass.calculateDegreeHistogram();

// Example usage

//graphClass.addNodeDegreesAsAttributes();
//graphClass.calculateDegreeHistogram();
//graphClass.displayHistogram();
//graphClass.readGraphFromJSON('imdb_data.json');


