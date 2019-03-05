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
        d.mathScoreBucket = createScoreBucket(d.mathScore);
    })

    show_math_score_range(ndx);
    
    // callback for rendering created functions
    dc.renderAll();
}
//------------------------------------------------------------------------------------------------select menus
function createScoreBucket(score){
    if(score < 10){
        return "0-9";
    }
    else if(score < 20){
        return "10-19";
    }
    else if(score < 30){
        return "20-29";
    }
    else if(score < 40){
        return "30-39";
    }
    else if(score < 50){
        return "40-49";
    }
    else if(score < 60){
        return "50-59";
    }
    else if(score < 70){
        return "60-69"; 
    }
    else if(score < 80){
        return "70-79";
    }
    else if(score <90){
        return "80-89";
    }
    else return "90+";
}


function show_math_score_range(ndx) {
    var dim = ndx.dimension(dc.pluck('mathScoreBucket'));
    var scoreRange = dim.group();


dc.rowChart("#math-score-ranges")
        .height(250)
        .width(600)
        .transitionDuration(1000)
        .dimension(dim)
        .group(scoreRange);
}
