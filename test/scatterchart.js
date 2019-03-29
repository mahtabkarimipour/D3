d3.csv("data.csv", function(data) {
  // Variables
  var body = d3.select("body");
  var margin = { top: 50, right: 50, bottom: 50, left: 50 };
  var h = 500 - margin.top - margin.bottom;
  var w = 900 - margin.left - margin.right;

  // Scales
  var colorScale = d3.scale.category20();
  var xScale = d3.scale
    .linear()
    .domain([
      d3.min([
        0,
        d3.min(data, function(d) {
          return d.Smokes;
        })
      ]),
      d3.max([
        0,
        d3.max(data, function(d) {
          return d.Smokes;
        })
      ])
    ])
    .range([0, w]);
  var yScale = d3.scale
    .linear()
    .domain([
      d3.min([
        0,
        d3.min(data, function(d) {
          return d.Age;
        })
      ]),
      d3.max([
        0,
        d3.max(data, function(d) {
          return d.Age;
        })
      ])
    ])
    .range([h, 0]);
  // SVG
  var svg = body
    .append("svg")
    .attr("height", h + margin.top + margin.bottom)
    .attr("width", w + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // X-axis
  var xAxis = d3.svg
    .axis()
    .scale(xScale)
    .ticks(5)
    .orient("bottom");
  // Y-axis
  var yAxis = d3.svg
    .axis()
    .scale(yScale)
    .orient("left");
  // Circles
  var circles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d.Smokes)/3;
    })
    .attr("cy", function(d) {
      return yScale(d.Age);
    })
    .attr("r", "5")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", function(d, i) {
      return colorScale(i);
    })
    .append("title") // Tooltip
    .text(function(d) {
      return "Abbr: " + d.abbr + "\nAge: " + d.Age + "\nSmokes: " + d.Smokes;
    });
  // X-axis
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis)
    .append("text") // X-axis Label
    .attr("class", "label")
    .attr("y", -10)
    .attr("x", w)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Smokes - X - Smokes");
  // Y-axis
  svg
    .append("g")
    .attr("class", "axis")
    .call(yAxis)
    .append("text") // y-axis Label
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("x", 0)
    .attr("y", 5)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Age - Y - Age");
});
