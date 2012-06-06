
var chart;
function show_pie_chart(description, target, responses) {
  chart = new Highcharts.Chart({
    chart: {
      renderTo: target,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: description
    },
    tooltip: {
      formatter: function() {
        return '<b>'+ this.point.name +'</b>: '+ Math.round(this.percentage*100)/100 +' %';
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          color: '#000000',
          connectorColor: '#000000',
          formatter: function() {
            return '<b>'+ this.point.name +'</b>: '+ Math.round(this.percentage*100)/100 +' %';
          }
        }
      }
    },
    credits: {
        enabled: false
    },
      series: [{
      type: 'pie',
      name: 'response data',
      data: responses
    }]
  });
}

function show_bar_chart(description, target, options, responses) {
  chart = new Highcharts.Chart({
    chart: {
        renderTo: target,
        type: 'bar'
    },
    title: {
        text: description
    },
    xAxis: {
        categories: options,
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: null
        }
    },
    tooltip: {
        formatter: function() {
            return ''+
                this.series.name +': '+ Math.round(this.y * 10)/10 +'';
        }
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                formatter:function(){return''+Math.round(this.y * 10)/10+''}
            }
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Number of responses',
        data: responses
    }]
  });
}
