function transportation(){

	//read data, green cars, number of cars etc
	d3.csv("data/greenCars.csv", function(error, counties) {
		if (error) throw error;
		green_cars_data = d3.map();
		counties.forEach(function(d) { green_cars_data.set(d.Län, d); });
	});

	d3.csv("data/drivenDistance.csv", function(error, counties) {
		if (error) throw error;
		driven_distance_data = d3.map();
		counties.forEach(function(d) { driven_distance_data.set(d.Län, d); });
	});

	var driven_distance_div = "driven_distance";

	var barDiv = $("#"+driven_distance_div);
	var h = 400;
	var w = barDiv.width();

	var dataset = [1209,1192,1170,1152,1130]; //fullösning, Statisk data sthlm

	var xScale = d3.scale.ordinal()
					.domain(d3.range(dataset.length))
					.rangeRoundBands([0, w], 0.05);

	var yScale = d3.scale.linear()
					.domain([0, 1281])
					.range([0, h]);

	//Create SVG element
	var svg = d3.select("#"+driven_distance_div)
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	//Create bars
	svg.selectAll("rect")
	   .data(dataset)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) {
	   		return xScale(i);
	   })
	   .attr("y", function(d) {
	   		return h - yScale(d);
	   })
	   .attr("width", xScale.rangeBand())
	   .attr("height", function(d) {
	   		return yScale(d);
	   })
	   .attr("fill", function(d) {
			return "rgb(0, 0, " + (d * 10) + ")";
	   });

	//Create labels
	svg.selectAll("text")
	   .data(dataset)
	   .enter()
	   .append("text")
	   .text(function(d) {
	   		return d;
	   })
	   .attr("text-anchor", "middle")
	   .attr("x", function(d, i) {
	   		return xScale(i) + xScale.rangeBand() / 2;
	   })
	   .attr("y", function(d) {
	   		return h - yScale(d) + 14;
	   })
	   .attr("font-family", "sans-serif")
	   .attr("font-size", "11px")
	   .attr("fill", "white");


	this.update = function(c){
		var green_cars_value = green_cars_data.get(c);
		countTo("nr_of_cars", green_cars_value.AntalPersonbilarIlänet, 1200, false);
		countTo("green_cars", green_cars_value.ProcentuellAndelMiljöbilar, 1200, true);

		var distance_value = driven_distance_data.get(c);	

		//New values for dataset
		var dataset = [distance_value[2009], distance_value[2010], distance_value[2011], distance_value[2012], distance_value[2013]];

		//Update all rects
		svg.selectAll("rect")
		   .data(dataset)
		   .transition()
		   .attr("y", function(d) {
		   		return h - yScale(d);
		   })
		   .attr("height", function(d) {
		   		return yScale(d);
		   })
		   .attr("fill", function(d) {
				return "rgb(0, 0, " + (d * 10) + ")";
		   });

		//Update all labels
		svg.selectAll("text")
		   .data(dataset)
		   .text(function(d) {
		   		return d;
		   })
		   .attr("x", function(d, i) {
		   		return xScale(i) + xScale.rangeBand() / 2;
		   })
		   .attr("y", function(d) {
		   		return h - yScale(d) + 14;
		   });
						   						
	}
}