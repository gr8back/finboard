import React from 'react'
var ReactFauxDOM = require('react-faux-dom')
var ReactDOM = require('react-dom')
var d3 = require('d3')
var datetime = require('node-datetime');



class dThree extends React.Component {
    constructor(props) {
        super(props);
    }


    mixins: [ReactFauxDOM.mixins.core]

    componentDidUpdate() {
    const div = this.connectFauxDOM('div', 'chart');

    let data = {"1-1-21":"12","1-2-21":"12","1-3-21":"12","1-4-21":"12","1-5-21":"12"}


    let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

    console.log("d3 chart height and width " + width + " " + height)

    // var parseDate = d3.timeParse("%Y-%m-%d");

    let x = d3.scaleTime()
      .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
      .range([0, 700]);

    // let x = d3.scaleBand()
    //     .rangeRound([0, width])

    let y = d3.scaleLinear()
        .range([height, 0])

    let xAxis = d3.axisBottom()
        .scale(x)
    //
    let yAxis = d3.axisLeft()
        .scale(y)
        .ticks(1, "$");

    //Pass it to d3.select and proceed as normal
    let svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


    x.domain((d) => d.date);
    y.domain([0, d3.max((d) => d.close)]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    console.log("your chart data is " + JSON.stringify(data))

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d,i) => i * 35)
        .attr("width", 30)
        .attr("y", (d,i) =>  y(parseInt(d.close)))
        .attr("height", 30);

          }

    render () {
        return (
          <div>
              This will be the CHART
            {this.state.chart}
          </div>
        )
  }

}



export default dThree;
