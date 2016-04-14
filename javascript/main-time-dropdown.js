// main page: whenisgood-style time selector

// convert 24-hour time to AM/PM
var convertTo12HrTime = function (n) {
    if (n < 12) {
        return n + ' am';
    } else if (n == 12) {
        return '12 pm';
    } else {
        return (n-12) + ' pm';
    }
};

// convert AM/PM time to 24-hour
var convertTo24HrTime = function (s) {
    var hr = parseInt(s.substring(0, s.length-2)) % 12;
    var modifier = s.substring(s.length-2);
    if (modifier.toLowerCase() === 'am') {
        return hr;
    } else if (modifier.toLowerCase() === 'pm') {
        return hr+12;
    }
};

var addTimeRangeElts = function (elt) {
    var toggling = false;
    var addingToSelector;
    _.range(9,19).forEach(function (n) {
        var rangeElt = $('<div/>', {
            class: 'time-selector-range unhighlightable',
            text: convertTo12HrTime(n),
            value: n,
        });
        // dragging mechanism
        rangeElt.mousedown(function () {
            toggling = true;
            if (rangeElt.hasClass('time-selector-range-selected')) {
                addingToSelector = false;
                rangeElt.removeClass('time-selector-range-selected');
            } else {
                addingToSelector = true;
                rangeElt.addClass('time-selector-range-selected');
            }
            $(document).mouseup(function () {
                changeShownProfiles();
                toggling = false;
                $(document).off('mouseup');
            });
        });
        rangeElt.mousemove(function () {
            if (toggling === true) {
                if (addingToSelector === true) {
                    rangeElt.addClass('time-selector-range-selected');
                } else {
                    rangeElt.removeClass('time-selector-range-selected');
                }
            }
        });
        elt.append(rangeElt);
    });
};

var createTimeSelectorElt = function (day, disable) {
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
    addTimeRangeElts(selectorElt);
    baseElt.append(selectorElt);
    // click handler for button
    if (!disable) {
        btnElt.click(function () {
            if (selectorElt.hasClass('show')) {
                selectorElt.removeClass('show');
            } else {
                $('.time-selector').removeClass('show');
                selectorElt.addClass('show');
            }
        });
    }
    return baseElt;
};
