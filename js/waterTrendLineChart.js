function waterTrendLineChart(data) {
	var m = [10, 80, 80, 80]; // margins
	var w = $("#water_trend").width(); // width
	var h = 200; // height

	var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
	var y = d3.scale.linear().domain([0, 100000]).range([h, 0]);

	var line = d3.svg.line()
		.x(function(d,i) { return x(i);})
		.y(function(d) { return y(d);})

	 	// Add an SVG element with the desired dimensions and margin
		var graph = d3.select("#water_trend").append("svg:svg")
		      .attr("width", w + m[1] + m[3])
		      .attr("height", h + m[0] + m[2])
		      .append("svg:g")
		      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

		graph.append("svg:g")
		      .attr("class", "x axis label_fix")
		      .attr("transform", "translate(0," + h + ")");


	 	var yAxisLeft = d3.svg.axis().scale(y).ticks(5).orient("left");

		graph.append("svg:g")
		      .attr("class", "y axis")
		      .attr("transform", "translate(-25,0)")
		      .call(yAxisLeft);
		
		graph.append("svg:path")
			.attr("d", line(data))
			.attr("class", "line_graph_path");



		var label1 = d3.select(".label_fix")
					.append("g")
					.attr("class", "tick")
					.attr("transform", "translate(0, 0)");

				label1.append("text")
					.attr("dy", ".71em")
					.attr("y", 4)
					.attr("x", 0)
					.attr("style", "text-anchor: middle;")
					.text(1995);

				label1.append("line")
					.attr("y2", 5)
					.attr("x2", 0)
					.attr("style", "stroke:rgb(0,0,0);")

		var label2 = d3.select(".label_fix")
					.append("g")
					.attr("class", "tick")
					.attr("transform", "translate(90, 0)");

				label2.append("text")
					.attr("dy", ".71em")
					.attr("y", 4)
					.attr("x", 0)
					.attr("style", "text-anchor: middle;")
					.text(2000);

				label2.append("line")
					.attr("y2", 5)
					.attr("x2", 0)
					.attr("style", "stroke:rgb(0,0,0);")

		var label3 = d3.select(".label_fix")
					.append("g")
					.attr("class", "tick")
					.attr("transform", "translate(180, 0)");
					
				label3.append("text")
					.attr("dy", ".71em")
					.attr("y", 4)
					.attr("x", 0)
					.attr("style", "text-anchor: middle;")
					.text(2005);

				label3.append("line")
					.attr("y2", 5)
					.attr("x2", 0)
					.attr("style", "stroke:rgb(0,0,0);")

		var label4 = d3.select(".label_fix")
					.append("g")
					.attr("class", "tick")
					.attr("transform", "translate(270, 0)");

				label4.append("text")
					.attr("dy", ".71em")
					.attr("y", 4)
					.attr("x", 0)
					.attr("style", "text-anchor: middle;")
					.text(2010);

				label4.append("line")
					.attr("y2", 5)
					.attr("x2", 0)
					.attr("style", "stroke:rgb(0,0,0);")

}
			