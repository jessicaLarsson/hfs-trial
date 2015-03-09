    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 15])
        .on("zoom", move);

    var mapDiv = $("#map");

    var width = mapDiv.width(); 
    var height = mapDiv.height();

    //initialize tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var projection = d3.geo.mercator()
        .center([40, 63 ])
        .scale(890);

    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);

    var path = d3.geo.path()
        .projection(projection);

    g = svg.append("g");

    var region;
    var mun;

    d3.json("data/swe_mun.topojson", function(error, sweden) {
        mun = topojson.feature(sweden, sweden.objects.swe_mun).features;        
        draw(mun);         
     });


    function draw(regions)
    {

        region = g.selectAll(".region").data(regions);
        region.enter().insert("path")
            .attr("class", "region")
            .attr("d", path)
            .attr("id", function(d) { return d.id; })
            .attr("title", function(d) { 
                return d.properties.name; 
            })
            .style("fill", "red")
            .attr("stroke" , "white")
            .attr("strokewidth" , 0.5)
            .attr("stroke-linejoin" , "round")
        
         
            //tooltip
           .on("mousemove", function(d) {
                tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
              tooltip.html(d.properties.name)
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px"); 
                })
            .on("mouseout", function(d) {
                tooltip.transition()
               .duration(300)
               .style("opacity", 0);
            });

    }

    // //zoom and panning method
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;
        

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }
    


