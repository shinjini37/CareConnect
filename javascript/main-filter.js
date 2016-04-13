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
            href: 'profile.html?id=' + profile.index,
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
    } else if (sortCriterion === 'payHigh') {
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

// filter profile
var filterProfiles = function (profiles) {
    // map wage to correct group
    var wageGroup = function (wage) {
        if (wage <= 10) {return 0;}
        else if (wage <= 20) {return 1;}
        else if (wage <= 30) {return 2;}
        else {return 3;}
    };
    // filter by wage
    var filterByWage = function (profs) {
        // warning: jq map has a different argument order, so we use standard array instead
        var checkedPayRangeElts = $('#filter-payrange :input:checked').toArray();
        if (checkedPayRangeElts.length === 0 ||
            checkedPayRangeElts.length === $('#filter-payrange input').length) {
            return profs;
        } else {
            var checkedPayRangeGroups = checkedPayRangeElts.map(function (elt) {
                return parseInt(elt.value);
            });
            return profs.filter(function (prof) {
                return (checkedPayRangeGroups.indexOf(wageGroup(prof.wage)) > -1);
            });
        }
    };
    // filter by child age
    var filterByChildAge = function (profs) {
        var checkedAgeRangeElts = $('#filter-agerange :input:checked').toArray();
        if (checkedAgeRangeElts.length === 0 ||
            checkedAgeRangeElts.length === $('#filter-agerange input').length) {
            return profs;
        } else {
            var checkedAgeRangeGroups = checkedAgeRangeElts.map(function (elt) {
                return parseInt(elt.value);
            });
            return profs.filter(function (prof) {
                return (_.intersection(prof.ageRange, checkedAgeRangeGroups).length > 0);
            });
        }
    };
    // main function
    return filterByChildAge(filterByWage(profiles));
};

// display date in mm/dd/yyyy or mm/dd format
// http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
var displayDate = function(date, displayYear) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();
    if (displayYear) {
        return (mm[1]?mm:"0"+mm[0]) + '/' + (dd[1]?dd:"0"+dd[0]) + '/' + yyyy;
    } else {
        return (mm[1]?mm:"0"+mm[0]) + '/' + (dd[1]?dd:"0"+dd[0]);
    }
};

// change the date checkboxes to display the correct week
var insertDateCheckboxes = function (date) {
    var lastSunday = new Date(date);
    lastSunday.setDate(date.getDate() - date.getDay());
    lastSunday.setHours(19, 0, 0, 0); // no caretakers after 7 pm
    var DAYS_OF_THE_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var dates = _.range(7).map(function (i) {
        var d = new Date(lastSunday);
        d.setDate(d.getDate() + i);
        return d;
    });
    // generate elements
    $('#filter-date-checkboxes').empty();
    _.zip(dates, DAYS_OF_THE_WEEK).forEach(function (arr) {
        var baseElt = $('<div/>', {
            class: 'filter-date-group'
        });
        var checkboxElt = $('<input/>', {
            type: 'checkbox',
            name: 'date',
        });
        // disable past dates
        if (arr[0] < new Date()) {
            checkboxElt.prop('disabled', true);
        }
        baseElt.append(checkboxElt);
        var dayTextElt = $('<div/>', {
            class: 'day',
            text: arr[1],
        });
        baseElt.append(dayTextElt);
        var dateTextElt = $('<div/>', {
            class: 'date',
            text: displayDate(arr[0], false),
        });
        baseElt.append(dateTextElt);
        $('#filter-date-checkboxes').append(baseElt);
    });
};

// insert correct weeks to the filter
// should only be called on page load
var generateWeeksForSelection = function () {
    var currentDate = new Date();
    var lastSunday = new Date();
    lastSunday.setDate(currentDate.getDate() - currentDate.getDay());
    var sundays = _.range(4).map(function (i) {
        var d = new Date(lastSunday);
        d.setDate(d.getDate() + 7 * i);
        return d;
    });
    sundays.forEach(function (date) {
        var start = displayDate(date, true);
        date.setDate(date.getDate() + 6);
        var end = displayDate(date, true);
        var optionElt = $('<option/>', {
            value: start,
            text: start + ' — ' + end,
        });
        $('#week-select').append(optionElt);
    });
};

$(function () {
    var shownProfiles = PROFILES;
    // on load
    // add mini-profiles
    insertMiniProfileElts(sortProfiles(shownProfiles));
    // put correct dates in date filter
    generateWeeksForSelection();
    insertDateCheckboxes(new Date());
    // week selection handler
    $('#week-select').on('change', function () {
        insertDateCheckboxes(new Date($(this).val()));
    });
    // reset button handler
    $('#filter-reset').click(function () {
        $('#filter :input:checked').prop('checked', '');
    });
    // filter handler
    $('#filter-apply').click(function () {
        shownProfiles = filterProfiles(PROFILES);
        insertMiniProfileElts(sortProfiles(shownProfiles));
    });
    // sort-by select handler
    $('#sort-select').on('change', function () {
        insertMiniProfileElts(sortProfiles(shownProfiles));
    });
});
