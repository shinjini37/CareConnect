$(function(){
    // Search function to find students given first names
    var search = function(){
        var searchText = $("#search-text").val().toLowerCase();
        if (searchText in PROFILE_INDEX) {
            window.location.href = 'profile.html' + '?profile=' + searchText;
        } else {
            window.location.href = 'index.html';
            alert("The student you are looking for does not exist");
        }

    }

    $("#search-text").keyup(function(e) {
        if(e.keyCode == 13)
        {
            search();
        }
    });

    $("#search-submit").click(function () {
        search();
    })

    }

)
