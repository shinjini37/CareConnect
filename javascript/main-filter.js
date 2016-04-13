// main page: filter and sort handlers

// convert integer rating to the appropiate number of stars
var starRatingString = function (n) {
    if (n === 0) {
        return '';
    } else {
        return '★' + starRatingString(n-1);
    }
};

// change the profile container to show specified profiles
var insertMiniProfileElts = function (profiles) {
    $('#profile-container').empty();
    profiles.forEach(function (profile) {
        // create mini-profile element
        var baseElt = $('<div/>', {
            class: 'row mini-profile',
        });
        var leftElt = $('<div/>', {
            class: 'col-xs-6',
        });
        var infoElt = $('<div/>', {
            class: 'row babysitter-info',
        });
        var nameElt = $('<div>', {
            class: 'col babysitter-name',
        });
        var nameLinkElt = $('<a>', {
            href: 'profile.html',
            text: profile.name,
        });
        nameElt.append(nameLinkElt);
        infoElt.append(nameElt);
        var wageElt = $('<div/>', {
            class: 'col babysitter-wage',
            text: '$' + profile.wage,
        });
        infoElt.append(wageElt);
        var ratingElt = $('<div/>', {
            class: 'col babysitter-rating',
            text: starRatingString(profile.rating),
        });
        infoElt.append(ratingElt);
        leftElt.append(infoElt);
        var aboutElt = $('<div/>', {
            class: 'row babysitter-about-me',
            text: profile.about,
        });
        leftElt.append(aboutElt);
        baseElt.append(leftElt);
        var rightElt = $('<div/>', {
            class: 'col-xs-6',
        });
        var calendarElt = $('<div/>', {
            class: 'babysitter-calendar',
            text: 'Calendar will be here!',
        });
        rightElt.append(calendarElt);
        baseElt.append(rightElt);
        $('#profile-container').append(baseElt);
    });
};

$(function () {
    // on load
    $('#profile-container').append(insertMiniProfileElts(PROFILES));
    // reset button handler
    $('#filter-reset').click(function () {
        $('#filter :input:checked').prop('checked', '');
    });
    // sort-by select handler
    $('#sort-select').on('change', function () {
        var sortCriterion = $(this).val();
        var sortFunction;
        if (sortCriterion === 'payLow') {
            sortFunction = function(p1, p2) {return p1.wage-p2.wage;};
        } else if (sortCriterion === 'payHigh') {
            sortFunction = function(p1, p2) {return p2.wage-p1.wage;};
        } else if (sortCriterion === 'ratingLow') {
            sortFunction = function(p1, p2) {return p1.rating-p2.rating;};
        } else if (sortCriterion === 'payHigh') {
            sortFunction = function(p1, p2) {return p2.rating-p1.rating;};
        }
        // don't modeify existing array
        insertMiniProfileElts(PROFILES.slice(0).sort(sortFunction));
    });
});
