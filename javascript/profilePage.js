$.extend({
    getUrlVars : function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(
                window.location.href.indexOf('?') + 1).split('&');
        for ( var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar : function(name) {
        return $.getUrlVars()[name];
    }
});

var starRatingString = function (n) {
    if (n === 0) {
        return '';
    } else {
        return '★' + starRatingString(n-1);
    }
};

$(function() {
    var userID = $.getUrlVar('id');
    // console.log(userID);
    var profile = PROFILES[Number(userID)];
    $("#babysitter-rating").html(starRatingString(profile.rating));
    $("#babysitter-about-me").html(profile.about);
    $("#babysitter-wage").html(profile.wage);
    $("#babysitter-name").html(profile.name);
    $("#babysitter-email").val(profile.email);
    $("#babysitter-references").html(profile.references);
    $("#babysitter-experiences").html(profile.experiences);
});
