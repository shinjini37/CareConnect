//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


$(function() {
    // Load the login page

    var currentURL = window.location.search.substring(1);

    var parentId = getParameterByName('parentId');

    if (parentId != null){
        window.location.href = 'index.html';
    }

    $("#login_form").submit(function(event){
        event.preventDefault(event);
        
        var parentEmail = $("#login_email").val();
        var parentPassword = $("#login_password").val();    
        var login_parent_id;

        for (var parentIndex = 0; parentIndex < PARENT_PROFILES.length; parentIndex++){
            if (PARENT_PROFILES[parentIndex].email == parentEmail && PARENT_PROFILES[parentIndex].password == parentPassword){
                login_parent_id = parentIndex;
                var studentId = getParameterByName('profile');
                if (studentId != null) {
                    window.location.href = 'profile.html?profile=' + studentId + '&parentId=' + parentIndex;
                } else {
                    window.location.href = 'index.html?parentId=' + parentIndex;
                }
                break;
            } 
        }
        if (login_parent_id == null) {
        	$("#login_error").css("display", "block");
        }

    });

    $("#register_form").submit(function (event) {
        event.preventDefault(event);
        var password = $("#register_password").val();
        var confirmed_password = $("#confirmed_password").val();
        window.location.href = 'index.html?parentId=' + '6813';
    })

    /*
    $("#register_form").submit(function(event){
        event.preventDefault();

        var reg_name = $("#register_name").val();
        var reg_email = $("#register_email").val();
        var reg_password = $("#register_password").val();

        if (reg_email.toLowerCase().indexOf("@mit.edu") >= 0){
            //var credentials = new Blob([reg_email + " "+ reg_name + " " + reg_name], {type: "text/plain;charset=utf-8"});
            //saveAs(credentials, "cred.txt");
            window.localStorage.setItem("care_connect_email", reg_email);
            window.localStorage.setItem("care_connect_password", reg_password);
            window.localStorage.setItem("care_connect_name", reg_name);
        }
    });

    */
})


