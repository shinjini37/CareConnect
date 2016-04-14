$(function () {
    $('.time-selector-btn').click(function () {
        var id = $(this)[0].id;
        var week = id.substring(id.length-3);
        var timeSelectorElt = $('#time-selector-' + week);
        if (timeSelectorElt.hasClass('show')) {
            timeSelectorElt.removeClass('show');
        } else {
            $('.time-selector').removeClass('show');
            timeSelectorElt.addClass('show');
        }
    });
});
