$(function() {
    // Load the profile page

    // get query string to find which profile is being accessed
    // from http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0; i<vars.length; i++) {
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

    // get the profile, load if it exists, redirect to homepage if it doesn't
    var profile = QueryString.profile;
    if (profile === undefined) {
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
        $("#babysitter-contact-btn").attr('data-email', profile.email);
        $("#babysitter-contact-btn").click(function () {
            $('#babysitter-email').val($(this).attr('data-email'));
        });
        $("#babysitter-experiences").html(profile.experiences);
        $("#babysitter-age-range").html("Will babysit: ");
        profile.ageRange.forEach(function (ageRange, idx) {
            var ageRangeTextElt = $('<div/>', {
                class: 'babysitter-age-range-elt',
                'data-index': ageRange.index,
                text: ageRange.text
            });
            $("#babysitter-age-range").append(ageRangeTextElt);
        });

        // load the reviews
        profile.reviews.forEach(function (review) {
            var panel = $('<div/>', {
                class: 'panel panel-default',
            });
            var panelBody = $('<div/>', {
                class: 'panel-body',
            });
            var leftElt = $('<div/>', {
                class: 'col-xs-2 reviewer',
            });
            var reviewerName = $('<text/>', {
                text: review[0]
            })
            var contactButton = $('<button/>', {
                class: 'btn btn-primary btn-xs',
                text: 'Contact',
                'data-toggle': 'modal',
                'data-target': '#myModal',
                'data-email': review[1],
                click: function () {
                    $('#babysitter-email').val($(this).attr('data-email'));
                }
            });
            leftElt.append(reviewerName);
            leftElt.append(contactButton);
            var rightElt = $('<div/>', {
                class: 'col-xs-10 review',
                text: review[3]
            });
            panelBody.append(leftElt);
            panelBody.append(rightElt);
            panel.append(panelBody);
            $('#review-container').append(panel);
        });

        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (var i=0; i < 7; i++) {
            var availableHours = profile.availability[i];
            for (var j=0; j < availableHours.length; j++) {
                var slotID = days[i]+availableHours[j];
                $('#' + slotID).css("background-color", 'PaleGreen');
            }
        }
    } else {
        window.location.href = 'index.html';
    }

    //scale the image correctly
    $("#profile-image").css({
        width: $("#user-profile-wrapper").css("width")
    });

    var parentId = getParameterByName('parentId');
    if (parentId === null){
        $("#logo a").attr("href", "index.html");
    } else {
        $("#logo a").attr("href", "index.html" + "?parentId=" + parentId);
    }

});

///////// Helper method ///////////////
var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}