define([
  "jquery",
  "d3",
  "./utils/helper",
  "./utils/data",
  "./utils/baseGraph",
  "./utils/topBarGraph",
  "./utils/topStatusGraph",
  "./utils/scatterGraph",
  "./utils/featuredGraph"
], function(
  $,
  d3,
  helper,
  data,
  baseGraph,
  topBarGraph,
  topStatusGraph,
  scatterGraph,
  featuredGraph
) {
  var lineData = {};
  var scatterData = {};

  $(function() {
    var hoverTimer;
    var params = {};
    var channel = "germany";
    params.start_timestamp = 1499019290;
    params.end_timestamp = 1499021000;
    params.user_type = "FAMOUS";

    /* Real Estate Setup
    =================================================================================
    =================================================================================
    #chart_container - contains all charts. 
    #bar-g - contains bar group 
    #scatter-chart
    #
    */

    var container;
    var dimensions;
    var panelDim;

    function setDimensions() {
      container = d3.select("#chart_container");

      dimensions = {
        width: parseInt(container.style("width")),
        height: parseInt(container.style("height"))
      };

      panelDim = {
        left: {
          width: dimensions.width * 0.8
        },
        right: {
          width: dimensions.width * 0.2
        }
      };
    }

    setDimensions();

    var base = baseGraph
      .chart()
      .width(dimensions.width)
      .height(dimensions.height);

    container.call(base);

    //Data

    helper.pL(
      lineData,
      channel,
      helper.fakeDataFormatter(data.fakeLine, params.start_timestamp)
    );

    helper.pS(
      scatterData,
      channel,
      helper.fakeDataFormatterScatter(data.fakeLine, 1499019288)
    );

    //Axis
    var commonXAxis = d3
      .scaleTime()
      .domain([params.start_timestamp * 1000, params.end_timestamp * 1000])
      .range([0, panelDim.left.width]);

    var commonXZoomAxis = d3
      .scaleTime()
      .domain(commonXAxis.domain())
      .range(commonXAxis.range());

    var svg = d3.select(".chart");

    var transform = d3.zoomIdentity;

    var overallZoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [dimensions.width, dimensions.height]])
      .extent([[0, 0], [dimensions.width, dimensions.height]])
      .on("zoom", zoomHandler);

    // Charts

    var topBarChart = topBarGraph
      .init()
      .yPos(dimensions.height - 20)
      .width(panelDim.left.width)
      .data(lineData[channel].events);

    svg.call(topBarChart);

    var topStatusChart = topStatusGraph
      .init()
      .yPos(dimensions.height - 80)
      .width(panelDim.right.width)
      .data(lineData[channel].events);

    svg.call(topStatusChart);

    var scatterChart = scatterGraph
      .init()
      .yPos(dimensions.height * 0.4 + 20)
      .height(dimensions.height - (dimensions.height * 0.4 + 20))
      .width(panelDim.left.width)
      .x(commonXAxis)
      .data(scatterData[channel])
      .zoom(d3.zoomIdentity);

    svg.call(scatterChart);

    var featuredChart = featuredGraph
      .init()
      .yPos(dimensions.height * 0.4 + 20)
      .height(dimensions.height - (dimensions.height * 0.4 + 20))
      .width(panelDim.right.width)
      .data(lineData[channel]);

    svg.call(featuredChart);

    visibilityBottomPanel("no");

    overallZoom.scaleTo(svg, 1);

    d3
      .select(window)
      .on("resize", resize)
      .on("mousemove", mousemoveIframe);

    // Setup done
    // =================================================================================
    // =================================================================================

    var liveData = helper.fakeDataFormatter(
      data.liveFakeLine,
      lineData[channel].timestamps[lineData[channel].timestamps.length - 1] /
        1000,
      "seconds"
    );

    // Update Common Axis
    var xAxisLive;
    var scatterLive;
    var lineLive;

    var minTime = 1499019468000;
    var maxTime = 1499020728000;

    function live(state) {
      if (!(xAxisLive || scatterLive || lineLive)) {
        xAxisLive = setInterval(function() {
          maxTime = maxTime + 1 * 1000;
          commonXAxis.domain([minTime, maxTime]);
          commonXZoomAxis.domain(commonXAxis.domain());
          commonXAxis.domain(transform.rescaleX(commonXZoomAxis).domain());
        }, 1000);

        scatterLive = setInterval(function() {
          console.log("Scatter UPDATE");

          var liveScatter = [];

          liveScatter.push({
            time: scatterTime,
            joshua_kimmich: [
              {
                sentiment_index: -Math.random() * 10,
                text: "Tweet 2"
              },
              {
                sentiment_index: +Math.random() * 10,
                text: "Tweet 3"
              }
            ]
          });

          scatterTime = scatterTime + 1;

          helper.pS(scatterData, channel, liveScatter);
          scatterChart.x(commonXAxis).data(scatterData[channel]);

          svg.call(overallZoom);
        }, 1000);

        // Update Line Chart Data

        lineLive = setInterval(function() {
          console.log("Line + Events");

          var x = liveData.shift();
          if (x) {
            helper.pL(lineData, channel, [x]);
            lineChart.x(commonXAxis).data(lineData[channel]);
            eventsChart.x(commonXAxis).data(lineData[channel].events);
          } else {
            console.log("STOPPED");
            liveStop();
            maxTime = maxTime + 100 * 1000;
            commonXAxis.domain([minTime, maxTime]);
            commonXZoomAxis.domain(commonXAxis.domain());
            eventsChart.x(commonXAxis).data(lineData[channel].events);
          }
        }, 1000);
      }
    }

    function liveStop() {
      clearInterval(xAxisLive);
      clearInterval(scatterLive);
      clearInterval(lineLive);
    }

    // live();
    // liveStop();

    // Helper functions
    // =================================================================================
    // =================================================================================

    function updateCharts() {
      //   lineChart.x(commonXAxis);

      // left panel
      topBarChart.width(panelDim.left.width);

      scatterChart
        .width(panelDim.left.width)
        .x(commonXAxis)
        .zoom(transform);

      //right panel
      topStatusChart.width(panelDim.left.width);
      featuredChart.width(panelDim.right.width);
    }

    function resize() {
      setDimensions();

      //Container Update
      base.width(dimensions.width);

      // Axis Update
      commonXAxis.range([0, panelDim.left.width]);
      commonXZoomAxis.range(commonXAxis.range());

      // Charts Update
      updateCharts();
    }

    function zoomHandler() {
      transform = d3.event.transform;
      // live("stop");
      commonXAxis.domain(transform.rescaleX(commonXZoomAxis).domain());
      updateCharts();
    }

    function visibilityBottomPanel(visibility) {
      if (visibility == "yes") {
        d3.select("#featured-container").style("opacity", "1");
        d3.select("#scatter-container").style("opacity", "1");
      } else {
        d3.select("#featured-container").style("opacity", "0");
        d3.select("#scatter-container").style("opacity", "0");
      }
    }

    function onEnterHover() {
      var repositionHeight = dimensions.height * 0.4;
      topBarChart.yPos(repositionHeight);
      topStatusChart.yPos(repositionHeight - 60);

      visibilityBottomPanel("yes");
    }

    function onExitHover() {
      topBarChart.yPos(dimensions.height - 20);
      topStatusChart.yPos(dimensions.height - 80);

      visibilityBottomPanel("no");
    }

    function mousemoveIframe() {
      onEnterHover();
      if (hoverTimer) clearTimeout(hoverTimer);

      hoverTimer = setTimeout(onExitHover, 2000);
    }
  });
});
