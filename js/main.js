/*----- DROP DOWN COUNTY SELECTION */
var div_drop_down = "drop_down_counties";
var dispatch = d3.dispatch("load", "countychange");

var water = new water();
var transportation = new transportation();
var energy = new energy();
var consumtion = new consumtion();


//read county data
d3.csv("data/greenCars.csv", function(error, counties) {
	if (error) throw error;
	county_data = d3.map();
	counties.forEach(function(d) { county_data.set(d.Län, d); });
	dispatch.load(county_data);
	dispatch.countychange(county_data.get("Stockholms län")); //startvalue
});

// A drop-down menu for selecting a county; uses the "menu" namespace
dispatch.on("load.menu", function(green_cars_data) {
var select = d3.selectAll("."+div_drop_down)
  .append("div")
  .append("select")
  .on("change", function() { dispatch.countychange(county_data.get(this.value)); });

	select.selectAll("option")
	    .data(county_data.values())
	  	.enter().append("option")
	    .attr("value", function(d) { return d.Län; })
	    .text(function(d) { return d.Län; });

	dispatch.on("countychange.menu", function(county) {
	  select.property("value", county.Län);
	  transportation.update(county.Län);
	  water.update(county.Län);
	  consumtion.update(county.Län);
	});
});


/*----- TRANSPORTATION SECTION -------- */
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



function updateTransportationSection(c){
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

/*-------- WATER SECTION -------------*/
/* Liquid Water Fun Fact*/
var liquidFunFact = new liquidFillGauge();
var configFunFact = liquidFunFact.liquidFillGaugeDefaultSettings();
    configFunFact.circleColor = "#FF7777";
    configFunFact.textColor = "#FF4444";
    configFunFact.waveTextColor = "#FFAAAA";
    configFunFact.waveColor = "#FFDDDD";
    configFunFact.circleThickness = 0.2;
    configFunFact.textVertPosition = 0.2;
    configFunFact.waveAnimateTime = 1000;

liquidFunFact.loadLiquidFillGauge("water_fun_fact", 28, configFunFact);

function updateWaterSection(c){
	
	var water_data = water_trend_data.get(c);
	console.log(water_data[2000]);
	var s = new waterTrendLineChart(water_data);

}


/* Water pie chart over the use of water in sweden , this pie chart won't update */
var waterData = d3.csv("data/waterUseSweden.csv");
var waterPie = new pieChart("water_pie_chart", waterData);

/* ----- Consupmtion Section -----*/

d3.csv("carbonPollutionConsumers.csv", function(error, data) {

