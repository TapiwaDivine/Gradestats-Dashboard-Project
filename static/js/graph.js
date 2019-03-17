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
        d.readingScore = parseInt(d.readingScore);
        d.writingScore = parseInt(d.writingScore);
    });
    
    show_gender_selector(ndx);
    show_parental_level_of_education_selector(ndx);
    show_average_reading_score(ndx);
    show_reading_score_by_test_prep_coarse(ndx);
    show_reading_fails_by_lunch(ndx);
    show_average_math_score(ndx);
    show_math_score_by_test_prep_coarse(ndx);
    show_math_fails_lunch(ndx);
    show_average_writing_score(ndx);
    show_writing_percentage_by_test_prep_coarse(ndx);
    show_writing_fails_by_lunch(ndx);
    show_math_score_by_range(ndx);
    show_reading_score_range(ndx);
    show_writing_score_range(ndx);
    
    // callback for rendering created functions
    dc.renderAll();
}
//------------------------------------------------------------------------------------------------select menus
function show_gender_selector(ndx){
    var dim = ndx.dimension(dc.pluck('gender'));
    var group = dim.group();
//select menu to show scores by gender   
    dc.selectMenu("#gender-selector")
        .dimension(dim)
        .group(group);
}
function show_parental_level_of_education_selector(ndx){
    var dim = ndx.dimension(dc.pluck('parental-level-of-education'));
    var group = dim.group();
//select menu to scores by the quality of student's lunch   
    dc.selectMenu("#parents-level-of-education-selector")
        .dimension(dim)
        .group(group);
}


