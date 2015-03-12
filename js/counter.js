function counter(elementID, startvalue, endvalue, duration, className, showPercent){
	var textFinalValue = parseFloat(endvalue).toFixed(2);
	var textStartValue = startvalue;
	var percentText = showPercent?"%":"";

	 var textRounder = function(value){ return Math.round(value); };
    if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
        textRounder = function(value){ return parseFloat(value).toFixed(1); };
    }
    if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
        textRounder = function(value){ return parseFloat(value).toFixed(2); };
    }

    var text = d3.select("#" + elementID).append("p")
	        .text(textRounder(textStartValue) + percentText)
	        .attr("class", className);

	var textTween = function(){
	        var i = d3.interpolate(this.textContent, textFinalValue);
	        return function(t) { this.textContent = textRounder(i(t)) + percentText; }
	    };

    text.transition()
        .duration(duration)
        .tween("text", textTween);
}