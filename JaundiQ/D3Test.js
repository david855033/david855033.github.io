
d3.select(".axis")
    .call(d3.axisBottom(d3.scaleLinear().domain([0,10]).range([0,300])));