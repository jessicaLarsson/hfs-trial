function multipleLineChart(d) {

	d3.select("#energy_consumtion").selectAll("*").remove();

	var m = [80, 80, 80, 80]; // margins
	var w = 400 // width
	var h = 300; // height

	var m1 = 0;
	
	for(var i = 0; i<4; i++){
		for (var j=2009; j<2014; j++){
			if(parseInt(d[i][j]) > parseInt(m1)) {
				m1 = parseInt(d[i][j]);
			}
		}
	}

	data1 = [parseInt(d[0][2009]), parseInt(d[0][2010]), parseInt(d[0][2011]), parseInt(d[0][2012]), parseInt(d[0][2013])];
	data2 = [parseInt(d[1][2009]), parseInt(d[1][2010]), parseInt(d[1][2011]), parseInt(d[1][2012]), parseInt(d[1][2013])];
	data3 = [parseInt(d[2][2009]), parseInt(d[2][2010]), parseInt(d[2][2011]), parseInt(d[2][2012]), parseInt(d[2][2013])];
	data4 = [parseInt(d[3][2009]), parseInt(d[3][2010]), parseInt(d[3][2011]), parseInt(d[3][2012]), parseInt(d[3][2013])];


	var x = d3.scale.linear().domain([0, data1.length]).range([0, w]);
	var y = d3.scale.linear().domain([0, parseInt(m1)]).range([h, 0]);

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
		      .attr("id", "label_fix")
		      .attr("transform", "translate(0," + h + ")");


	 	var yAxisLeft = d3.svg.axis().scale(y).ticks(5).orient("left");

		graph.append("svg:g")
		      .attr("class", "y axis")
		      .attr("transform", "translate(-25,0)")
		      .call(yAxisLeft);
		
		graph.append("svg:path")
			.attr("d", line(data1))
			.attr("class", "line_graph_path line_1")
			.attr("id", "red1");

		graph.append("svg:path")
			.attr("d", line(data2))
			.attr("class", "line_graph_path line_2")
			.attr("id", "red2");

		graph.append("svg:path")
			.attr("d", line(data3))
			.attr("class", "line_graph_path line_3")
			.attr("id", "red3");

		graph.append("svg:path")
			.attr("d", line(data4))
			.attr("class", "line_graph_path line_4")
			.attr("id", "red4");



      var label1 = d3.select("#label_fix")
					.append("g")
					.attr("class", "tick")
					.attr("transform", "translate(0, 0)");

				label1.append("text")
					.attr("dy", ".71em")
					.attr("y", 4)
					.attr("x", 0)
					.attr("style", "text-anchor: middle;")
					.text(2009);

				label1.append("line")
					.attr("y2", 5)
					.attr("x2", 0)
					.attr("style", "stroke:rgb(0,0,0);")

		var label2 = d3.select("#label_fix")
					.append("g")
					.attr("class", "tick")
					.attr("transform", "translate(80, 0)");

				label2.append("text")
					.attr("dy", ".71em")
					.attr("y", 4)
					.attr("x", 0)
					.attr("style", "text-anchor: middle;")
					.text(2010);

				label2.append("line")
					.attr("y2", 5)
					.attr("x2", 0)
					.attr("style", "stroke:rgb(0,0,0);")

		var label3 = d3.select("#label_fix")
					.append("g")
					.attr("class", "tick")
					.attr("transform", "translate(160, 0)");
					
				label3.append("text")
					.attr("dy", ".71em")
					.attr("y", 4)
					.attr("x", 0)
					.attr("style", "text-anchor: middle;")
					.text(2011);

				label3.append("line")
					.attr("y2", 5)
					.attr("x2", 0)
					.attr("style", "stroke:rgb(0,0,0);")

		var label4 = d3.select("#label_fix")
					.append("g")
					.attr("class", "tick")
					.attr("transform", "translate(240, 0)");

				label4.append("text")
					.attr("dy", ".71em")
					.attr("y", 4)
					.attr("x", 0)
					.attr("style", "text-anchor: middle;")
					.text(2012);

				label4.append("line")
					.attr("y2", 5)
					.attr("x2", 0)
					.attr("style", "stroke:rgb(0,0,0);")
		
		var label5 = d3.select("#label_fix")
					.append("g")
					.attr("class", "tick")
					.attr("transform", "translate(320, 0)");

				label5.append("text")
					.attr("dy", ".71em")
					.attr("y", 4)
					.attr("x", 0)
					.attr("style", "text-anchor: middle;")
					.text(2013);

				label5.append("line")
					.attr("y2", 5)
					.attr("x2", 0)
					.attr("style", "stroke:rgb(0,0,0);")



	this.update = function(d){

		for(var i = 0; i<4; i++){
			for (var j=2009; j<2014; j++){
				if(parseInt(d[i][j]) > parseInt(m1)) {
					m1 = parseInt(d[i][j]);
				}
			}
		}

		data1 = [parseInt(d[0][2009]), parseInt(d[0][2010]), parseInt(d[0][2011]), parseInt(d[0][2012]), parseInt(d[0][2013])];
		data2 = [parseInt(d[1][2009]), parseInt(d[1][2010]), parseInt(d[1][2011]), parseInt(d[1][2012]), parseInt(d[1][2013])];
		data3 = [parseInt(d[2][2009]), parseInt(d[2][2010]), parseInt(d[2][2011]), parseInt(d[2][2012]), parseInt(d[2][2013])];
		data4 = [parseInt(d[3][2009]), parseInt(d[3][2010]), parseInt(d[3][2011]), parseInt(d[3][2012]), parseInt(d[3][2013])];


		
		var x = d3.scale.linear().domain([0, data1.length]).range([0, w]);
		var y = d3.scale.linear().domain([0, parseInt(m1)]).range([h, 0]);

		var xAxis = d3.svg.axis().scale(x).tickSize(5).tickSubdivide(true);

	    // Select the section we want to apply our changes to
	    var svg = d3.select("#water_trend").transition();

    	// Make the changes
        svg.select(".line_graph_path")   // change the line
            .duration(750)
            .attr("d", line(data1));
        svg.select(".x axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y axis") // change the y axis
            .duration(750)
            .call(yAxisLeft);
	   
	}

}
			