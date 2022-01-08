// Código para o gráfico de barras


// Acertando as dimensões das margens para o gráfico
const margin1 = {top: 10, right: 30, bottom: 40, left: 100},
    width1 = 460 - margin1.left - margin1.right,
    height1 = 450 - margin1.top - margin1.bottom;

// append para o objeto svg de barras
const svg2 = d3.select("#gbarra")
  .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform", `translate(${margin1.left},${margin1.top})`);

// Fazendo o Parse dos dados - Neste gráfico vou fazer uso do dataset carregado da web
d3.json("https://raw.githubusercontent.com/CarlosCMS/trabvis1/main/iris.json").then( function(data) {

// Eixo x
const x = d3.scaleBand()
  .range([ 0, width1 ])
  .domain(data.map(d => d.species))
  .padding(0.2);
svg2.append("g")
  .attr("transform", `translate(0,${height1})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Eixo y
const y = d3.scaleLinear()
  .domain([0, 12])
  .range([ height1, 0]);
svg2.append("g")
  .call(d3.axisLeft(y));

//Inserindo a label para o eixo y
svg2.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", -margin.left + 20)
.attr("x", -margin.top - height/2 + 100)
.text("Tamanho da Sépala em cm");  

// Barras
svg2.selectAll("mybar")
  .data(data)
  .join("rect")
    .attr("x", d => x(d.species))
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    .attr("height", d => height1 - y(0)) 
    .attr("y", d => +y(0))

// Animação
svg2.selectAll("rect")
  .transition()
  .duration(400)
  .attr("y", d => y(+d.sepalLength))
  .attr("height", d => height1 - y(d.sepalLength))
  .delay((d,i) => {console.log(i); return i*100})

})

// código para o gráfico Scatterplot
class Scatter {
    constructor(config) {
      this.config = config;
  
      this.svg = null;
      this.margins = null;
  
      this.xScale = null;
      this.yScale = null;
  
      this.circles = []
  
      this.createSvg();
      this.createMargins();
    }
  
    createSvg() {
      this.svg = d3.select(this.config.div)
        .append("svg")
        .attr('x', 10)
        .attr('y', 10)
        .attr('width', this.config.width + this.config.left + this.config.right)
        .attr('height', this.config.height + this.config.top + this.config.bottom)
        // .transition()
        // .duration(5000);
        
    }
  
    createMargins() {
      this.margins = this.svg
        .append('g')
        .attr("transform", `translate(${this.config.left},${this.config.top})`)
    }
  
    async loadJSON(file) {
      this.circles = await d3.json(file)
      
      this.circles = this.circles.map(d => {
        return {
          cx: +d.petalWidth,
          cy: +d.sepalLength,
          // col: d.species,
          // cat: d.species,
          r: 4
        }
      });
  
      this.circles = this.circles.slice(0, 1000);
    }
  
    createScales() {
      let xExtent = d3.extent(this.circles, d => {
        return d.cx;
      });
      let yExtent = d3.extent(this.circles, d => {
        return d.cy;
      });
      let colExtent = d3.extent(this.circles, d => {
        return d.col;
      });
  
      const cats = this.circles.map(d => {
        return d.cat;
      });
      let catExtent = d3.union(cats);
  
      this.xScale = d3.scaleLinear().domain(xExtent).nice().range([0, this.config.width]);
      this.yScale = d3.scaleLinear().domain(yExtent).nice().range([this.config.height, 0]);
  
      // this.colScale = d3.scaleSequential(d3.interpolateOrRd).domain(colExtent);
      // this.catScale = d3.scaleOrdinal().domain(catExtent).range(d3.schemeTableau10);
    }
  
    createAxis() {
      let xAxis = d3.axisBottom(this.xScale)
        .ticks(15);
  
      let yAxis = d3.axisLeft(this.yScale)
        .ticks(15);
  
      this.margins
        .append("g")
        .attr("transform", `translate(0,${this.config.height})`)
        .call(xAxis);
  
      this.margins
        .append("g")
        .call(yAxis);

        // Inserindo a label para o eixo x
      this.svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.left)
      .attr("y", height + margin.top + 320)
      .text("Tamanho da Pétala em cm");

       //Inserindo a label para o eixo y
      this.svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 100)
      .attr("x", -margin.top - height/2 + 50)
      .text("Tamanho da Sépala em cm");

    }
     renderCircles() {
        this.margins.selectAll('circle')
        .data(this.circles)
        .join('circle')
        .attr('cx', d => this.xScale(d.cx))
        .attr('cy', d => this.yScale(d.cy))
        .attr('r' , d => d.r)
        
        // .attr('fill', d => this.colScale(d.col));
        // .attr('fill', d => this.catScale(d.cat));
    }
      //  anima() {
      //   this.svg.selectAll('circle')
      //   .transition()
      //   .duration(4000)
      //   .attr('cy', d => this.yScale(+d.cy))
      //   .delay((d,i) => {console.log(i); return i*100})
      //  }
}



// Código para o gráfico de linha 

// Primeiro foi testado um dataset simples
// const data1 = [
//   {Id: 0.3, SepalLengthCm: 4},
//   {Id: 2, SepalLengthCm: 16},
//   {Id: 3, SepalLengthCm: 8}
// ];


// Acertando as dimensões das margens para o gráfico
const margin = {top: 10, right: 30, bottom: 40, left: 70},
   width = 900 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;


const svg = d3.select("#glinha")
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

// Inserindo a label para o eixo x
svg.append("text")
.attr("text-anchor", "end")
.attr("x", width/2 + margin.left)
.attr("y", height + margin.top + 20)
// 
.text("Identificador das Amostras");


const y = d3.scaleLinear().range([height, 0]);
const yAxis = d3.axisLeft().scale(y);
svg.append("g")
 .attr("class","myYaxis")

 //Inserindo a label para o eixo y
 svg.append("text")
 .attr("text-anchor", "end")
 .attr("transform", "rotate(-90)")
 .attr("y", -margin.left + 20)
 .attr("x", -margin.top - height/2 + 100)
 .text("Tamanho da Pétala em cm");


function update(data) {

 // Criando o eixo x:
 x.domain([0, 150]);
 svg.selectAll(".myXaxis").transition()
   .duration(3000)
   .call(xAxis);

 // Criando o eixo x:
 y.domain([0, d3.max(data, function(d) { return d.PetalLengthCm}) ]);
 svg.selectAll(".myYaxis")
   .transition()
   .duration(3000)
   .call(yAxis);


// Criar e atualizar as seleções para os novos dados
 const u = svg.selectAll(".lineTest")
   .data([data], function(d){ return d.Id });

 // Atualização da linha
 u
   .join("path")
   .attr("class","lineTest")
   .transition()
   .duration(3000)
   .attr("d", d3.line()
     .x(function(d) { return x(d.Id); })
     .y(function(d) { return y(d.PetalLengthCm); }))
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 2.5)
}




async function main() {
    let c = {div: '#gscatter', width: 800, height: 600, top: 30, left: 100, bottom: 50, right: 30};
    
    let a = new Scatter(c);
    await a.loadJSON('../dados/iris.json');
    
    a.createScales();
    a.createAxis();
    a.renderCircles();
    // a.Anima();
    

  
    data3 = await d3.csv ('../dados/Iris-setosa.csv', d => {
      return {
          Id: d.Id,
          PetalLengthCm: d.PetalLengthCm
    
      }
    
  });

  data4 = await d3.csv ('../dados/Iris-versicolor.csv', d => {
    return {
        Id: d.Id,
        PetalLengthCm: d.PetalLengthCm
  
    }
  
});

data5 = await d3.csv ('../dados/Iris-virginica.csv', d => {
  return {
      Id: d.Id,
      PetalLengthCm: d.PetalLengthCm

  }

});
    data2 = await d3.csv ('../dados/iris.csv', d => {
        return {
            Id: d.Id,
            PetalLengthCm: d.PetalLengthCm
      
        }
      
    });

    update(data2)
  }
  
  main();



