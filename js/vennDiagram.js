function vennDiagram(section){
	var w = 960,
	h = 500;

	var s = d3.select("#" + section)
	.append("svg:svg")
	.attr("width", w)
	.attr("height", h);

	s.append("svg:circle")
	.attr("cx", 350)
	.attr("cy", 200)
	.attr("r", 200)
	.style("fill", "brown")
	.style("fill-opacity", ".5");

	s.append("svg:circle")
	.attr("cx", 550)
	.attr("cy", 200)
	.attr("r", 200)
	.style("fill", "steelblue")
	.style("fill-opacity", ".5");

	s.append("svg:circle")
	.attr("cx", 450)
	.attr("cy", 300)
	.attr("r", 200)
	.style("fill", "green")
	.style("fill-opacity", ".5");
}