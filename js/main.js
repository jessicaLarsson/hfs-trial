var sweden = new swedenMap("map", "white", "orange");
var donut = new donut("donut");
var test_diagram = new groupedBarChart();


/* ------- LIQUID ------ */
var liquid1 = new liquidFillGauge();
var config1 = liquid1.liquidFillGaugeDefaultSettings();
    config1.circleColor = "#FF7777";
    config1.textColor = "#FF4444";
    config1.waveTextColor = "#FFAAAA";
    config1.waveColor = "#FFDDDD";
    config1.circleThickness = 0.2;
    config1.textVertPosition = 0.2;
    config1.waveAnimateTime = 1000;

liquid1.loadLiquidFillGauge("fillgauge1", 28, config1);

/* ------- COUNTER --------- */
var counter1 = new counter("counter1", 0, 1082, 1200, "red_counter", false);