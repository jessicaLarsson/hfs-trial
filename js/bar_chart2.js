function barChart2(data, div, h, w, max){

	var color = ['#007F60', '#347F6D', '#00CC9A', '#007F4A', '#367F61'];
	var years = ['2009','2010','2011','2012','2013'];

	//var color = d3.scale.category20c();
	//console.log(color[0]);
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
	    .attr("fill", function(d, i){
            return (color[i]);
        })

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
	   		return h - yScale(d)-3;
	   });



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
		   .attr("fill", function(d, i){
            return (color[i]);
        	});

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
		   })

	   }

}