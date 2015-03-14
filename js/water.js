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
	    configFunFact.circleColor = "#FF7777";
	    configFunFact.textColor = "#FF4444";
	    configFunFact.waveTextColor = "#FFAAAA";
	    configFunFact.waveColor = "#FFDDDD";
	    configFunFact.circleThickness = 0.2;
	    configFunFact.textVertPosition = 0.2;
	    configFunFact.waveAnimateTime = 1000;

	liquidFunFact.loadLiquidFillGauge("water_fun_fact", 40, configFunFact);

	/* Water pie chart over the use of water in sweden , this pie chart won't update */
	var waterData = d3.csv("data/waterUseSweden.csv");
	var waterPie = new pieChart("water_pie_chart", waterData);
	
	var water_trend_graph = new waterTrendLineChart([125347,130832,127908,137582]);

	this.update = function(c){
		var data = water_trend_data.get(c);
		var population = populationData.get(c)
		var water_data = [parseInt(data[1995] / population[1995]), parseInt(data[2000] / population[2000]), 
		parseInt(data[2005] / population[2005]), parseInt(data[2010] / population[2005])];
		water_trend_graph.update(water_data);
	}

}