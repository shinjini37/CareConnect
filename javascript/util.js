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
