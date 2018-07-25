define(["d3", "twemoji"], function(d3) {
  function topStatusGraph() {
    // Data Model
    var data = {};
    var updateData;

    // Dimensions
    var width;
    var overallheight;
    var updateWidth;
    var yPos;
    var xPos;

    //Event Bisector

    function chart(selection) {
      selection.each(function() {
        var dom = d3.select(this);

        xPos = $("#bar-container")[0].getBoundingClientRect().width;

        var status = dom
          .append("g")
          .attr("id", "status-container")
          .attr("transform", "translate(" + xPos + "," + yPos + ")");

        var backgroundRect = status
          .append("rect")
          .attr("class", "status-background")
          .attr("height", 80)
          .attr("width", width);

        updateEvents = function() {};

        zoomEvents = function() {
          resizeEvents();
        };

        resizeTopStatus = function() {
          xPos = $("#bar-container")[0].getBoundingClientRect().width;
          status.attr("transform", "translate(" + xPos + "," + yPos + ")");
          backgroundRect.attr("width", width);
        };

        moveYStatus = function() {
          status.attr("transform", "translate(" + xPos + "," + yPos + ")");
        };
      });
    }

    chart.data = function(value) {
      if (!arguments.length) return data;
      data = value;
      if (typeof updateEvents === "function") updateEvents();
      return chart;
    };

    chart.width = function(value) {
      if (!arguments.length) return 960;
      width = value;
      if (typeof resizeTopStatus === "function") resizeTopStatus();
      return chart;
    };

    chart.height = function(value) {
      if (!arguments.length) return 500;
      overallheight = value;
      return chart;
    };

    chart.yPos = function(value) {
      if (!arguments.length) return 300;
      yPos = value;
      if (typeof moveYStatus === "function") moveYStatus();
      return chart;
    };

    return chart;
  }

  return {
    init: topStatusGraph
  };
});
