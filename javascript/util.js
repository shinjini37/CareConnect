// convert integer rating to the appropiate number of stars
var starRatingString = function (n) {
    var rating = '';
    for (var i=0; i<5; i++){
        if (i<n){
            rating = rating.concat('★');
        } else{
            rating = rating.concat('☆');
        }
    }
    return rating;
};

// map wage to correct group in filter menu
var wageGroup = function (wage) {
    if (wage <= 10) {return 0;}
    else if (wage <= 20) {return 1;}
    else if (wage <= 30) {return 2;}
    else {return 3;}
};
