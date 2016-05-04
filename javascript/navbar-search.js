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

    // check for parent login
    var parentId = getParameterByName('parentId');
    if (parentId === null){
        $("#logo a").attr("href", "index.html");
        var notLoggedIn =
            '<input type="text" placeholder="email..." class="form-control" id="nav_email">'
            +'<input type="password" placeholder="password..." class="form-control" id="nav_password">'
            +'<button class="btn btn-primary" id="signin-btn"><span></span>Sign In</button>'
            +'<button class="btn btn-primary" id="signup-btn"><span></span>Sign Up</button>'
        $('#profile-nav').html(notLoggedIn);
    } else {
        $("#logo a").attr("href", "index.html" + "?parentId=" + parentId);

        var loggedIn =
            '<button class="btn btn-primary" id="profile-button-link"><span class="glyphicon glyphicon-user" style="color:#F97E76"></span> Profile</button>'
            +'<button class="btn btn-primary" id="messages-button-link"><span class="glyphicon glyphicon-envelope" style="color:#F97E76"></span> Messages</button>'
            +'<div class="dropdown nav-dropdown">'
                +'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id="navigation-dropdown-button"><span class="glyphicon glyphicon-cog" style="color:#F97E76"></span>'
                +'<span class="caret"></span></button>'
                +'<ul class="dropdown-menu">'
                    +'<li><a href="#">Settings</a></li>'
                    +'<li><a href="#">Log Out</a></li>'
                +'</ul>'
            +'</div>';
        $('#profile-nav').html(loggedIn);
    }

    // allow entire logo to be clicked
    $("#logo").click(function(){
        window.location.href = $("#logo a").attr("href");
    })


    $("#signin-btn").click(function(event){
        console.log("mo");
        var parentEmail = $("#nav_email").val();
        var parentPassword = $("#nav_password").val();
        var login_parent_id;

        for (var parentIndex = 0; parentIndex < PARENT_PROFILES.length; parentIndex++){
            if (PARENT_PROFILES[parentIndex].email == parentEmail && PARENT_PROFILES[parentIndex].password == parentPassword){
                login_parent_id = parentIndex;
                if (getParameterByName("profile") != null){
                    window.location.href = window.location.href + '&parentId=' + parentIndex;
                } else {
                    window.location.href = window.location.href + '?parentId=' + parentIndex;
                }
                
                break;
            }
        }

        $("#nav_email").val("");
        $("#nav_password").val("");

        if (login_parent_id == null) {
            alert("Wrong username or password.");
        }

    });

    $("#signup-btn").click(function(event){
        window.location.href = "login.html"
    });

    $("#nav_logout").click(function(){
        window.location.href = 'index.html';
    });

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