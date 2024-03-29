function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
      console.log(data);
            var names = data.samples.map(x=>x.id)
            names.forEach(function(name) {
            d3.select('#selDataset')
                .append('option')
                .text(name)
            });
    var sample_values = data.samples.map(x=> x.sample_values);
    var otu_ids = data.samples.map(x=> x.otu_ids);
    var otu_label = data.samples.map(x=> x.otu_labels);
    var sorted_test = sample_values.sort(function(a, b){return b-a});
    var top_ten = sorted_test.map(x => x.slice(0,10));
    var sorted_ids = otu_ids.sort(function(a, b){return b-a});
    var top_ids = sorted_ids.map(x =>x.slice(0,10));
    var sorted_labels = otu_label.sort(function(a, b){return b-a});
    var top_labels = sorted_labels.map(x =>x.slice(0,10))
    var firstID = data.metadata[0]// first id
    var sampleMetadata1 = d3.select("#sample-metadata").selectAll('h1')
    var sampleMetadata = sampleMetadata1.data(Object.entries(firstID))
    sampleMetadata.enter()
                  .append('h1')
                  .merge(sampleMetadata)
    //              .text(d => ${d.key} : ${d.value})
                  .style('font-size','50%')
    sampleMetadata.exit().remove()
    var trace1 = {
        x : top_ten[0],
        y : top_ids[0].map(x => "OTU" + x),
        text : top_labels[0],
        type : 'bar',
        orientation : 'h',
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending',
          }],
        marker: {
          color: 'rgb(27, 161, 187)',
          opacity: 0.6,
          line: {
            color: 'rgb(8,48,107)',
            width: 1.5
          }
        }
    };
    var layout1 = {
        title : '<b>Top 10 OTU</b>',
    };
    var data = [trace1];
    var config = {responsive:true}
    Plotly.newPlot('bar', data, layout1,config);
    var trace2 = {
        x : otu_ids[0],
        y : sample_values[0],
        text : otu_label[0],
        mode : 'markers',
        marker : {
            color : otu_ids[0],
            size : sample_values[0]
        }
    };
    var layout2 = {
        title: '<b>Bubble Chart</b>',
        automargin: true,
        autosize: true,
        showlegend: false,
            margin: {
                l: 150,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
    }};
    var data2 = [trace2];
    var config = {responsive:true}
    Plotly.newPlot('bubble',data2,layout2,config);
    var firstWFreq = firstID.wfreq;
    var firstWFreqDeg = firstWFreq * 20;
    var degrees = 180 - firstWFreqDeg;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(degrees * Math.PI / 180);
    var y = radius * Math.sin(degrees * Math.PI / 180);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    var mainPath = path1,
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
    var dataGauge = [
        {
          type: "scatter",
          x: [0],
          y: [0],
          marker: { size: 12, color: "(27,161,187,1)" },
          showlegend: false,
          name: "Freq",
          text: firstWFreq,
          hoverinfo: "text+name"
        },
        {
          values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
          rotation: 90,
          text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
          textinfo: "text",
          textposition: "inside",
          marker: {
            colors: [
              'rgba(27,161,187,0.7)',
              'rgba(54,170,191,0.6)',
              'rgba(80,178,194,0.6)',
              'rgba(107,187,198,0.5)',
              'rgba(134,196,201,0.5)',
              'rgba(160,204,205,0.4)',
              'rgba(187,213,208,0.4)',
              'rgba(213,221,212,0.3)',
              'rgba(240,230,215,0.3)',
              'rgba(225,225,225,0)',
            ]
          },
          labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
          hoverinfo: "label",
          hole: 0.5,
          type: "pie",
          showlegend: false
        }
      ];
    var layoutGauge = {
        shapes: [
          {
            type: "path",
            path: path,
            fillcolor: "rgba(27,161,187,1)",
            line: {
              color: "rgba(27,161,187,1)"
            }}],
        title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
        height: 550,
        width: 550,
        xaxis: {
          zeroline: false,
          showticklabels: false,
          showgrid: false,
          range: [-1, 1]
        },
        yaxis: {
          zeroline: false,
          showticklabels: false,
          showgrid: false,
          range: [-1, 1]
        }};
      var config = {responsive:true}
      Plotly.newPlot('gauge', dataGauge,layoutGauge,config);
  });
  };
  function updatePlotly(id) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
      console.log(data);
        var test = data.samples.filter(x => x.id === id);
        var sample_values = test.map(x => x.sample_values).sort(function(a, b){return b-a});
        var top_values = sample_values.map(x => x.slice(0,10));
        var otu_ids = test.map(x=> x.otu_ids).sort(function(a, b){return b-a});
        var top_ids = otu_ids.map(x => x.slice(0,10));
        var otu_label = test.map(x=> x.otu_labels).sort(function(a, b){return b-a});
        var top_labels = otu_label.map(x => x.slice(0,10));
        var metadataSamples = data.metadata.filter(x => x.id === +id)[0];
        var sampleMetadata1 = d3.select("#sample-metadata").selectAll('h1')
        var sampleMetadata = sampleMetadata1.data(d3.entries(metadataSamples))
        sampleMetadata.enter()
                      .append('h1')
                      .merge(sampleMetadata)
