function energy() {

	/* Energy PieChart, riket, summa förbrukningskategori, 2013 från energyUsageHouses.csv */
	var data = [{"label":"småhus", "value":42072179}, 
                      {"label":"flerbostadshus", "value":31613186}, 
                      {"label":"fritidshus", "value":2964083}];

    var w = 200;
	var h = 200;
	var r = h/2;
	var color = d3.scale.category20c();

    var vis = d3.select('#energy_pie_chart')
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




	var region_data;

	d3.csv("data/energyUsageHouses.csv", function(error, regions) {
		if (error) throw error;
		region_data = regions;

		region_data = d3.map();
		regions.forEach(function(d) {  
			region_data.set(d.region, d);
			


		}) 

		draw();
	});
	

	function draw() {
		console.log(region_data.get("Riket"));
	
	}

}