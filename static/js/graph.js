queue()
//loading the data
    .defer(d3.csv, "data/StudentsPerformance.csv")
    .await(graphMaker);
    
//injecting data into the function below   
function graphMaker(error, studentsData){
    var ndx = crossfilter(studentsData);
    
//pasing data into intergers    
    studentsData.forEach(function(d){
        d.mathScore = parseInt(d.mathScore);
        d.readingScore = parseInt(d.writingScore);
        d.writingScore = parseInt(d.readingScore);
    })
    
    show_gender_selector(ndx); 
    show_average_math_score(ndx);
    show_average_reading_score(ndx);
    show_average_writing_score(ndx);
    
    // callback for rendering created functions
    dc.renderAll();
}

function show_gender_selector(ndx){
    var dim = ndx.dimension(dc.pluck('gender'));
    var group = dim.group();
//select menu     
    dc.selectMenu("#gender-selector")
        .dimension(dim)
        .group(group);
}

function show_average_math_score(ndx) {
    var dim = ndx.dimension(dc.pluck('race/ethnicity'));
    
    function add_item(p, v) {
        p.count++;
        p.total += v.mathScore;
        p.average = p.total / p.count;
        return p;
    }
    
    function remove_item(p, v) {
        p.count--;
        if (p.count == 0) {
            p.total = 0;
            p.average = 0;
        }else {
            p.total -= v.mathScore;
            p.average = p.total / p.count;
        }
        return p;
    }
    
    function initialise() {
        return {count: 0, total: 0, average: 0};
    }
    
var averageMathscore = dim.group().reduce(add_item, remove_item, initialise);    
    dc.barChart("#average-math-score")
        .width(450)
        .height(300)
        .margins({top: 10, right: 50, bottom: 50, left: 50})
        .dimension(dim)
        .group(averageMathscore)
        .valueAccessor(function (d) {
                return d.value.average.toFixed(2);
        })
        .transitionDuration(900)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Ethinic Group")
        .yAxis().ticks(20);
        
}

function show_average_reading_score(ndx) {
    var dim = ndx.dimension(dc.pluck('race/ethnicity'));
    
    function add_item(p, v) {
        p.count++;
        p.total += v.readingScore;
        p.average = p.total / p.count;
        return p;
    }
    
    function remove_item(p, v) {
        p.count--;
        if (p.count == 0) {
            p.total = 0;
            p.average = 0;
        }else {
            p.total -= v.readingScore;
            p.average = p.total / p.count;
        }
        return p;
    }
    
    function initialise() {
        return {count: 0, total: 0, average: 0};
    }
    
var averageReadingscore = dim.group().reduce(add_item, remove_item, initialise);    
    dc.barChart("#average-reading-score")
        .width(450)
        .height(300)
        .margins({top: 10, right: 50, bottom: 50, left: 50})
        .dimension(dim)
        .group(averageReadingscore)
        .valueAccessor(function (d) {
                return d.value.average.toFixed(2);
        })
        .transitionDuration(900)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Ethinic Group")
        .yAxis().ticks(20);
        
}

function show_average_writing_score(ndx) {
    var dim = ndx.dimension(dc.pluck('race/ethnicity'));
    
    function add_item(p, v) {
        p.count++;
        p.total += v.writingScore;
        p.average = p.total / p.count;
        return p;
    }
    
    function remove_item(p, v) {
        p.count--;
        if (p.count == 0) {
            p.total = 0;
            p.average = 0;
        }else {
            p.total -= v.writingScore;
            p.average = p.total / p.count;
        }
        return p;
    }
    
    function initialise() {
        return {count: 0, total: 0, average: 0};
    }
    
var averageWritingscore = dim.group().reduce(add_item, remove_item, initialise);    
    dc.barChart("#average-writing-score")
        .width(450)
        .height(300)
        .margins({top: 10, right: 50, bottom: 50, left: 50})
        .dimension(dim)
        .group(averageWritingscore)
        .valueAccessor(function (d) {
                return d.value.average.toFixed(2);
        })
        .transitionDuration(900)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Ethinic Group")
        .yAxis().ticks(20);
        
}