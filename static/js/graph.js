queue()
//loading the data
    .defer(d3.csv, "data/StudentsPerformance.csv")
    .await(graphMaker);
    
//injecting data into the function below   
function graphMaker(error, studentsData){
    var ndx = crossfilter(studentsData);
    
//parsing data into intergers    
    studentsData.forEach(function(d){
        d.mathScore = parseInt(d.mathScore);
        d.readingScore = parseInt(d.writingScore);
        d.writingScore = parseInt(d.readingScore);
    })
    
    show_gender_selector(ndx);
    show_ethnicity_selector(ndx);
    show_average_math_score(ndx);
    show_math_score_by_test_prep_coarse(ndx);
    show_average_reading_score(ndx);
    show_reading_score_by_test_prep_coarse(ndx);
    show_average_writing_score(ndx);
    
    // callback for rendering created functions
    dc.renderAll();
}

function show_gender_selector(ndx){
    var dim = ndx.dimension(dc.pluck('gender'));
    var group = dim.group();
//select menu to show scores by gender   
    dc.selectMenu("#gender-selector")
        .dimension(dim)
        .group(group);
}
function show_ethnicity_selector(ndx){
    var dim = ndx.dimension(dc.pluck('race/ethnicity'));
    var group = dim.group();
//select menu to scores by the quality of student's lunch   
    dc.selectMenu("#lunch-quality-selector")
        .dimension(dim)
        .group(group);
}

function show_average_math_score(ndx) {
    var mathDim = ndx.dimension(dc.pluck('parental-level-of-education'));
    
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
    
var averageMathscore = mathDim.group().reduce(add_item, remove_item, initialise);    
    dc.barChart("#average-math-score")
        .width(500)
        .height(300)
        .margins({top: 50, right: 50, bottom: 30, left: 50})
        .dimension(mathDim)
        .group(averageMathscore)
        .valueAccessor(function (d) {
                return d.value.average.toFixed(2);
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Math Average Scores by Parents Education ")
        .yAxis().ticks(8);
        
}

function show_math_score_by_test_prep_coarse(ndx){
    var passDim = ndx.dimension(dc.pluck('test-preparation-course'));
    
    var math_score_by_prep_course = passDim.group().reduce(
        function add_item(p, v) {
        p.total++;
        if (v.mathScore >= 50){
        p.match++;
        }
        return p;
        },
    function remove_item(p, v) {
        p.total--;
        if(v.mathScore < 50) {
            p.match--;
        }
        return p;
        },
    
    function initialise() {
        return {total: 0, match: 0};
        }
        
    );
    
    dc.pieChart("#math-pass-rate")
        .height(400)
        .radius(120)
        .dimension(passDim)
        .transitionDuration(1500)
        .group(math_score_by_prep_course)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .legend(dc.legend().x(320).y(40));
}

function show_average_reading_score(ndx) {
    var readingDim = ndx.dimension(dc.pluck('parental-level-of-education'));
    
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


var averageReadingScore = readingDim.group().reduce(add_item, remove_item, initialise);    
    dc.barChart("#average-reading-score")
        .width(500)
        .height(300)
        .margins({top: 10, right: 50, bottom: 50, left: 50})
        .dimension(readingDim)
        .group(averageReadingScore)
        .valueAccessor(function (d) {
                return d.value.average.toFixed(2);
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Reading Average Scores By Ethinic Group")
        .yAxis().ticks(8);
        
}

function show_reading_score_by_test_prep_coarse(ndx){
    var pecDim = ndx.dimension(dc.pluck('test-preparation-course'));
    
    var reading_score_by_prep_course = pecDim.group().reduce(
        function add_item(p, v) {
        p.total++;
        if (v.readingScore >= 50){
        p.match++;
        }
        return p;
        },
    function remove_item(p, v) {
        p.total--;
        if(v.readingScore < 50) {
            p.match--;
        }
        return p;
        },
    
    function initialise() {
        return {total: 0, match: 0};
        }
        
    );
    
    dc.pieChart("#reading-pass-pec")
        .height(350)
        .radius(120)
        .dimension(pecDim)
        .transitionDuration(1500)
        .group(reading_score_by_prep_course)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .legend(dc.legend().x(320).y(50));
}

function show_average_writing_score(ndx) {
    var writingDim = ndx.dimension(dc.pluck('parental-level-of-education'));
    
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
    
var averageWritingscore = writingDim.group().reduce(add_item, remove_item, initialise);    
    dc.barChart("#average-writing-score")
        .width(500)
        .height(300)
        .margins({top: 10, right: 50, bottom: 50, left: 50})
        .dimension(writingDim)
        .group(averageWritingscore)
        .valueAccessor(function (d) {
                return d.value.average.toFixed(2);
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Writing Average Score Ethinic Group")
        .yAxis().ticks(8);
        
}

