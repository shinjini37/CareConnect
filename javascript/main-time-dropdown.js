var createTimeSelectorElt = function (day) {
    // generate elements
    var baseElt = $('<div/>', {
        class: 'time-selector-base',
    });
    var btnElt = $('<span/>', {
        class: 'ui-icon ui-icon-triangle-1-s time-selector-btn',
        id: 'time-selector-btn-' + day.toLowerCase(),
    });
    baseElt.append(btnElt);
    var selectorElt = $('<div/>', {
        class: 'time-selector',
        id: 'time-selector-' + day.toLowerCase(),
    });
    baseElt.append(selectorElt);
    // click handler for button
    btnElt.click(function () {
        if (selectorElt.hasClass('show')) {
            selectorElt.removeClass('show');
        } else {
            $('.time-selector').removeClass('show');
            selectorElt.addClass('show');
        }
    });
    return baseElt;
};
