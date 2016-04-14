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

// map age to correct group in filter menu
var ageGroup = function (age) {
    if (age <= 2) {return 0;}
    else if (age <= 4) {return 1;}
    else if (age <= 7) {return 2;}
    else if (age <= 9) {return 3;}
    else {return 4;}
};
