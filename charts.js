let form = document.forms[0];
let campi = document.getElementById("campi");
let grafico = document.getElementById("grafico");

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


function controllaSelezione(controllo){
    let selezionato = form.forma.value;
    switch (selezionato) {
        case "1":
            //Parabola
            if (!controllo) {
                campi.innerHTML = '<label for="a">a<input type="text" name="a" id="a"></label><label for="b">b<input type="text" name="b" id="b"></label><label for="c">c<input type="text" name="c" id="c"></label>'
            }
            
            return true;
            break;
    
        case "2":
            //Retta
            if (!controllo) campi.innerHTML = '<label for="m">m<input type="text" name="m" id="m"></label><label for="q">q<input type="text" name="q" id="q"></label>'
            return true;
            break;
        default:
            campi.innerHTML = "<p>Seleziona una opzione</p>"
            return false;
            break;
    }
}


form.forma.addEventListener("change", () => controllaSelezione(false))



form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (controllaSelezione(true)) {
        let selezionato = form.forma.value;
        let array;
        switch (selezionato) {
            case "1":
                //creaParabola
                let a = parseInt(form.a.value);
                let b = parseInt(form.b.value);
                let c = parseInt(form.c.value);
                if (!isNaN(a)&&!isNaN(b)&&!isNaN(c)) {
                    array = funzionatore.parabola(a, b, c);
                } else {
                    grafico.innerHTML = "<h2>Errore nei parametri</h2>"
                    return;
                }
                break;
            
            case "2":
                //creaRetta
                let m = parseInt(form.m.value);
                let q = parseInt(form.q.value);
                if (!isNaN(m)&&!isNaN(q)) {
                    array = funzionatore.retta(m, q);
                } else {
                    grafico.innerHTML = "<h2>Errore nei parametri</h2>"
                    return;
                }
                break;
        }

        google.charts.setOnLoadCallback(drawChart(array));
    }

})










// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(array) {

  // Create the data table.
  /*
  var data = google.visualization.arrayToDataTable([
    ['number', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);*/

  var data = google.visualization.arrayToDataTable(array);
  //var data = google.visualization.arrayToDataTable(funzionatore.retta(0,4));
  // Set chart options
  var options = {title:'Grafico a funzione',
                 width:800,
                 height:600,
                 curveType: 'function',
                 legend: { position: 'bottom' }};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.LineChart(grafico);
  chart.draw(data, options);
}