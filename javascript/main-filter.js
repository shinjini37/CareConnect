// main page: filter and sort handlers

// global config
var onlyIncludePerfectMatchesTime = false;
var onlyIncludePerfectMatchesAge = false;
var profiles;
var changeShownProfiles = function () {
    shownProfiles = filterProfiles(PROFILES);
    insertMiniProfileElts(sortProfiles(shownProfiles));
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

// filter profiles by wage
var filterByWage = function (profs) {
    var payRangeLow = $('#slider-range').slider('values', 0);
    var payRangeHigh = $('#slider-range').slider('values', 1);
    return profs.filter(function (prof) {
        return (prof.wage >= payRangeLow && prof.wage <= payRangeHigh);
    });
};

// filter profiles by child age
var filterByChildAge = function (profs, onlyIncludePerfectMatchesAge, returnIntersection) {
    var checkedAgeRangeElts = $('.filter-agerange-checkboxes :input:checked');
    if (checkedAgeRangeElts.length === 0) {
        return profs;
    } else if (!onlyIncludePerfectMatchesAge){
        // any matches will do
        var checkedAgeRangeGroups = getValues(checkedAgeRangeElts);
        var intersections = [];
        var filteredProfs = profs.filter(function (prof) {
            var ageRangeGroup = [];
            prof.ageRange.forEach(function(range, idx){
                ageRangeGroup.push(range.index);
            });
            var intersection = _.intersection(ageRangeGroup, checkedAgeRangeGroups);
            if (returnIntersection) {
                intersections.push(intersection);
            }
            return (intersection.length > 0);
        });
        if (returnIntersection) {
            return intersections;
        }
        return filteredProfs;
    } else{
        // only perfect matches
        var checkedAgeRangeGroups = getValues(checkedAgeRangeElts);
        var intersections = [];
        var filteredProfs = profs.filter(function (prof) {
            var ageRangeGroup = [];
            prof.ageRange.forEach(function(range, idx){
                ageRangeGroup.push(range.index);
            });
            var intersection = _.intersection(ageRangeGroup, checkedAgeRangeGroups);
            if (returnIntersection) {
                intersections.push(intersection);
            }
            return (intersection.length === checkedAgeRangeGroups.length);
        });
        if (returnIntersection) {
            return intersections;
        }
        return filteredProfs;
    }
};

// filter profiles by time
var filterByTime = function (profs, perfectMatchesOnly) {
    var desiredTimes = calendar.getDesiredTimes();
    var validDayFilters = [];
    desiredTimes.forEach(function (times, idx) {
        if (times.length > 0) {
            validDayFilters.push(idx);
        }
    });
    if (validDayFilters.length === 0) {
        // filter not used
        return profs;
    } else if (!perfectMatchesOnly) {
        // match all profiles with at least one common time slot
        return profs.filter(function (prof) {
            return validDayFilters.some(function (idx) {
                var available = prof.availability[idx].map(convertTo24HrTime);
                var needed = desiredTimes[idx];
                return (_.intersection(available, needed).length > 0);
            });
        });
    } else {
        // only match profiles available to all desired time slots
        return profs.filter(function (prof) {
            return validDayFilters.every(function (idx) {
                var available = prof.availability[idx].map(convertTo24HrTime);
                var needed = desiredTimes[idx];
                return (_.intersection(available, needed).length === needed.length);
            });
        });
    }
};

var createGoToTodayButton = function() {
    var btn = $('<button/>', {
        id: 'go-to-today',
        class: 'btn',
        text: 'Today',
    });
    btn.click(function () {
        calendar.returnToCurrentWeek();
    });
    return btn;
}

var createAnyAllToggle = function () {
    var baseElt = $('<div/>', {
        id: 'time-selector-any-all-toggle',
        text: 'Match Exactly ',
    });
    var checkboxElt = $('<input/>', {
        type: 'checkbox',
        style: 'vertical-align: -2px',
    });
    checkboxElt.change(function () {
        onlyIncludePerfectMatchesTime = !onlyIncludePerfectMatchesTime;
        changeShownProfiles();
    });
    baseElt.append(checkboxElt);
    return baseElt;
};

// filter profile
var filterProfiles = function (profiles) {
    // main function
    return filterByTime(filterByChildAge(filterByWage(profiles), onlyIncludePerfectMatchesAge, false), onlyIncludePerfectMatchesTime);
};

// change the profile container to show specified profiles
var insertMiniProfileElts = function (profiles) {
    $('#profile-container').empty();
    window.location.search.substring(1);
    var currentURL = window.location.search.substring(1);
    var parentId = getParameterByName('parentId');
    //console.log(parentId);
    profiles.forEach(function (profile) {
        // create mini-profile element
        var baseElt = $('<div/>', {
            class: 'row mini-profile',
        });
        // upper element with picture, name and about me
        var upperElt = $('<div/>', {
            class: 'row babysitter-name-picture',
        });

        var leftElt = $('<div/>', {
            class: 'col-xs-3',
        });
        // inserting picture
        var pictureLinkElt = $('<a>', {
            href: 'profile.html'+ '?profile=' + profile.name.toLowerCase() + (parentId != null ? '&parentId='+parentId : ''),
            target: '_blank', // open profile in new page
        });
        var pictureImgElt = $('<img>', {
            class: 'profile-picture',
            src: profile.photo
        });
        pictureLinkElt.append(pictureImgElt);
        leftElt.append(pictureLinkElt);
        upperElt.append(leftElt);
        // inserting info
        var rightElt = $('<div/>', {
            class: 'col-xs-9',
        });
        // inserting name
        var nameElt = $('<div>', {
            class: 'col babysitter-name',
        });
        var nameLinkElt = $('<a>', {
            href: 'profile.html'+ '?profile=' + profile.name.toLowerCase() + (parentId != null ? '&parentId='+parentId : ''),
            target: '_blank', // open profile in new page
            text: profile.name,
        });
        nameElt.append(nameLinkElt);
        rightElt.append(nameElt);

        // inserting about
        var aboutElt = $('<div/>', {
            class: 'row babysitter-about-me',
            text: profile.about,
        });
        rightElt.append(aboutElt);
        upperElt.append(rightElt);
        baseElt.append(upperElt);

        // lower elt containing payrange, rating and child age
        var lowerElt = $('<div/>', {
            class: 'row',
        });
        var leftElt = $('<div/>', {
            class: 'col-xs-3',
        });
        var infoElt = $('<div/>', {
            class: 'row babysitter-info',
        });
        // inserting wage info
        var wageElt = $('<div/>', {
            class: 'col babysitter-wage',
            text: '$' + profile.wage,
        });
        infoElt.append(wageElt);
        // inserting rating info
        var ratingElt = $('<div/>', {
            class: 'col babysitter-rating',
            text: starRatingString(profile.rating),
        });
        infoElt.append(ratingElt);
        leftElt.append(infoElt);
        lowerElt.append(leftElt);

        // inserting age range info
        var rightElt = $('<div/>', {
            class: 'col-xs-9',
        });
        var ageRangeElt = $('<div/>', {
            class: 'row babysitter-age-range-container',
            text: "Will babysit:"
        });
        var ageIntersection = filterByChildAge([profile], onlyIncludePerfectMatchesAge, true)[0];
        profile.ageRange.forEach(function (ageRange, idx) {
            var ageRangeTextElt = $('<div/>', {
                class: 'babysitter-age-range',
                'data-index': ageRange.index,
                text: ageRange.text,
            });
            if (_.intersection(ageIntersection,[ageRange.index]).length>0){
                ageRangeTextElt.addClass("match");
            }
            ageRangeElt.append(ageRangeTextElt);
        });
        rightElt.append(ageRangeElt);
        lowerElt.append(rightElt);
        baseElt.append(lowerElt);
        $('#profile-container').append(baseElt);

        // change calendar when hovering over a profile
        baseElt.hover(
            // start hovering
            function () {
                // who the **** decided that storing time as AM/PM string is a good idea
                var schedule = profile.availability.map(function (daySchedule) {
                    return daySchedule.map(convertTo24HrTime);
                });
                calendar.markAvailableTimes(schedule);
            },
            // end hovering
            function () {
                calendar.clearAvailableTimes();
            }
        )
    });
};

///////// helper function ///////////
var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//////////////////////////////////////////



$(function () {
    shownProfiles = PROFILES;
    // on load
    // adding the filter price range slider
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 30,
        values: [0, 30],
        slide: function( event, ui ) {
            $( "#filter-payrange-selected" ).html( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( "#filter-payrange-selected" ).html( "$" + $( "#slider-range" ).slider( "values", 0 ) +
        " - $" + $( "#slider-range" ).slider( "values", 1 ) );
    // add mini-profiles
    insertMiniProfileElts(sortProfiles(shownProfiles));
    // add calendar and its handlers
    var dateFilterBtns = $('<div/>');
    dateFilterBtns.append(createGoToTodayButton());
    dateFilterBtns.append(createAnyAllToggle());
    $('#filter-date').append(dateFilterBtns);
    $('#filter-date').append(calendar.createCalendar());
    $('#filter-date').on('timeUpdated', function () {
        changeShownProfiles();
    });
    // reset button handler
    $('#filter-reset').click(function () {
        $('#filter :input:checked').prop('checked', '');
        $("#slider-range").slider("values", 0, $("#slider-range").slider("option", "min"));
        $("#slider-range").slider("values", 1, $("#slider-range").slider("option", "max"));
        calendar.clearDesiredTimes();
        changeShownProfiles();
    });
    // clicking pay/age range = clicking checkbox
    $('.payrange, .agerange').click(function () {
        var input = $(this).parent().find('input');
        input.click();
    });

    // age range exact match handler
    $("#agerange-match-exactly").change(function(){
        //console.log(onlyIncludePerfectMatchesAge);
        onlyIncludePerfectMatchesAge = !onlyIncludePerfectMatchesAge;
        changeShownProfiles();
    });

    // apply filter automatically whenever the user checks a box
    $('#filter :input').change(function () {
        changeShownProfiles();
    });
    $( "#slider-range" ).slider({
        change: function( event, ui ) {
            changeShownProfiles();
        }
    });
    // sort-by select handler
    $('#sort-select').on('change', function () {
        // no need to run filter again
        insertMiniProfileElts(sortProfiles(shownProfiles));
    });


    // Make filter bar scroll with window. This can be made better
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var navHeight = $("#navigation").css("height");
        //console.log(navHeight);
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
            $('#sort-dropdown').css({
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
            $('#sort-dropdown').css({
                position:"fixed",
                top:0,
                width: $('#sort-dropdown').css("width"),
                //"padding-top": 0
            });
            $('#sort-dropdown-dummy').css({
                display: "block"
            });
        } else { // back to normal view
            $('#filter .float').css({
                'position':"relative",
                "padding-top": 0
            });
            $('#sort-dropdown').css({
                'position':"relative",
                //"padding-top": 0
            });
            $('#sort-dropdown-dummy').css({
                display: "none"
            });
        }
    });
});
$(window).on("load", function(){
    // filter extend to bottom of div
    var height = $("#profile-sort-container").css("height");
    console.log(height);
    console.log(shownProfiles.length);
    $("#filter").css({height: height});
})
