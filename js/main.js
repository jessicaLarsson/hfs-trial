/*----- DROP DOWN COUNTY SELECTION*/
var div_drop_down = "drop_down_counties";
var dispatch = d3.dispatch("load", "countychange");


/*----- DATA READ SECTION-------*/
//read data, green cars, number of cars etc
d3.csv("data/greenCars.csv", function(error, counties) {
	if (error) throw error;
	green_cars_data = d3.map();
	counties.forEach(function(d) { green_cars_data.set(d.Län, d); });
});

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
	  updateTransportationSection(county.Län);
	});
});

/*----- TRANSPORTATION SECTION -------- */
function updateTransportationSection(c){
	var data_test = green_cars_data.get(c);
	countTo("nr_of_cars", data_test.AntalPersonbilarIlänet, 1200, false);
	countTo("green_cars", data_test.ProcentuellAndelMiljöbilar, 1200, true);
}






//var sweden = new swedenMap("map", "white", "orange");
//var donut = new donut("donut");
//var venn = new vennDiagram("venn");

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




