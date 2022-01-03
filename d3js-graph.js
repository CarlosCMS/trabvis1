// const jsonData = require('../00 - datasets/data.json'); 
// console.log(jsonData);

// async function main() {
//   let app = new D3jsJson();
  
//   await app.loadJSON('../00 - datasets/data.json');
//   console.log(app)
// }

// main();

// const data3 = await require('../00 - datasets/data3.json');


// console.log(data3)
// md`${data.length} rows, ${Object.keys(data[0]).length} columns!`

function readTextFile(file, callback) {
  const rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
};

readTextFile('./data3.json', function(text){
const data3 = JSON.parse(text);
console.log(data3);
});

// const data3 = d3.json("../00 - datasets/data3.json", function(data) { 
//   console.log(data[0]); 
//  }); 

// const data3 = readTextFile('../00 - datasets/data3.json',JSON.parse(text))

// class D3jsJson {
//   constructor() {
//     this.circles = [];

//     this.x = [Infinity, -Infinity],
//     this.y = [Infinity, -Infinity],
//     this.w = 800;
//     this.h = 600;

//     this.createSvg();
//   }

// async loadJSON(file) {
//   this.circles = await d3.json(file);
//   this.circles = this.circles.map(d => {//função map atua sobre listas.  p/Cada elemento da lista defino uma função que transforma o elemento
//     return {
//       cx: +d.Sales,
//       cy: +d.Profit,
//       r: 2
//     }
//   ;

// };

// Testando datasets
const data1 = [
  {ser1: 0.3, ser2: 4},
  {ser1: 2, ser2: 16},
  {ser1: 3, ser2: 8}
];

const data2 = [
  {ser1: 1, ser2: 7},
  {ser1: 4, ser2: 1},
  {ser1: 6, ser2: 8}
];


// const data2 = await loadJSON('../00 - datasets/data3.json');

// const data2 = require('./data3.json'); 


const margin = {top: 10, right: 30, bottom: 30, left: 50},
   width = 460 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;


const svg = d3.select("#main")
 .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform", `translate(${margin.left},${margin.top})`);


const x = d3.scaleLinear().range([0,width]);
const xAxis = d3.axisBottom().scale(x);
svg.append("g")
 .attr("transform", `translate(0, ${height})`)
 .attr("class","myXaxis")


const y = d3.scaleLinear().range([height, 0]);
const yAxis = d3.axisLeft().scale(y);
svg.append("g")
 .attr("class","myYaxis")


function update(data) {

 // Create the X axis:
 x.domain([0, d3.max(data, function(d) { return d.ser1 }) ]);
 svg.selectAll(".myXaxis").transition()
   .duration(3000)
   .call(xAxis);

 // create the Y axis
 y.domain([0, d3.max(data, function(d) { return d.ser2  }) ]);
 svg.selectAll(".myYaxis")
   .transition()
   .duration(3000)
   .call(yAxis);


// Criar e atualizar as seleções para os novos dados
 const u = svg.selectAll(".lineTest")
   .data([data], function(d){ return d.ser1 });

 // Atualização da linha
 u
   .join("path")
   .attr("class","lineTest")
   .transition()
   .duration(3000)
   .attr("d", d3.line()
     .x(function(d) { return x(d.ser1); })
     .y(function(d) { return y(d.ser2); }))
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 2.5)
}



// testar com o dataset inicial
update(data1)


//testar depois com o vega lite:
// vl.markPoint()
//   .data(data2)
//   .encode(
//     vl.x().fieldQ('ser1'),
//     vl.y().fieldO('ser2')
//   )
//   .render()