var calendar = function () {

    var DAYS_OF_WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var START_TIME = 8;
    var END_TIME = 24;

    // invariant: dates are always Sundays
    var CURRENT_DATE; // last Sunday
    var date; // sunday of the week displayed to users

    var that = new Object();

    /*
     * Public methods
     */

    // create a calendar jquery object
    // should always call this function first
    that.createCalendar = function () {
        CURRENT_DATE = addDays(new Date(), -(new Date().getDay()));
        date = CURRENT_DATE;
        // add elements
        var calendarElt = $('<div/>', {
            class: 'unhighlightable-text',
            id: 'calendar',
        });
        calendarElt.append(createWeekSelector());
        calendarElt.append(createTimeSelector());
        return calendarElt;
    };

    // return to current week
    that.returnToCurrentWeek = function () {
        date = CURRENT_DATE;
        $('#selected-week-text').text(weekText(date));
        changeDateText();
        enableDisablePrevWeekBtn();
    };

    // get the time ranges that the user selected
    that.getDesiredTimes = function () {
        return DAYS_OF_WEEK.map(function (day, idx) {
            var selector = '#time-selector-col-' + day + ' .time-selector-cell';
            var times = [];
            $(selector).each(function (idx) {
                if ($(this).children().hasClass('time-selector-range-desired')) {
                    times.push(idx + START_TIME);
                }
            });
            return times;
        });
    };

    // clear the time ranges that the user selected
    that.clearDesiredTimes = function () {
        $('.time-selector-cell').children().removeClass('time-selector-range-desired');
    };

    // show a person's schedule on calendar
    that.markAvailableTimes = function (schedule) {
        that.clearAvailableTimes();
        _.zip(schedule, DAYS_OF_WEEK).forEach(function (tuple) {
            var available = tuple[0];
            var day = tuple[1];
            var cells = $('#time-selector-col-' + day + ' .time-selector-left-range');
            available.forEach(function (hr) {
                $(cells[hr-START_TIME]).addClass('time-selector-range-available');
            });
        });
    };

    // clear the person's schedule
    that.clearAvailableTimes = function () {
        $('.time-selector-left-range').removeClass('time-selector-range-available');
    };

    /*
     * Week selector
     */

    var createWeekSelector = function () {
        // base element
        var baseElt = $('<div/>', {
            id: 'week-selector',
        });
        // left: goto previous week
        var prevWeekBtnElt = $('<div/>', {
            class: 'col-xs-2 clickable-text-disabled',
            id: 'prev-week-btn',
        }).append($('<p/>', {
            class: 'center-text',
            text: '←',
        }));
        baseElt.append(prevWeekBtnElt);
        // center: show currently selected week
        var showWeekElt = $('<div/>', {
            class: 'col-xs-8',
            id: 'selected-week',
        }).append($('<p/>', {
            class: 'center-text',
            id: 'selected-week-text',
            text: weekText(CURRENT_DATE),
            style: 'width: 90%; text-align: center',
        }));
        // right: goto next week
        baseElt.append(showWeekElt);
        var nextWeekBtnElt = $('<div/>', {
            class: 'col-xs-2 clickable-text',
            id: 'next-week-btn',
        }).append($('<p/>', {
            class: 'center-text',
            text: '→',
        }));
        nextWeekBtnElt.click(function () {
            date = addDays(date, 7);
            $('#selected-week-text').text(weekText(date));
            changeDateText();
            enableDisablePrevWeekBtn();
        });
        baseElt.append(nextWeekBtnElt);
        return baseElt;
    };

    // change dates in time selector headers
    var changeDateText = function () {
        _.range(7).forEach(function (idx) {
            var selector = '#time-selector-date-text-' + DAYS_OF_WEEK[idx];
            $(selector).text(dateToString(addDays(date, idx), false));
        });
    };
    
    var enableDisablePrevWeekBtn = function () {
        if (date <= CURRENT_DATE) {
            var btn = $('#prev-week-btn');
            btn.off('click');
            btn.removeClass('clickable-text');
            btn.addClass('clickable-text-disabled');
        } else {
            var btn = $('#prev-week-btn');
            btn.click(function () {
                date = addDays(date, -7);
                $('#selected-week-text').text(weekText(date));
                changeDateText();
                enableDisablePrevWeekBtn();
            });
            btn.removeClass('clickable-text-disabled');
            btn.addClass('clickable-text');
        }
    };

    /*
     * Time selector
     */

    // dragging mechanism
    var toggling = false;
    var addingToSelection = false;

    var createTimeSelector = function () {
        var baseElt = $('<div/>', {
            id: 'time-selector',
        });
        baseElt.append(createTimeRangeDisplayColumn());
        _.range(7).forEach(function (idx) {
            baseElt.append(createTimeSelectColumn(idx));
        });
        return baseElt;
    };

    var createTimeRangeDisplayColumn = function () {
        var columnElt = $('<div/>', {
            class: 'col-8',
            id: "days-of-the-week"
        });
        var headerElt = $('<div/>', {
            class: 'time-selector-header',
        });
        columnElt.append(headerElt);
        _.range(START_TIME, END_TIME).forEach(function (hr) {
            var rangeElt = $('<div/>', {
                class: 'time-selector-cell',
                text: convertTo12HrTime(hr),
            });
            columnElt.append(rangeElt);
        });
        return columnElt;
    };

    var createTimeSelectColumn = function (idx) {
        var day = DAYS_OF_WEEK[idx];
        var columnElt = $('<div/>', {
            class: 'col-8',
            id: 'time-selector-col-' + day,
        });
        // header
        var headerElt = $('<div/>', {
            class: 'time-selector-header',
        });
        var dayTextElt = $('<p/>', {
            class: 'time-selector-header-text',
            text: day.charAt(0).toUpperCase() + day.slice(1), // capitalize first letter
        });
        headerElt.append(dayTextElt);
        var dateTextElt = $('<p/>', {
            class: 'time-selector-header-text',
            id: 'time-selector-date-text-' + day,
            text: dateToString(addDays(CURRENT_DATE, idx)),
        });
        headerElt.append(dateTextElt);
        columnElt.append(headerElt);
        // selector cells
        _.range(START_TIME, END_TIME).forEach(function (hr) {
            var rangeElt = $('<div/>', {
                class: 'time-selector-cell',
            });
            var leftRangeElt = $('<div/>', {
                class: 'time-selector-left-range',
            });
            rangeElt.append(leftRangeElt);
            var rightRangeElt = $('<div/>', {
                class: 'time-selector-right-range',
            });
            rangeElt.append(rightRangeElt);
            columnElt.append(rangeElt);
            // dragging mechanism
            rangeElt.mousedown(function () {
                toggling = true;
                if (rangeElt.children().hasClass('time-selector-range-desired')) {
                    addingToSelector = false;
                    rangeElt.children().removeClass('time-selector-range-desired');
                } else {
                    addingToSelector = true;
                    rangeElt.children().addClass('time-selector-range-desired');
                }
                $(document).mouseup(function () {
                    toggling = false;
                    $('#calendar').trigger('timeUpdated');
                    $(document).off('mouseup');
                });
            });
            rangeElt.mousemove(function () {
                if (toggling === true) {
                    if (addingToSelector === true) {
                        rangeElt.children().addClass('time-selector-range-desired');
                    } else {
                        rangeElt.children().removeClass('time-selector-range-desired');
                    }
                }
            });
        });
        return columnElt;
    };

    /*
     * Date utilities
     */

    // display date in mm/dd/yyyy or mm/dd format
    // http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
    var dateToString = function (d, displayYear) {
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = d.getDate().toString();
        if (displayYear) {
            return (mm[1]?mm:'0'+mm[0]) + '/' + (dd[1]?dd:'0'+dd[0]) + '/' + yyyy;
        } else {
            return (mm[1]?mm:'0'+mm[0]) + '/' + (dd[1]?dd:'0'+dd[0]);
        }
    };

    // add a number of days to a date; original not modified
    var addDays = function (d, days) {
        var ret = new Date(d);
        ret.setDate(d.getDate() + days);
        return ret;
    };

    // get text representation of a week starting from a date
    var weekText = function (start) {
        var end = addDays(start, 6);
        return dateToString(start, true) + ' - ' + dateToString(end, true);
    };

    // convert 24-hour time to AM/PM
    var convertTo12HrTime = function (n) {
        if (n === 0) {
            return '12 AM';
        } else if (n < 12) {
            return n + ' AM';
        } else if (n === 12) {
            return '12 PM';
        } else {
            return (n-12) + ' PM';
        }
    };
    
    Object.freeze(that);
    return that;

}();
