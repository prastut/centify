import React, { Component } from "react";
import "./App.css";
import BarChart from "./BarChart";
import ResizeAware from "react-resize-aware";

class ChartContainer extends Component {
  render() {
    const { width, height } = this.props;
    console.log(height);

    const size = [width ? width : 500, height ? height : 500];
    return (
      <div className="chart-container">
        {this.props.height}
        <BarChart data={[5, 10, 1, 3]} size={size} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <ResizeAware style={{ position: "relative", height: "100%" }}>
        <ChartContainer />
      </ResizeAware>
    );
  }
}
export default App;
