var sweden = new swedenMap("map", "white", "orange");
var donut = new donut("donut");

var venn = new vennDiagram("venn");


/* ------- LIQUID ------ */
var liquid1 = new liquidFillGauge();
var config1 = liquid1.liquidFillGaugeDefaultSettings();
    config1.circleColor = "#FF7777";
    config1.textColor = "#FF4444";
    config1.waveTextColor = "#FFAAAA";
    config1.waveColor = "#FFDDDD";
    config1.circleThickness = 0.2;
    config1.textVertPosition = 0.2;
    config1.waveAnimateTime = 1000;

liquid1.loadLiquidFillGauge("fillgauge1", 28, config1);

/* ------- COUNTER --------- */
countTo("test_text", 1082, 1200, false);



/*TRANSPORTATION SECTION*/
var div_drop_down = "drop_down_counties";
var dispatch = d3.dispatch("load", "countychange");

d3.csv("data/greenCars.csv", function(error, counties) {
	if (error) throw error;
	green_cars_data = d3.map();
	counties.forEach(function(d) { green_cars_data.set(d.Län, d); });
	dispatch.load(green_cars_data);
	dispatch.countychange(green_cars_data.get("Stockholms län"));
});

// A drop-down menu for selecting a county; uses the "menu" namespace.
dispatch.on("load.menu", function(green_cars_data) {
var select = d3.selectAll("."+div_drop_down)
  .append("div")
  .append("select")
  .on("change", function() { dispatch.countychange(green_cars_data.get(this.value)); });

	select.selectAll("option")
	    .data(green_cars_data.values())
	  	.enter().append("option")
	    .attr("value", function(d) { return d.Län; })
	    .text(function(d) { return d.Län; });

	dispatch.on("countychange.menu", function(county) {
	  select.property("value", county.Län);
	});
});

