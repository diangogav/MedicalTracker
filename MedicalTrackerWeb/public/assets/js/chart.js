function meanChartPulseOxygen(xLabel,yOxygen,yPulse){


    Highcharts.chart('barChart', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Oxygen and Pulse Data'
      },
      subtitle: {
          text: 'average of the last 10 days'
      },
      xAxis: {
          categories: xLabel,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Mean (%)'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [{
        name: 'Oxygen',
        color: '#098bf8',
        data: yOxygen
  
      }, {
        name: 'Pulse',
        color: '#ea171b',
        data: yPulse
      }]
  });
  }
  
  
  function chart(x,yOxygen,yPulse,actualDay){
  
    Highcharts.chart('dataChart', {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Latest data'
      },
      subtitle: {
          text: actualDay
      },
      xAxis: {
          categories: x
      },
      yAxis: {
          title: {
              text: 'Oxygen and Pulse (%)'
          }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: false
          }
      },
      series: [{
          name: 'Oxygen',
          color: '#098bf8',
          data: yOxygen
      }, {
          name: 'Pulse',
          color: '#ea171b',
          data: yPulse
      }]
    });
  
  }