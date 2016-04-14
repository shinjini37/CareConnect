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
    var starRatingString = function (n) {
        if (n === 0) {
            return '';
        } else {
            return '★' + starRatingString(n-1);
        }
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
        $(".babysitter-name").html(PROFILES[idx].name);
        $(".babysitter-wage").html("$" + PROFILES[idx].wage);
        $(".babysitter-rating").html(starRatingString(PROFILES[idx].rating));
    } else {
        window.location.href = 'index.html';
    }

    }

)