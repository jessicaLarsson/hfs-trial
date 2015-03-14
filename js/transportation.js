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

	//datan nedan är per utsläpp i koldioxid i kg per person, resa tor-och-retur
	// var gbg_sthlm = [160, 3]; //flyg, tåg
	// var sthlm_medelhavet = [450, 160]; //flyg ,tåg
	// var sthlm_thailand = [2200]; //flyg

	var travel_data = [160, 3, 450, 160, 2200];
	var travel_data_div = "travel1";
	var travel_div_h = 300;
	var travel_div_w = $("#"+travel_data_div).width();
	var bar_chart = new barChart2(travel_data, travel_data_div, travel_div_h, travel_div_w, 2300);


	//----------------------------------
	var driven_distance_div = "driven_distance";
	var dataset = [1209,1192,1170,1152,1130]; //fullösning, Statisk data sthlm
	var h = 400;
	var w = $("#"+driven_distance_div).width();
	var bar_chart = new barChart(dataset, driven_distance_div, h, w, 1300);


	this.update = function(c){
		var green_cars_value = green_cars_data.get(c);
		countTo("nr_of_cars", green_cars_value.AntalPersonbilarIlänet, 1200, false);
		countTo("green_cars", green_cars_value.ProcentuellAndelMiljöbilar, 1200, true);

		var distance_value = driven_distance_data.get(c);	

		//New values for dataset
		var dataset = [distance_value[2009], distance_value[2010], distance_value[2011], distance_value[2012], distance_value[2013]];
		bar_chart.update(dataset);				   						
	}
}