$(function(){
    // Search function to find students given first names
    var search = function(){
        var searchText = $("#search-text").val().toLowerCase();
        if (searchText in PROFILE_INDEX) {
            window.location.href = 'profile.html' + '?profile=' + searchText;
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

