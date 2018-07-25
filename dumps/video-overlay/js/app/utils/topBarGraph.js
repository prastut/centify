define(["d3", "twemoji"], function(d3) {
  function topBarGraph() {
    // Data Model
    var data = {};
    var updateData;

    // Dimensions
    var width;
    var overallheight;
    var updateWidth;
    var yPos;

    function chart(selection) {
      selection.each(function() {
        var dom = d3.select(this);

        var bars = dom
          .append("g")
          .attr("id", "bar-container")
          .attr("transform", "translate(0," + yPos + ")");

        var bardata = [1, 1];
        if (bardata[0] === 0 && bardata[1] === 0) {
          bardata = [1, 1];
        }

        var sum = bardata.reduce((a, b) => a + b, 0);

        bars
          .selectAll("rect")
          .data(bardata)
          .enter()
          .append("rect")
          .attr("class", function(d, i) {
            return i === 0 ? "bar-neg" : "bar-pos";
          })
          .attr("height", function(d) {
            return 20;
          })
          .attr("x", function(d, i) {
            return i * bardata[0] / sum * width + i * 2;
          })
          .attr("y", 0)
          .attr("width", function(d) {
            return d / sum * width;
          })
          .attr("fill", function(d, i) {
            return i === 0 ? "red" : "green";
          });

        updateEvents = function() {};

        resizeBar = function() {
          bars
            .selectAll("rect")
            .attr("x", function(d, i) {
              return i * bardata[0] / sum * width + i * 2;
            })
            .attr("width", function(d) {
              return d / sum * width;
            });
          // backgroundRect
          //   .attr("height", function() {
          //     var height = 50 * zoom.k > 55 ? 55 : 50 * zoom.k;
          //     return height;
          //   })
          //   .attr("width", width);
        };

        moveYBar = function() {
          bars.attr("transform", "translate(0," + yPos + ")");
        };
      });
    }

    chart.data = function(value) {
      if (!arguments.length) return data;
      data = value;
      if (typeof updateEvents === "function") updateEvents();
      return chart;
    };

    chart.zoom = function(value) {
      if (!arguments.length) return zoom;
      zoom = value;
      if (typeof zoomEvents === "function") zoomEvents();
      return chart;
    };

    chart.width = function(value) {
      if (!arguments.length) return 960;
      width = value;
      if (typeof resizeBar === "function") resizeBar();
      return chart;
    };

    chart.yPos = function(value) {
      if (!arguments.length) return 300;
      yPos = value;
      if (typeof moveYBar === "function") moveYBar();
      return chart;
    };

    return chart;
  }

  return {
    init: topBarGraph
  };
});
