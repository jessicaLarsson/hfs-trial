function pieChart() {

var w_div= "#water_pie_chart";
var w = $(w_div).width();
var h = w;
var r = h/2;

var color = ["#56A3BF", "#3A6D7F", "#73DAFF","#1D3640", "#68C4E5"];

    //data from SCB, from the data/waterUseSweden.csv file
    var data = [{"label":"hushåll", "value":575640}, 
                      {"label":"jordbruk", "value":98782}, 
                      {"label":"industri", "value":2261856},
                      {"label": "övrigt använding", "value":303298}];

    var vis = d3.select(w_div)
                .append("svg:svg").data([data])
                .attr("width", w).attr("height", h)
                .append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
    
    var pie = d3.layout.pie().value(function(d){return d.value;});

    // declare an arc generator function
    var arc = d3.svg.arc()
    .outerRadius(r * 0.8)
    .innerRadius(r * 0.4);

    // select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
    arcs.append("svg:path")
        .attr("fill", function(d, i){
            return color[i];
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


