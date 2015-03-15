function energy() {

    /* Energy PieChart, riket, summa förbrukningskategori, 2013 från energyUsageHouses.csv */
    var data = [{"label":"småhus", "value":42072179}, 
                      {"label":"flerbostadshus", "value":31613186}, 
                      {"label":"fritidshus", "value":2964083}];

    //var color = d3.scale.category20c();
    var color = ['#E85421', '#FF9571', '#7F4B38'];
    svg = d3.select("svg1");
    canvas = d3.select("#canvas1");
    art = d3.select("#art1");
    labels = d3.select("#labels1");

    jhw_pie = d3.layout.pie()
    jhw_pie.value(function (d, i) {
        return d.value;
    });

    var w = $('#pieChartSvg1').width();
    var h = $('#pieChartSvg1').height();

    cDim = {
        height: h,
        width: w,
        innerRadius: 20,
        outerRadius: 100,
        labelRadius: 110
    }

    svg.attr({
        height: cDim.height,
        width: cDim.width
    });

    canvas.attr("transform", "translate(" + (cDim.width*0.4) + "," + (cDim.width*0.3) + ")");

    pied_data = jhw_pie(data);

    pied_arc = d3.svg.arc()
        .innerRadius(20)
        .outerRadius(100);

    enteringArcs = art.selectAll(".wedge").data(pied_data).enter();

    enteringArcs.append("path")
        .attr("class", "wedge")
        .attr("d", pied_arc)
        .style("fill", function (d, i) {
        return color[i];
    });

    enteringLabels = labels.selectAll(".label").data(pied_data).enter();
    labelGroups = enteringLabels.append("g").attr("class", "label");
    labelGroups.append("circle").attr({
        x: 0,
        y: 0,
        r: 2,
        fill: "#000",
        transform: function (d, i) {
            centroid = pied_arc.centroid(d);
            return "translate(" + pied_arc.centroid(d) + ")";
        },
            'class': "label-circle"
    });

    textLines = labelGroups.append("line").attr({
        x1: function (d, i) {
            return pied_arc.centroid(d)[0];
        },
        y1: function (d, i) {
            return pied_arc.centroid(d)[1];
        },
        x2: function (d, i) {
            centroid = pied_arc.centroid(d);
            midAngle = Math.atan2(centroid[1], centroid[0]);
            x = Math.cos(midAngle) * cDim.labelRadius;
            return x;
        },
        y2: function (d, i) {
            centroid = pied_arc.centroid(d);
            midAngle = Math.atan2(centroid[1], centroid[0]);
            y = Math.sin(midAngle) * cDim.labelRadius;
            return y;
        },
            'class': "label-line"
    });

    textLabels = labelGroups.append("text").attr({
        x: function (d, i) {
            centroid = pied_arc.centroid(d);
            midAngle = Math.atan2(centroid[1], centroid[0]);
            x = Math.cos(midAngle) * cDim.labelRadius;
            sign = (x > 0) ? 1 : -1
            labelX = x + (5 * sign)
            return labelX;
        },
        y: function (d, i) {
            centroid = pied_arc.centroid(d);
            midAngle = Math.atan2(centroid[1], centroid[0]);
            y = Math.sin(midAngle) * cDim.labelRadius;
            return y;
        },
            'text-anchor': function (d, i) {
            centroid = pied_arc.centroid(d);
            midAngle = Math.atan2(centroid[1], centroid[0]);
            x = Math.cos(midAngle) * cDim.labelRadius;
            return (x > 0) ? "start" : "end";
        },
            'class': 'label-text'
    }).text(function (d) {
        return d.data.label
    });

    alpha = 0.5;
    spacing = 12;

    function relax() {
        again = false;
        textLabels.each(function (d, i) {
            a = this;
            da = d3.select(a);
            y1 = da.attr("y");
            textLabels.each(function (d, j) {
                b = this;
                if (a == b) return;
                db = d3.select(b);
                if (da.attr("text-anchor") != db.attr("text-anchor")) return;
                y2 = db.attr("y");
                deltaY = y1 - y2;

                if (Math.abs(deltaY) > spacing) return;

                again = true;
                sign = deltaY > 0 ? 1 : -1;
                adjust = sign * alpha;
                da.attr("y",+y1 + adjust);
                db.attr("y",+y2 - adjust);
            });
        });
        if(again) {
            labelElements = textLabels[0];
            textLines.attr("y2",function(d,i) {
                labelForLine = d3.select(labelElements[i]);
                return labelForLine.attr("y");
            });
            setTimeout(relax,20)
        }
    }

    relax();

    var region_data;
    var r = [];
    var regionName = "Stockholms län";
    var userCategory = "småhus";

    var line_chart_energy;

	d3.csv("data/energyUsageHouses.csv", function(error, regions) {
		if (error) throw error;
		region_data = regions;

		regions.forEach(function(d) {  
			if(d.region == regionName) {
				if(d.förbrukarkategori == userCategory) {
					if(userCategory == "småhus" && (d.bränsletyp == "flytande (icke förnybara)"||d.bränsletyp == "fast (förnybara)" ||d.bränsletyp == "fjärrvärme" ||d.bränsletyp == "el")) {
						r.push(d);
					} else if (userCategory == "flerbostadshus" && (d.bränsletyp =="flytande (icke förnybara)"||d.bränsletyp =="fjärrvärme"|| d.bränsletyp =="el")) {
						r.push(d);
				    }
                }

		    }
	   }) 
        multipleLineChart(r);
	});

    this.update = function(c){
        r = [];
        regionName = c;
        
        //regionName = "Östergötlands län";
        userCategory = "småhus";

        d3.csv("data/energyUsageHouses.csv", function(error, regions) {
        if (error) throw error;
        region_data = regions;

        regions.forEach(function(d) {  
            if(d.region == regionName) {
                if(d.förbrukarkategori == userCategory) {
                    if(userCategory == "småhus" && (d.bränsletyp == "flytande (icke förnybara)"||d.bränsletyp == "fast (förnybara)" ||d.bränsletyp == "fjärrvärme" ||d.bränsletyp == "el")) {
                        r.push(d);
                    } else if (userCategory == "flerbostadshus" && (d.bränsletyp =="flytande (icke förnybara)"||d.bränsletyp =="fjärrvärme"|| d.bränsletyp =="el")) {
                        r.push(d);
                    }
                }

            }
       }) 
        console.log(r);
        multipleLineChart(r);
    });
    }
}