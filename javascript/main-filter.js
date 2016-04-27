// main page: filter and sort handlers

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
            href: 'profile.html'+ '?profile=' + profile.name.toLowerCase(),
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
            class: 'col-xs-6'
        });
        var calendarElt = $('<div/>', {
            class: 'babysitter-calendar',
            text: 'Calendar will be here!',
        });
        generateMiniCalendar(rightElt, profile.availability);
        //rightElt.append(calendarElt);
        baseElt.append(rightElt);
        $('#profile-container').append(baseElt);
    });
};

// sort profiles based on criterion selected; returns new array
var sortProfiles = function (profiles) {
    var sortCriterion = $('#sort-select').val();
    var sortFunction;
    if (sortCriterion === 'payLow') {
        sortFunction = function(p1, p2) {return p1.wage - p2.wage;};
    } else if (sortCriterion === 'payHigh') {
        sortFunction = function(p1, p2) {return p2.wage - p1.wage;};
    } else if (sortCriterion === 'ratingLow') {
        sortFunction = function(p1, p2) {return p1.rating - p2.rating;};
    } else if (sortCriterion === 'ratingHigh') {
        sortFunction = function(p1, p2) {return p2.rating - p1.rating;};
    } else {
        console.log('Invalid sort criterion!');
    }
    // don't modify existing array
    if (sortFunction !== undefined) {
        return _.clone(profiles).sort(sortFunction);
    } else {
        return _.clone(profiles);
    }
};

// extract values of an array of jquery input objects
var getValues = function (arr) {
    return arr.toArray().map(function (elt) {
        return parseInt(elt.value);
    });
};

// convert AM/PM time to 24-hour
var convertTo24HrTime = function (s) {
    var hr = parseInt(s.substring(0, s.length-2)) % 12;
    var modifier = s.substring(s.length-2);
    if (modifier.toLowerCase() === 'am') {
        return hr;
    } else if (modifier.toLowerCase() === 'pm') {
        return hr+12;
    }
};

// filter profile
var filterProfiles = function (profiles) {
    // filter by wage
    var filterByWage = function (profs) {
        var checkedPayRangeElts = $('#filter-payrange :input:checked');
        if (checkedPayRangeElts.length === 0 ||
            checkedPayRangeElts.length === $('#filter-payrange input').length) {
            return profs;
        } else {
            var checkedPayRangeGroups = getValues(checkedPayRangeElts);
            return profs.filter(function (prof) {
                return (checkedPayRangeGroups.indexOf(wageGroup(prof.wage)) > -1);
            });
        }
    };
    // filter by child age
    var filterByChildAge = function (profs) {
        var checkedAgeRangeElts = $('#filter-agerange :input:checked');
        if (checkedAgeRangeElts.length === 0 ||
            checkedAgeRangeElts.length === $('#filter-agerange input').length) {
            return profs;
        } else {
            var checkedAgeRangeGroups = getValues(checkedAgeRangeElts);
            return profs.filter(function (prof) {
                var desiredAgeRangeGroups = _.uniq(prof.ageRange.map(ageGroup), true);
                return (_.intersection(desiredAgeRangeGroups, checkedAgeRangeGroups).length > 0);
            });
        }
    };
    // filter by time
    var filterByTime = function (profs) {
        var DAYS_OF_THE_WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        var desiredTimes = getDesiredTimes();
        var validDayFilters = [];
        desiredTimes.forEach(function (times, idx) {
            if (times.length > 0) {
                validDayFilters.push(idx);
            }
        });
        if (validDayFilters.length === 0) {
            return profs;
        } else {
            return profs.filter(function (prof) {
                return validDayFilters.some(function (idx) {
                    var day = DAYS_OF_THE_WEEK[idx];
                    var available = prof.availability[idx].map(convertTo24HrTime);
                    if (_.intersection(available, desiredTimes[idx]).length > 0) {
                        return true;
                    }
                });
            });
        }
    };
    // main function
    return filterByTime(filterByChildAge(filterByWage(profiles)));
};


$(function () {
    var shownProfiles = PROFILES;
    var changeShownProfiles = function () {
        shownProfiles = filterProfiles(PROFILES);
        insertMiniProfileElts(sortProfiles(shownProfiles));
    };
    // on load
    // add mini-profiles
    insertMiniProfileElts(sortProfiles(shownProfiles));
    // add calendar and its handlers
    $('#filter-date').append(createCalendar());
    $('#filter-date').on('timeUpdated', function () {
        changeShownProfiles();
    });
    // reset button handler
    $('#filter-reset').click(function () {
        $('#filter :input:checked').prop('checked', '');
        changeShownProfiles();
        clearDesiredTimes();
    });
    // clicking pay/age range = clicking checkbox
    $('.payrange, .agerange').click(function () {
        var input = $(this).parent().find('input');
        input.prop('checked', !input.prop('checked'));
    });
    // apply filter automatically whenever the user checks a box
    $('#filter :input').change(function () {
        changeShownProfiles();
    });
    // sort-by select handler
    $('#sort-select').on('change', function () {
        // no need to run filter again
        insertMiniProfileElts(sortProfiles(shownProfiles));
    });

    // filter extend to bottom of div
    var height = $("#profile-sort-container").css("height");
    $("#filter").css({height: height});


    // Make filter bar scroll with window. This can be made better
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var navHeight = $("#navigation").css("height");
        navHeight = navHeight.slice(0,-2);
        navHeight = parseInt(navHeight);
        var filterFloatHeight = $("#filter .float").css("height");
        filterFloatHeight = filterFloatHeight.slice(0,-2);
        filterFloatHeight = parseInt(filterFloatHeight);
        var containerHeight = $(".container").css("height");
        containerHeight = containerHeight.slice(0,-2);
        containerHeight = parseInt(containerHeight);

        // if the filter bar hits the bottom
        if ((scrollTop > containerHeight - filterFloatHeight - 15)){
            $('#filter .float').css({
                position:"absolute",
                "top": (containerHeight - 15 - navHeight - filterFloatHeight)
            });
        } else if (scrollTop>navHeight){ // if the scroll has passed the nav bar
            $('#filter .float').css({
                position:"fixed",
                top:0,
                width: $('#filter').css("width"),
                "padding-top": 0
            });
        } else { // back to normal view
            $('#filter .float').css({
                'position':"relative",
                "padding-top": 0
            });
        }
    });


});
