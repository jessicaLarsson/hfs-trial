function barChart(data, div, h, w, max){
	var xScale = d3.scale.ordinal()
					.domain(d3.range(data.length))
					.rangeRoundBands([0, w], 0.05);

	var yScale = d3.scale.linear()
					.domain([0, max])
					.range([0, h]);

	//Create SVG element
	var svg = d3.select("#"+div)
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	//Create bars
	svg.selectAll("rect")
	   .data(data)
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
	   .attr("fill", "steelblue");

	//Create labels
	svg.selectAll("text")
	   .data(data)
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


	   this.update = function(data){
	   			//Update all rects
		svg.selectAll("rect")
		   .data(data)
		   .transition()
		   .attr("y", function(d) {
		   		return h - yScale(d);
		   })
		   .attr("height", function(d) {
		   		return yScale(d);
		   })
		   .attr("fill", "steelblue");

		//Update all labels
		svg.selectAll("text")
		   .data(data)
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