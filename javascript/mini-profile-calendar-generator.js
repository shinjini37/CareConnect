var generateMiniCalendar = function(rightElement, b_availability){

	var calendarContainer = $('<div/>', {
            id : "mini_calendar_container"
        });

	var num_weekdays = 7;
	var weekday_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	var num_hours = 11;
	var hour_texts = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"];

	var empty_col = $('<div />', {
		"class": 'col-xs-1 cal_cell',
		"text" : "emp"
	});

	// add top row
	var top_row_div = $('<div />', {
        		"class": 'row'
        	});

	var top_day_col_div = $('<div />', {
		"class": 'col-xs-1 cal_cell'
	});

	top_row_div.append(top_day_col_div);

	for (var hour_index = 0; hour_index < num_hours; hour_index++){
		var top_hour_col_div = $("<div />", {
    		"class" : "col-xs-1 cal_cell",
    		"text" : hour_texts[hour_index]
	    });
	    top_row_div.append(top_hour_col_div);
	}

	calendarContainer.append(top_row_div);

	for (var day_index = 0; day_index < num_weekdays; day_index++){

		var row_div = $('<div />', {
    		"class": 'row'
    	});

    	var day_col_div = $('<div />', {
    		"class": 'col-xs-1 cal_cell',
    		"text" : weekday_names[day_index]
    	});

    	row_div.append(day_col_div);
	
        for (var hour_index = 0; hour_index < num_hours; hour_index++){

        	var hour_col_div;

        	if (b_availability[day_index].indexOf(hour_texts[hour_index]) > -1){
        		hour_col_div = $("<div />", {
        			"class" : "col-xs-1 cal_cell b_available"
        		});
        	} else {
        		hour_col_div = $("<div />", {
        			"class" : "col-xs-1 cal_cell"
        		});
        	}

        	row_div.append(hour_col_div);
        }

    	calendarContainer.append(row_div);
	}

	rightElement.append(calendarContainer);
}