function pieChart() {

var w = 400;
var h = 400;
var r = h/2;
var color = d3.scale.category20c();



    //data from SCB, from the data/waterUseSweden.csv file
    var data = [{"label":"hushåll", "value":575640}, 
                      {"label":"jordbruk", "value":98782}, 
                      {"label":"industri", "value":2261856},
                      {"label": "övrigt använding", "value":303298}];

    var vis = d3.select('#water_pie_chart')
                .append("svg:svg").data([data])
                .attr("width", w).attr("height", h)
                .append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
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
            return arc(d);
        });

    // add the text
    arcs.append("svg:text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
        return data[i].label;});

}


