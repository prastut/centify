define(["d3", "twemoji", "jquery"], function(d3, emoji) {
  function featuredGraph() {
    // Data Model
    var data = {};
    var updateData;

    // Dimensions
    var width;
    var height;
    var updateWidth;

    // Position
    var yPos;
    var xPos;

    function chart(selection) {
      selection.each(function() {
        var dom = d3.select(this);

        xPos = $("#scatter-container")[0].getBoundingClientRect().width;

        var featured = dom
          .append("g")
          .attr("id", "featured-container")
          .attr("transform", "translate(" + xPos + "," + yPos + ")");

        var backgroundRect = featured
          .append("rect")
          .attr("class", "featured-background")
          .attr("height", height)
          .attr("width", width);

        updateFeaturedData = function() {
          var t = d3.transition().duration(750);

          var update = scatter.selectAll(".series").data(data);

          update.exit().remove();

          // var point = update.enter()
          //     .append("g")
          //     .attr("class", "series")
          //     .merge(update)
          //     .selectAll(".point")
          //     .data(function(d) { return d; })
          //     .enter().append("g")
          //     .attr("class", "point");

          // dots
          //     .attr("cy", function(d) { return y(d.y.sentiment_index); })
          //     .attr("cx", x.range()[1]) // Transistion from the extreme right to the screen
          //     .transition(t)
          //     .attr("cx", function(d) { return x(d.x); })
          //     .style("stroke", function(d) {
          //         if (d.y.type == "-") {
          //             return "red";
          //         } else {
          //             return "green";
          //         }
          //     });

          // dots.on("click", click);

          // var alldots = scatter.selectAll(".series")
          //     .selectAll(".point")
          //     .attr("cy", function(d) { return y(d.y.sentiment_index); })
          //     .transition(t)
          //     .attr("cx", function(d) { return x(d.x); });
        };

        resizeFeature = function() {
          xPos = $("#scatter-container")[0].getBoundingClientRect().width;
          featured.attr("transform", "translate(" + xPos + "," + yPos + ")");
          backgroundRect = featured.attr("width", width);
        };

        function click(d) {}

        function setScatterAttr() {
          return setCircleSize * zoom.k > 25 ? 25 : setCircleSize * zoom.k;
        }
      });
    }

    chart.data = function(value) {
      if (!arguments.length) return data;
      data = value;
      if (typeof updateFeaturedData === "function") updateFeaturedData();
      return chart;
    };

    chart.width = function(value) {
      if (!arguments.length) return 960;
      width = value;
      if (typeof resizeFeature === "function") resizeFeature();
      return chart;
    };

    chart.height = function(value) {
      if (!arguments.length) return 500;
      height = value;
      return chart;
    };

    chart.yPos = function(value) {
      if (!arguments.length) return 300;
      yPos = value;
      if (typeof moveYFeature === "function") moveYFeature();
      return chart;
    };

    return chart;
  }

  return {
    init: featuredGraph
  };
});
