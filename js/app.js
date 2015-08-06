/*
 * Application core JS file
 */
$( function(){

	// Initiate jQuery UI Datepicker on input element
	$( '#datepicker' ).datepicker({
		onSelect: function( dateText ) {
			var selectedDate = new Date( this.value );
			clearTables();
			getEvents( selectedDate );
		},
	});

	function getEvents( selectedDate ) {

		// If on initial page
		if( !selectedDate ) {

			// Today's date in ms
			var selectedDate = new Date();
		}

		// Date which is selected and to Display in header
		var selectedDate = ( selectedDate.getMonth() + 1 ) + '-' + selectedDate.getDate() + '-' + selectedDate.getFullYear();
		$( '#cal-title-date' ).html( selectedDate );
		
		// The events JSON file
		var eventsData = "inc/events.json";

		// Iterate through each set of events and list them
		$.getJSON( eventsData, function( data ) {
			for ( var i in data ) {

				// Event start time Date object construction 
				var eventDate = new Date( data[i].startTime );

				// Date for comparing
				eventDateCalc = ( eventDate.getMonth() + 1 ) + '-' + eventDate.getDate() + '-' + eventDate.getFullYear();

				if( selectedDate === eventDateCalc ) {
					var startHours = eventDate.getHours(), // Event starting hour
						startMinutes = eventDate.getMinutes(), // Event starting minutes
						eventEndData = new Date( data[i].endTime ), // Event end time Date object construction
						endHours = eventEndData.getHours(), // Event ending hours
						endMinutes = eventEndData.getMinutes(), // Event ending minutes
						diffMs = Math.abs( eventEndData.getTime() - eventDate.getTime() ), // Total event duration in ms
						diffMin = Math.ceil( diffMs / ( 1000*60 ) ); // total event duration in minutes
					
					// Let's create the output content
					var output = '<div class="cal-event" style="top:' + ( ( startMinutes/ 60 ) * 100 ) + '%;height:' + diffMin + 'px">';
					output += '<p><strong>' + data[i].title + '</strong><span> ' + startHours + ':' + startMinutes + ' to ' + endHours + ':' + endMinutes + '</span></p>';
					output += '<div class="event-meta"><ul>';
					output += '<li><a href="#edit">edit</a></li>';
					output += '<li><a href="#delete">delete</a></li>';
					output += '<li><a href="#cancel">cancel</a></li>';
					output += '</ul></div>';
					output += '</div><div class="clearfix"></div>';

					// Append the output content to respective table row having identifier as hour
					$( 'tr#' + startHours + ' td.event-details').html( output );
					
				}
			}
			// The top notification style event counter
			var calCount = $( '.cal-event' ).length;
			// Append the count to the div
			$( '.cal-count' ).html ( calCount );
		});
	}

	// Function to clear off tables when date changes
	function clearTables() {
		// Append blank data to all td.event-details
		$( 'tr td.event-details' ).html('');
	}

	// Let's initiat the function on first page load
	getEvents();
});