function consumtion(){	
	var private_consumtion = 9297770;
	d3.csv("data/carbonPollutionConsumers.csv", function(data) {
		total_consumtion = d3.sum(data, function(d){return d[2012]});
		countTo("percentage_private_consumtion", (private_consumtion/total_consumtion)*100, 1200, true);
	});

	this.update = function(){

	}
}