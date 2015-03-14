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

