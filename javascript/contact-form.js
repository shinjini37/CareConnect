$(function () {
	$('#btn-send').click(function () {
	    var alert = $('<div/>', {
	        class: 'alert alert-success fade in',
	        id: 'alert'
	    });
	    alert.append("<a href='#'' class='close' data-dismiss='alert' aria-label='close'>&times;</a>");
	    alert.append("Message sent successfully!");
	    $('.container').prepend(alert);
	    $('#alert').fadeTo(2000, 500).slideUp(500, function(){
	        $("#alert").alert('close');
	    });
	})
});