//------------------------------------------------------------------------------------ReadingScore Data display
function show_average_reading_score(ndx) {
    var readingDim = ndx.dimension(dc.pluck('race/ethnicity'));
    
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
        .width(400)
        .height(300)
        .margins({top: 50, right: 50, bottom: 50, left: 30})
        .dimension(readingDim)
        .group(averageReadingScore)
        .valueAccessor(function (d) {
                return d.value.average.toFixed(2);
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .colorAccessor(d => d.key)
        .ordinalColors(["#75a3a3","#79CED7", "#39ac73", "#F5821F", "#b366ff"])
        .yAxisLabel("Scores")
        .elasticY(true)
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
        .height(300)
        .radius(110)
        .dimension(pecDim)
        .transitionDuration(500)
        .group(reading_score_by_prep_course)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .legend(dc.legend().x(220).y(10).gap(5))
        .colorAccessor(d => d.key)
        .ordinalColors(["#75a3a3","#79CED7"]);
}


function show_reading_fails_by_lunch(ndx) {
    var  readingDim = ndx.dimension(dc.pluck('lunch'));
    
    var readingScoreFailsByLunchTaken = readingDim.group().reduce(
        function add_item(p, v) {
        p.total++;
        if (v.readingScore <= 49){
        p.match++;
        }
        return p;
        },
    function remove_item(p, v) {
        p.total--;
        if(v.readingScore > 49) {
            p.match--;
        }
        return p;
        },
    
    function initialise() {
        return {total: 0, match: 0};
        }
        
    );
    
    dc.pieChart("#reading-pass-by-lunch")
        .height(300)
        .radius(110)
        .innerRadius(50)
        .dimension(readingDim)
        .group(readingScoreFailsByLunchTaken)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .transitionDuration(500)
        .legend(dc.legend().x(220).y(10).gap(5))
        .colorAccessor(d => d.key)
        .ordinalColors(["#75a3a3","#79CED7"]);
}


//----------------------------------------------------------------------------MathScore Data display

//function for plucking data and calculating math average score
function show_average_math_score(ndx) {
    var mathDim = ndx.dimension(dc.pluck('race/ethnicity'));
   
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
 
//creating the barchart   
var averageMathscore = mathDim.group().reduce(add_item, remove_item, initialise);    
    dc.barChart("#average-math-score")
        .width(400)
        .height(300)
        .margins({top: 50, right: 50, bottom: 50, left: 30})
        .dimension(mathDim)
        .group(averageMathscore)
        .valueAccessor(function (d) {
                return d.value.average.toFixed(2);
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .elasticY(true)
        .colorAccessor(d => d.key)
        .ordinalColors(["#75a3a3","#79CED7", "#39ac73", "#F5821F", "#cc0099"])
        .xUnits(dc.units.ordinal)
        .yAxisLabel('Scores');
}

//function to see the pass percentage of math by student who took the test prep course and those who didnt  
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
        if(v.mathScore > 50) {
            p.match--;
        }
        return p;
        },
    
    function initialise() {
        return {total: 0, match: 0};
        }
        
    );
 
    dc.pieChart("#math-pass-rate")
        .height(300)
        .radius(110)
        .dimension(passDim)
        .transitionDuration(500)
        .group(math_score_by_prep_course)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .legend(dc.legend().x(220).y(10))
}

//
function show_math_fails_lunch(ndx) {
    var  dim = ndx.dimension(dc.pluck('lunch'));
    
    var mathScoreFailsByLunchTaken = dim.group().reduce(
        function add_item(p, v) {
        p.total++;
        if (v.mathScore <= 49){
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
    
    dc.pieChart("#math-fails-by-lunch")
        .height(300)
        .radius(110)
        .innerRadius(50)
        .dimension(dim)
        .group(mathScoreFailsByLunchTaken)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .transitionDuration(500)
        .legend(dc.legend().x(220).y(10));
}
        


//-------------------------------------------------------------------------------------------------writingScores Data display
function show_average_writing_score(ndx) {
    var writingDim = ndx.dimension(dc.pluck('race/ethnicity'));
    
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
        .width(400)
        .height(300)
        .margins({top: 50, right: 50, bottom: 50, left: 30})
        .dimension(writingDim)
        .group(averageWritingscore)
        .valueAccessor(function (d) {
                return d.value.average.toFixed(2);
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colorAccessor(d => d.key)
        .ordinalColors(["#75a3a3","#79CED7", "#39ac73", "#F5821F", "#cc0099"])
        .yAxisLabel("Score")
        .yAxis().ticks(8);
        
}

function show_writing_percentage_by_test_prep_coarse(ndx){
    var pecDim = ndx.dimension(dc.pluck('test-preparation-course'));
    
    var writing_percent_by_prep_course = pecDim.group().reduce(
        function add_item(p, v) {
        p.total++;
        if (v.writingScore >= 50){
        p.match++;
        }
        return p;
        },
    function remove_item(p, v) {
        p.total--;
        if(v.writingScore < 50) {
            p.match--;
        }
        return p;
        },
    
    function initialise() {
        return {total: 0, match: 0};
        }
        
    );
    
    dc.pieChart("#writing-pass-pecentage")
        .height(300)
        .radius(110)
        .dimension(pecDim)
        .transitionDuration(500)
        .group(writing_percent_by_prep_course)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .legend(dc.legend().x(220).y(10));
}

function show_writing_fails_by_lunch(ndx) {
    var  dim = ndx.dimension(dc.pluck('lunch'));
    
    var writingScoreFailsByLunchTaken = dim.group().reduce(
        function add_item(p, v) {
        p.total++;
        if (v.writingScore <= 49){
        p.match++;
        }
        return p;
        },
    function remove_item(p, v) {
        p.total--;
        if(v.writingScore > 49) {
            p.match--;
        }
        return p;
        },
    
    function initialise() {
        return {total: 0, match: 0};
        }
        
    );
    
    dc.pieChart("#writing-pass-by-lunch")
        .height(300)
        .radius(110)
        .innerRadius(50)
        .dimension(dim)
        .group(writingScoreFailsByLunchTaken)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .transitionDuration(500)
        .legend(dc.legend().x(220).y(10));
}


//-------------------------------------------------------------------------------------------reading score range

function show_reading_score_range(ndx) {
    var  dim = ndx.dimension(function(d){
        if(d['readingScore'] < 10){
            return "0-9";
        }
        else if(d['readingScore'] < 20){
            return "10-19";
        }
        else if(d['readingScore'] < 30){
            return "20-29";
        }
        else if(d['readingScore'] < 40){
            return "30-39";
        }
        else if(d['readingScore'] < 50){
            return "40-49";
        }
        else if(d['readingScore'] < 60){
            return "50-59";
        }
        else if(d['readingScore'] < 70){
            return "60-69"; 
        }
        else if(d['readingScore'] < 80){
            return "70-79";
        }
        else if(d['readingScore'] <90){
            return "80-89";
        }
        else return "90+";
    });
    
var scoreRange = dim.group();


dc.rowChart("#reading-score-ranges")
        .height(300)
        .width(900)
        .margins({top: 5, left: 10, right: 10, bottom: 20})
        .colors(d3.scale.category10())
        .transitionDuration(500)
        .dimension(dim)
        .group(scoreRange)
        .elasticX(true)
        .xAxis().ticks(14);
}


//-------------------------------------------------------------------------------------------Math score range

function show_math_score_by_range(ndx) {
    var  dim = ndx.dimension(function(d){
        if(d['mathScore'] < 10){
            return "0-9";
        }
        else if(d['mathScore'] < 20){
            return "10-19";
        }
        else if(d['mathScore'] < 30){
            return "20-29";
        }
        else if(d['mathScore'] < 40){
            return "30-39";
        }
        else if(d['mathScore'] < 50){
            return "40-49";
        }
        else if(d['mathScore'] < 60){
            return "50-59";
        }
        else if(d['mathScore'] < 70){
            return "60-69"; 
        }
        else if(d['mathScore'] < 80){
            return "70-79";
        }
        else if(d['mathScore'] <90){
            return "80-89";
        }
        else return "90+";
    });
    
var scoreRange = dim.group();


dc.rowChart("#math-scores-range")
        .height(300)
        .width(900)
        .margins({top: 5, left: 10, right: 10, bottom: 20})
        .colors(d3.scale.category10())
        .transitionDuration(500)
        .dimension(dim)
        .group(scoreRange)
        .elasticX(true)
        .xAxis().ticks(14);
}


//--------------------------------------------------------------------------------------writing score ranges


function show_writing_score_range(ndx) {
    var  dim = ndx.dimension(function(d){
        if(d['writingScore'] < 10){
            return "0-9";
        }
        else if(d['writingScore'] < 20){
            return "10-19";
        }
        else if(d['writingScore'] < 30){
            return "20-29";
        }
        else if(d['writingScore'] < 40){
            return "30-39";
        }
        else if(d['writingScore'] < 50){
            return "40-49";
        }
        else if(d['writingScore'] < 60){
            return "50-59";
        }
        else if(d['writingScore'] < 70){
            return "60-69"; 
        }
        else if(d['writingScore'] < 80){
            return "70-79";
        }
        else if(d['writingScore'] <90){
            return "80-89";
        }
        else return "90+";
    });
    
var scoreRange = dim.group();


dc.rowChart("#writing-score-ranges")
        .height(300)
        .width(900)
        .margins({top: 5, left: 10, right: 10, bottom: 20})
        .colors(d3.scale.category10())
        .transitionDuration(500)
        .dimension(dim)
        .group(scoreRange)
        .elasticX(true)
        .xAxis().ticks(14);
}