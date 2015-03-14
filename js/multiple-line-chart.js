function multipleLineChart(d, d1) {
	console.log("jfiejhfijefjejfiejfek");

	var m = [80, 80, 80, 80]; // margins
	var w = 400 // width
	var h = 300; // height

	//data = [parseInt(d[2009]), parseInt(d[2010]), parseInt(d[2011]), parseInt(d[2012]), parseInt(d[2013])];
	data = [parseInt(d1[2009]), parseInt(d1[2010]), parseInt(d1[2011]), parseInt(d1[2012]), parseInt(d1[2013])];

	var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
	var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

	var line = d3.svg.line()
		.x(function(d,i) { return x(i);})
		.y(function(d) { return y(d);})

	 	// Add an SVG element with the desired dimensions and margin
		var graph = d3.select("#energy_consumtion").append("svg:svg")
		      .attr("width", w + m[1] + m[3])
		      .attr("height", h + m[0] + m[2])
		      .append("svg:g")
		      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

	 	// create yAxis
	 	var xAxis = d3.svg.axis().scale(x).tickSize(5).tickSubdivide(true);

		graph.append("svg:g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + h + ")")
		      .call(xAxis);


	 	var yAxisLeft = d3.svg.axis().scale(y).ticks(5).orient("left");

		graph.append("svg:g")
		      .attr("class", "y axis")
		      .attr("transform", "translate(-25,0)")
		      .call(yAxisLeft);
		
		graph.append("svg:path")
			.attr("d", line(data))
			.attr("class", "line_graph_path");

		// graph.append("svg:path")
		// 	.attr("d", line(data1))
		// 	.attr("class", "line_graph_path");

	this.update = function(data){
		
		var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
		var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

	    // Select the section we want to apply our changes to
	    var svg = d3.select("#water_trend").transition();

    	// Make the changes
        svg.select(".line_graph_path")   // change the line
            .duration(750)
            .attr("d", line(data));
        svg.select(".x axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y axis") // change the y axis
            .duration(750)
            .call(yAxisLeft);

	   
	}

}
			