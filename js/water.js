function water(){
	//read data, green cars, number of cars etc
	d3.csv("data/waterTrend.csv", function(error, counties) {
		if (error) throw error;
		water_trend_data = d3.map();
		counties.forEach(function(d) { water_trend_data.set(d.Län, d); });
	});

	d3.csv("data/populationCounty.csv", function(error,counties){
		if(error) throw error;
		populationData = d3.map();
		counties.forEach(function(d) { populationData.set(d.region, d); });
	});

	/* Liquid Water Fun Fact*/
	var liquidFunFact = new liquidFillGauge();
	var configFunFact = liquidFunFact.liquidFillGaugeDefaultSettings();
	    configFunFact.circleColor = "#087FCC";
	    configFunFact.textColor = "#087FCC";
	    configFunFact.waveTextColor = "#087FCC";
	    configFunFact.waveColor = "#1D3640";
	    configFunFact.circleThickness = 0.2;
	    configFunFact.textVertPosition = 0.2;
	    configFunFact.waveAnimateTime = 1000;

	liquidFunFact.loadLiquidFillGauge("water_fun_fact", 40, configFunFact);

	/* Water pie chart over the use of water in sweden , this pie chart won't update */
	var waterData = d3.csv("data/waterUseSweden.csv");
	var waterPie = new pieChart("water_pie_chart", waterData);
	
	var water_trend_graph = new waterTrendLineChart([1000000*125347/1725756,1000000*130832/1823210,1000000*127908/1889945,1000000*137582/2054343]);

	this.update = function(c){
		var data = water_trend_data.get(c);
		var population = populationData.get(c)
		var water_data = [parseInt(1000000*data[1995] / population[1995]), parseInt(1000000*data[2000] / population[2000]), 
		parseInt(1000000*data[2005] / population[2005]), parseInt(1000000*data[2010] / population[2005])];
		water_trend_graph.update(water_data);
	}

}