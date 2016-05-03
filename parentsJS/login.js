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
    console.log(parentId)

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
                    window.location.href = 'profile.html?profile=' + studentId + 'parentId=' + parentIndex;
                } else {
                    window.location.href = 'index.html?parentId=' + parentIndex;
                }
                break;
            } else {
                $("#login_error").css("display", "block")
                break;
            }
        }

    });



})
