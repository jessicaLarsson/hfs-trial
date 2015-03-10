// var margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// var x = d3.scale.ordinal()
//     .rangeRoundBands([0, width], .1);

// var y = d3.scale.linear()
//     .range([height, 0]);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .ticks(10, "%");

// var svg = d3.select("#section3").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.csv("data/transport.csv", type, function(error, data) {
//   x.domain(data.map(function(d) { return d.Län; }));
//   y.domain([0, d3.max(data, function(d) { return d.ProcentuellAndelMiljöbilar; })]);

//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);

//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("ProcentuellAndelMiljöbilar");

//   svg.selectAll(".bar")
//       .data(data)
//     .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", function(d) { return x(d.Län); })
//       .attr("width", x.rangeBand())
//       .attr("y", function(d) { return y(d.ProcentuellAndelMiljöbilar); })
//       .attr("height", function(d) { return height - y(d.ProcentuellAndelMiljöbilar); });

// });

// function type(d) {
//   d.ProcentuellAndelMiljöbilar = +d.ProcentuellAndelMiljöbilar;
//   return d;
// }


var w = 400;
var h = 400;
var r = h/2;
var color = d3.scale.category20c();

// var data = [{"label":"Category A", "value":20}, 
//                   {"label":"Category B", "value":50}, 
//                   {"label":"Category C", "value":30}];

// console.log("data = " + data);

var data = d3.csv("data/transport.csv")
    .row(function(d) { return {key: d.Län, value: +d.ProcentuellAndelMiljöbilar}; })
    .get(function(error, rows) { console.log(rows); });

//var data = d3.csv("data/transport.csv");
var vis = d3.select('#section3')
            .append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r + "," + r + ")");
var pie = d3.layout.pie().value(function(d){return d.value;});

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d", function (d) {
        // log the result of the arc generator to show how cool it is :)
        console.log(arc(d));
        return arc(d);
    });

// add the text
arcs.append("svg:text").attr("transform", function(d){
            d.innerRadius = 0;
            d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    return data[i].key;}
        );

