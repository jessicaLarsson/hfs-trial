/* function that given 
an id of a tag containing text, 
endvalue to count to, 
duration i milliseconds, 
and a boolean representing if % will be displayed efter the number
counts from the current number displayed in the tag to the endvalue*/

function countTo(elementID, endvalue, duration, showPercent){
	var textFinalValue = parseFloat(endvalue).toFixed(2);
	var textStartValue = Number(d3.select("#"+elementID).text());
	var percentText = showPercent?"%":"";

	var textRounder = function(value){ return Math.round(value); };
    if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
        textRounder = function(value){ return parseFloat(value).toFixed(1); };
    }
    if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
        textRounder = function(value){ return parseFloat(value).toFixed(2); };
    }

    var text = d3.select("#" + elementID)
	 		.text(textRounder(textStartValue) + percentText);

	var textTween = function(){
	        var i = d3.interpolate(this.textContent, textFinalValue);
	        return function(t) { this.textContent = textRounder(i(t)) + percentText; }
	    };

    text.transition()
        .duration(duration)
        .tween("text", textTween);
}