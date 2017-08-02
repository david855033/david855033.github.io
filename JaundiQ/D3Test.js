'use strict';
var svgContainer = d3.select("body")
  .append("svg")
    .attr("width", 500)
    .attr("height", 200)
    .style("padding", "10px")
    .style("border", "1px solid");

var xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 500]);

    	
var xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickPadding(2);

var height=200, padding=10;

svgContainer.append("g")
    .attr("transform", function() {
        return "translate(" + 0 + "," + (height - padding) + ")"
     })
     .call(xAxis);