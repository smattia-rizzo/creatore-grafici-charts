let funzionatore = {
    xMin : -10,
    xMax : 10,
    parabola(a,b,c){
        let array = [["number", "parabola"]]
        for (let x = this.xMin; x <= this.xMax; x++) {
            array.push([x, (a*(x*x)+b*(x)+c)])
        }
        return array;
    },
    retta(m,q){
        let array = [["number", "parabola"]]
        for (let x = this.xMin; x <= this.xMax; x++) {
            array.push([x, m*x+q])
        }
        return array;
    }
    
}




// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  /*
  var data = google.visualization.arrayToDataTable([
    ['number', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);*/

  var data = google.visualization.arrayToDataTable(funzionatore.parabola(2,0,0));
  //var data = google.visualization.arrayToDataTable(funzionatore.retta(0,4));
  // Set chart options
  var options = {title:'Grafico a funzione',
                 width:700,
                 height:600,
                 curveType: 'function',
                 legend: { position: 'bottom' }};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.LineChart(document.getElementById('grafico'));
  chart.draw(data, options);
}