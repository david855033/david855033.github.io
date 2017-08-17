'use strict';

var data = [
	{x: 0, y: 4, d:true},
	{x: 1, y: 9, d:true},
	{x: 2, y: 6, d:true},
  {x: 4, y: 5, d:false},
  {x: 5, y: 5, d:true},
  {x: 5.5, y: 5, d:true},
	{x: 6, y: 7, d:true},
	{x: 7, y: 3, d:true},
	{x: 9, y: 2, d:true}
];
var data2 = [
        {x: 0, y: 3},
        {x: 2, y: 7},
        {x: 3, y: 4},
        {x: 4, y: 3},
        {x: 5, y: 4.5},
        {x: 6, y: 3},
        {x: 8, y: 4},
        {x: 9, y: 1}
      ];

var height = 400, width = 400, padding=20;
var svgContainer = d3.select("body")
  .append("svg")
    .attr("width", height)
    .attr("height", width)
    .style("padding", padding+"px")
    .style("border", "1px solid");

var xScale = d3.scaleLinear()
  .domain([0,10])
  .range([padding,width-padding]);
var xAxis = d3.axisBottom(xScale);
svgContainer.append('g')
  .attr("transform", "translate(0,"+(height-padding)+")")
  .call(xAxis);

var yScale = d3.scaleLinear()
  .domain([10,0])
  .range([padding,height-padding]);
var yAxis = d3.axisLeft(yScale);
svgContainer.append('g')
  .attr("transform", "translate("+padding+",0)")
  .call(yAxis);

  var line = d3.line()
    .defined(d=> (typeof d.d==="undefined")?true:d.d)
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); })
    .curve(d3.curveBasis);

  svgContainer.append("path")
    .attr("d", line(data))
    .attr("fill", "none")
    .attr("stroke", "red")

  svgContainer.append("path")
    .attr("d", line(data2))
    .attr("fill", "none")
    .attr("stroke", "blue")

    
var area = d3.area()
    .x(function(d) { return xScale(d.x); })
    .y1(function(d) { return yScale(d.y); })
    .y0(yScale(1))
    .curve(d3.curveBasis)

  // svgContainer.append("path")
  //   .attr("d", area(data))
  //   .attr("fill", "hsl(0,30%,80%)")
  //   .attr("stroke", "red")