//                      .text(d => ${d.key} : ${d.value})
                      .style('font-size','50%')
        var wFreq = metadataSamples.wfreq;
        var wFreqDeg = wFreq * 20;
        var degrees = 180 - wFreqDeg;
        var radius = 0.5;
        var radians = (degrees * Math.PI) / 180;
        var x = radius * Math.cos(degrees * Math.PI / 180);
        var y = radius * Math.sin(degrees * Math.PI / 180);
        var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        var mainPath = path1,
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);
        var dataGauge = [
            {
            type: "scatter",
            x: [0],
            y: [0],
            marker: { size: 12, color: "rgba(27,161,187,1)" },
            showlegend: false,
            name: "Freq",
            text: wFreq,
            hoverinfo: "text+name"
            },
            {
            values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
            rotation: 90,
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {
              colors: [
                'rgba(27,161,187,0.7)',
                'rgba(54,170,191,0.6)',
                'rgba(80,178,194,0.6)',
                'rgba(107,187,198,0.5)',
                'rgba(134,196,201,0.5)',
                'rgba(160,204,205,0.4)',
                'rgba(187,213,208,0.4)',
                'rgba(213,221,212,0.3)',
                'rgba(240,230,215,0.3)',
                'rgba(225,225,225,0)',
              ]
            },
            labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            hoverinfo: "label",
            hole: 0.5,
            type: "pie",
            showlegend: false
          }
        ];
  var layoutGauge = {
          shapes: [
            {
              type: "path",
              path: path,
              fillcolor: "rgba(27,161,187,1)",
              line: {
                color: "rgba(27,161,187,1)"
                }
            }
            ],
            title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
            height: 550,
            width: 550,
            xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
            },
            yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
            }
        };
        var config = {responsive:true}
        Plotly.newPlot('gauge', dataGauge,layoutGauge,config);
            var trace = {
            x : top_values[0],
            y : top_ids[0].map(x => "OTU" + x),
            text : top_labels[0],
            type : 'bar',
            orientation : 'h',
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
              }],
              marker: {
                color: 'rgb(27, 161, 187)',
                opacity: 0.6,
                line: {
                  color: 'rgb(8,48,107)',
                  width: 1.5
                }
              }
        };
        var layout1 = {
            title: "<b>Top 10 OTU</b>"
        };
        var data1 = [trace];
        var config = {responsive:true}
        Plotly.newPlot('bar', data1,layout1,config);
        var trace2 = {
            x : test.map(x=> x.otu_ids)[0],
            y : test.map(x => x.sample_values)[0],
            text : test.map(x=> x.otu_labels),
            mode : 'markers',
            marker : {
                color : test.map(x=> x.otu_ids)[0],
                size : test.map(x => x.sample_values)[0]
            }
        };
        var layout2 = {
            title: '<b>Bubble Chart</b>',
            automargin: true,
            autosize: true,
            showlegend: false,
            margin: {
                l: 150,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
              }
        };
        var data2 = [trace2];
        var config = {responsive:true}
        Plotly.newPlot('bubble', data2,layout2,config)
    });
  };
  function optionChanged(id) {
    updatePlotly(id);
  };
  init();














