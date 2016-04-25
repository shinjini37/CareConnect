// main page: filter and sort handlers


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

// filter by wage
//var filterByWage = function (profs) {
//    var checkedPayRangeElts = $('#filter-payrange :input:checked');
//    if (checkedPayRangeElts.length === 0 ||
//        checkedPayRangeElts.length === $('#filter-payrange input').length) {
//        return profs;
//    } else {
//        var checkedPayRangeGroups = getValues(checkedPayRangeElts);
//        return profs.filter(function (prof) {
//            return (checkedPayRangeGroups.indexOf(wageGroup(prof.wage)) > -1);
//        });
//    }
//};
var filterByWage = function (profs) {
    var selectedPayRangeRange = [$( "#slider-range" ).slider( "values", 0 ), $( "#slider-range" ).slider( "values", 1 )];
    return profs.filter(function (prof) {
        return (((prof.wage) >= selectedPayRangeRange[0]) && ((prof.wage) <= selectedPayRangeRange[1]));
    });
};
// filter by child age
var filterByChildAge = function (profs, returnIntersection) {
    var checkedAgeRangeElts = $('#filter-agerange :input:checked');
    if (checkedAgeRangeElts.length === 0 ||
        checkedAgeRangeElts.length === $('#filter-agerange input').length) {
        return profs;
    } else {
        var checkedAgeRangeGroups = getValues(checkedAgeRangeElts);
        //console.log(checkedAgeRangeGroups);
        var intersections = [];
        var filteredProfs = profs.filter(function (prof) {
            var ageRangeGroup = [];
            prof.ageRange.forEach(function(range, idx){
                ageRangeGroup.push(range.index);
            });
            //console.log(ageRangeGroup);
            //var desiredAgeRangeGroups = _.uniq(ageRange.map(ageGroup), true);
            //console.log(desiredAgeRangeGroups);
            var intersection = _.intersection(ageRangeGroup, checkedAgeRangeGroups);

            if (returnIntersection){
                intersections.push(intersection);
            }
            return (intersection.length > 0);
        });
        if (returnIntersection){
            return intersections;
        }
        return filteredProfs;
    }
};
// filter by time
var filterByTime = function (profs) {
    var DAYS_OF_THE_WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var validDayFilters = [];
    DAYS_OF_THE_WEEK.forEach(function (day, idx) {
        if ($('#filter-date-checkbox-' + day).prop('checked') &&
            $('#time-selector-' + day + ' .time-selector-range-selected').length > 0) {
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
                var chosenElts = $('#time-selector-' + day + ' .time-selector-range-selected');
                var chosen = chosenElts.toArray().map(function (elt) {
                    return convertTo24HrTime(elt.innerHTML);
                });
                if (_.intersection(available, chosen).length > 0) {
                    return true;
                }
            });
        });
    }
};


// filter profile
var filterProfiles = function (profiles) {
    // main function
    return filterByTime(filterByChildAge(filterByWage(profiles)), false);
};

// display date in mm/dd/yyyy or mm/dd format
// http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
var mmddDate = function(date, displayYear) {
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
            class: 'filter-date-checkbox',
            id: 'filter-date-checkbox-' + arr[1].toLowerCase(),
        });
        // disable past dates
        var disableElt = (arr[0] < new Date());
        if (disableElt) {
            checkboxElt.prop('disabled', true);
        }
        baseElt.append(checkboxElt);
        var dateInfoElt = $('<div/>', {
            class: 'date-info',
            id: 'date-info-' + arr[1].toLowerCase(),
        });
        var dayTextElt = $('<div/>', {
            class: 'day',
            text: arr[1],
        });
        dateInfoElt.append(dayTextElt);
        var dateTextElt = $('<div/>', {
            class: 'date',
            text: mmddDate(arr[0], false),
        });
        dateInfoElt.append(dateTextElt);
        baseElt.append(dateInfoElt);
        baseElt.append(createTimeSelectorElt(arr[1], disableElt));
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
        var start = mmddDate(date, true);
        date.setDate(date.getDate() + 6);
        var end = mmddDate(date, true);
        var optionElt = $('<option/>', {
            value: start,
            text: start + ' — ' + end,
        });
        $('#week-select').append(optionElt);
    });
};

// change the profile container to show specified profiles
var insertMiniProfileElts = function (profiles) {
    $('#profile-container').empty();
    profiles.forEach(function (profile) {
        // create mini-profile element
        var baseElt = $('<div/>', {
            class: 'row mini-profile',
        });

        var pictureElt = $('<div/>', {
            class: 'col-xs-3',
        });
        var pictureImgElt = $('<img>', {
            class: 'profile-picture',
            src: 'images/blue-user-icon.png'
        });
        pictureElt.append(pictureImgElt);
        baseElt.append(pictureElt);

        var leftElt = $('<div/>', {
            class: 'col-xs-9',
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

        var ageRangeElt = $('<div/>', {
            class: 'row babysitter-age-range-container',
            text: "Will babysit:"
        });

        var ageIntersection = filterByChildAge([profile], true)[0];
        profile.ageRange.forEach(function (ageRange, idx) {
            var ageRangeTextElt = $('<div/>', {
                class: 'babysitter-age-range',
                'data-index': ageRange.index,
                text: ageRange.text
            });
            //console.log(intersection, ageRange.index)
            if (_.intersection(ageIntersection,[ageRange.index]).length>0){
                ageRangeTextElt.addClass("match");
            }
            ageRangeElt.append(ageRangeTextElt);
        });

        leftElt.append(ageRangeElt);

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
        //generateMiniCalendar(rightElt, profile.availability);
        //rightElt.append(calendarElt);
        //baseElt.append(rightElt);
        $('#profile-container').append(baseElt);
    });
};


var shownProfiles;
var changeShownProfiles = function () {
    shownProfiles = filterProfiles(PROFILES);
    insertMiniProfileElts(sortProfiles(shownProfiles));
};

$(function () {
    // adding the filter price range slider
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 30,
        values: [0, 30],
        slide: function( event, ui ) {
            $( "#filter-payrange-selected" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( "#filter-payrange-selected" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
        " - $" + $( "#slider-range" ).slider( "values", 1 ) );


    shownProfiles = PROFILES;
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
        $("#slider-range").slider("values", 0, $("#slider-range").slider("option", "min"));
        $("#slider-range").slider("values", 1, $("#slider-range").slider("option", "max"));
        changeShownProfiles();
        $('.time-selector-range-selected').removeClass('time-selector-range-selected');
        $('.time-selector').removeClass('show');
    });
    // clicking pay/age range = clicking checkbox
    $('.payrange, .agerange').click(function () {
        var input = $(this).parent().find('input');
        input.click();
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

    // filter extend to bottom of div
    var height = $("#profile-sort-container").css("height");
    $("#filter").css({height: height});

    //clicking profile picture
    $('body').on('click', '.profile-picture', function () {
        var link = $(this).parent().parent().find('a');
        window.location.href = link.attr('href');
    });

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
