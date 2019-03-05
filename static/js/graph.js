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
    show_parental_level_of_education_selector(ndx);
    show_average_math_score(ndx);
    show_math_score_by_test_prep_coarse(ndx);
    show_math_pass_lunch(ndx);
    show_average_reading_score(ndx);
    show_reading_score_by_test_prep_coarse(ndx);
    show_reading_pass_by_lunch(ndx);
    show_average_writing_score(ndx);
    show_writing_percentage_by_test_prep_coarse(ndx);
    show_writing_pass_by_lunch(ndx);
    show_math_score_range(ndx);
    
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
        .margins({top: 10, right: 50, bottom: 50, left: 50})
        .dimension(mathDim)
        .group(averageMathscore)
        .valueAccessor(function (d) {
                return d.value.average.toFixed(2);
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxisLabel('Scores')
        .xAxisLabel("Math Scores By Parental Education");
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
        .height(300)
        .radius(120)
        .dimension(passDim)
        .transitionDuration(1000)
        .group(math_score_by_prep_course)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .legend(dc.legend().x(320).y(40))
}



function show_math_pass_lunch(ndx) {
    var  dim = ndx.dimension(dc.pluck('lunch'));
    
    var mathScorePassByLunchTaken = dim.group().reduce(
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
    
    dc.pieChart("#math-pass-by-lunch")
        .height(300)
        .radius(120)
        .innerRadius(50)
        .dimension(dim)
        .group(mathScorePassByLunchTaken)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .transitionDuration(1500)
        .legend(dc.legend().x(320).y(40));
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
        .xAxisLabel("Reading Average Scores By Parental Education")
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
        .radius(120)
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
        .legend(dc.legend().x(320).y(50));
}


function show_reading_pass_by_lunch(ndx) {
    var  readingDim = ndx.dimension(dc.pluck('lunch'));
    
    var readingScorePassByLunchTaken = readingDim.group().reduce(
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
    
    dc.pieChart("#reading-pass-by-lunch")
        .height(300)
        .radius(120)
        .innerRadius(50)
        .dimension(readingDim)
        .group(readingScorePassByLunchTaken)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .transitionDuration(1500)
        .legend(dc.legend().x(320).y(40));
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
        .xAxisLabel("Writing Average Score by Parental Educational")
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
        .radius(120)
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
        .legend(dc.legend().x(320).y(50));
}

function show_writing_pass_by_lunch(ndx) {
    var  dim = ndx.dimension(dc.pluck('lunch'));
    
    var writingScorePassByLunchTaken = dim.group().reduce(
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
    
    dc.pieChart("#writing-pass-by-lunch")
        .height(300)
        .radius(120)
        .innerRadius(50)
        .dimension(dim)
        .group(writingScorePassByLunchTaken)
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(2) * 100;
            } else {
                return 0;
            }
        })
        .transitionDuration(500)
        .legend(dc.legend().x(320).y(40));
}

//-------------------------------------------------------------------------------------------Math score range

function show_math_score_range(ndx) {
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


dc.pieChart("#math-score-ranges")
        .height(250)
        .radius(100)
        .transitionDuration(1000)
        .dimension(dim)
        .group(scoreRange)
        .minAngleForLabel(.2);
}
