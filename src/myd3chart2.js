import React from 'react';
var datetime = require('node-datetime');
var LineChart = require("react-chartjs").Line;



export default class Stockgraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartSeries: [],
            indexx : [],
            indexy : [],
            mystockdata: [2, 4, 6, 8, 10, 12, 14],
            stockplot: [
                {age: 0},
                {index: 1}
            ],
            data: [
                {
                    "age": 2,
                    "index": 0,
                    "month": "January"
                },
                {
                    "age": 4,
                    "index": 1,
                    "month": "February"
                },
                {
                    "age": 6,
                    "index": 2,
                    "month": "March"
                },
                {
                    "age": 8,
                    "index": 3,
                    "month": "April"
                }
            ],
            x: function (d) {
                console.log("DDDD " + JSON.stringify(d))
                return d.index
            },
            mydata : {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(200,102,222,1)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [2,4,6,8,10,12,14],
                        spanGaps: false,
                        scaleLabel: "<%= '   ' + value%>"
                }
            ]
        },
            myoptions: {
                scales: {
                  yAxes: [{
                    gridLines: {
                      display: false
                    },
                    scaleLabel: {
                      display: false
                    },
                    scaleLkneColor: 'white',
                  }],
                  xAxes: [{
                    gridLines: {
                      display: false
                    },
                    scaleLabel: {
                      display: false
                    },
                }]
            }
  }
        }
    }

componentDidUpdate() {

       if (this.props.stockplot != null && this.props.stockplot != this.state.stockplot) {

        var a = [];
        var b = [];
        var top = [];
        var myc =[];

        this.props.stockplot.map((stock,index) => {
            var a = stock.close
            var b = stock.date.toLocaleDateString()
            var dt = datetime.create(stock.date, 'm/d/Y');
            var formattedDate = dt.format();
            var def = {a}
            myc.push(formattedDate)
            top.push(a)

        })

            var myxvalues = this.state.mydata;
            myxvalues.labels = myc;
            var mystockpoints = myxvalues.datasets[0]
            mystockpoints.data= top


        this.state.stockplot = this.props.stockplot
        this.setState({
               chartSeries: [
                   {
                       field: 'age',
                       name: 'Stock Action',
                       color: '#ff7f0e',
                       style: {
                           "strokeWidth": 6,
                           "strokeOpacity": .4,
                           "fillOpacity": .2
                       }
                   }
               ]
           })
           }
    }


  render() {

    return (

          <div>
              <div >
                <LineChart style={liststyle} width= {1000} height= {600} data= {this.state.mydata} options={this.state.myoptions}  />
              </div>
          </div>
    );
  }
}
    var liststyle = {
        float: 'right',
        paddingLeft: 250,
        margin: 50
      };
