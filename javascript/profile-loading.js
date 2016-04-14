$(function(){
    // Load the profile page

    // get query string to find which profile is being accessed
    // from http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }();

    // copied from main-filter.js needed to draw stars
    // convert integer rating to the appropiate number of stars
    //var starRatingString = function (n) {
    //    if (n === 0) {
    //        return '';
    //    } else {
    //        return '★☆' + starRatingString(n-1);
    //    }
    //};

    var starRatingString = function (n) {
        var rating = '';
        for (var i = 0; i<5; i++){
            if (i<n){
                rating = rating.concat('★');
            } else{
                rating = rating.concat('☆')
            }
        }
        return rating;
    };

    // get the profile, load if it exists, redirect to homepage if it doesn't
    var profile = QueryString.profile;
    if (profile === undefined){
        window.location.href = 'index.html';
    } else {
        profile = profile.toLowerCase();
    }
    if (profile in PROFILE_INDEX){
        var idx = PROFILE_INDEX[profile];
        profile = PROFILES[idx];
        $(".babysitter-name").html(profile.name);
        $("#babysitter-rating").html(starRatingString(profile.rating));
        $("#babysitter-about-me").text(profile.about);
        $("#babysitter-wage").html("$" + profile.wage + "/hr");
        $("#babysitter-name").html(profile.name);
        $("#babysitter-email").val(profile.email);
        $("#babysitter-references").html(profile.references);
        $("#babysitter-experiences").html(profile.experiences);
        $("#babysitter-age-range").html("Will babysit: " + profile.ageRange[0] + " to " + profile.ageRange[profile.ageRange.length-1] + " year olds");
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (var i=0; i < 7; i++) {
            var availableHours = profile.availability[i];
            for (var j=0; j < availableHours.length; j++) {
                var slotID = days[i]+availableHours[j];
                $('#' + slotID)[0].style.backgroundColor = 'PaleGreen';
            }
        }
    } else {
        window.location.href = 'index.html';
    }

    //scale the image correctly
    $("#profile-image").css({
        width: $("#user-profile-wrapper").css("width")
    });

    }

)