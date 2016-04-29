//////// Helper method /////////
var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//////////// Helper method ///////////

$(function(){
    // Search function to find students given first names
    var search = function(){
        var searchText = $("#search-text").val().toLowerCase();
        if (searchText in PROFILE_INDEX) {
            var parentId = getParameterByName('parentId');
            if (parentId === null){
                window.location.href = 'profile.html' + '?profile=' + searchText;
            } else {
                window.location.href = 'profile.html' + '?profile=' + searchText + "&parentId=" + parentId;    
            }
        } else {
            window.location.href = 'index.html';
            alert("Oops! Seems like the student you are looking for hasn't signed up yet!");
        }

    };

    $("#search-text").keyup(function(e) {
        if(e.keyCode == 13)
        {
            search();
        }
    });

    $("#search-submit").click(function () {

        search();
    });



    $("#search-text").autocomplete({
        source: PROFILE_NAMES
    });

    $( "#search-text" ).autocomplete({
        select: function( event, ui ) {
            $("#search-text").val(ui.item.value.toLowerCase());
            search();
        }
    });

});

