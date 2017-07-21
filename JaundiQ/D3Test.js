'use strict';
var testData=[1,2,3,4,5,6,7,1,2,3,4,5,1,3,3,4];
var his=d3.histogram().domain([2,5]).thresholds(d3.ticks(2,5,4));
console.log(testData);
console.log(JSON.stringify(his(testData)));
