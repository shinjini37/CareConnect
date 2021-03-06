var contactFunction = function (parentId, email) {
    if (parentId === undefined) {
        var alert = $('<div/>', {
            class: 'alert alert-warning fade in',
            id: 'alert'
        });
        alert.append("<a href='#'' class='close' data-dismiss='alert' aria-label='close'>&times;</a>");
        alert.append("Oops! You need to sign in first!");
        $('.container').prepend(alert);
        $('#alert').css({
            position:'fixed',
            top: "0",
            left: "0",
            width: "100%",
            "z-index":500
        });
        $('#alert').fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").alert('close');
        });
    } else {
        $('#babysitter-email').val(email);
        $("#myModal").modal({backdrop: 'static'});
    }
}

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
    var parentId = QueryString.parentId;
    if (profile === undefined) {
        window.location.href = 'index.html';
    } else {
        profile = profile.toLowerCase();
    }
    if (profile in PROFILE_INDEX){
        var idx = PROFILE_INDEX[profile];
        profile = PROFILES[idx];
        $("#profile-image").attr("src", profile.photo)
        $(".babysitter-name").html(profile.name);
        $("#babysitter-rating").html(starRatingString(profile.rating));
        $("#babysitter-about-me").text(profile.about);
        $("#babysitter-wage").html("$" + profile.wage + "/hr");
        $("#babysitter-name").html(profile.name);
        $("#babysitter-contact-btn").attr('data-email', profile.email);
        $("#babysitter-contact-btn").click(function () {
            contactFunction(parentId, profile.email);
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
        if (profile.reviews.length === 0) {
            $('#review-container').html("<div id='no-reviews'>There aren't any reviews yet.</div>");
        }
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
                'data-email': review[1],
                click: function () {
                    contactFunction(parentId, review[1]);
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
        var hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'];

        hours.forEach(function (hour) {
            var hourRow = $('<div/>', {
                class: "row seven-cols",
                margin: 'auto'
            });
            days.forEach(function (day) {
                var slot = $('<div/>', {
                    class: "col-lg-1 col-md-3 col-sm-4 col-xs-6 hour",
                    id: day + hour,
                    text: hour
                });
                hourRow.append(slot);
            });
            $("#big-calendar").append(hourRow);
        })

        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (var i=0; i < 7; i++) {
            var availableHours = profile.availability[i];
            for (var j=0; j < availableHours.length; j++) {
                var slotID = days[i]+availableHours[j];
                $('#' + slotID).css({
                    "background-color":'#0e62c7', /*'#66b2ff'*/
                    "color": 'white'
                    });
            }
        }
    } else {
        window.location.href = 'index.html';
    }

    //scale the image correctly
    $("#profile-image").css({
        width: $("#user-profile-wrapper").css("width")
    });



});
