var event = '2018-09-21-cah';
function renderEvent(cells) {
    var currentDate = '';
    var currentDateDiv;
    cells.forEach(function (cell, index) {
        cell['_id'] = 'cell-' + index;
        cell['start'] = new Date(cell['start']).getTime();
        cell['stop'] = new Date(cell['stop']).getTime();
        let start = new Date(cell.start);
        if (start.toDateString() != currentDate) {
            $("#events").append(currentDateDiv);
            currentDate = start.toDateString();
            currentDateDiv = $("<div>")
                .addClass('event-date')
                .addClass('col-md-2')
                .addClass('col-sm-4')
                .append(
                    $('<h2>')
                        .text(currentDate)
                );
        }

        currentDateDiv.append(
            $('<div>')
                .append(
                    $('<a>')
                        .addClass('event-time')
                        .on('click', function () {
                            let localTimeSlider = $('#date-slider').data("timeslider");
                            localTimeSlider.set_new_start_timestamp(start.getTime());
                        })
                        .on('mouseover', function () {
                            $('#' + cell._id)
                                .addClass('highlight');
                        })
                        .on('mouseout', function () {
                            $('#' + cell._id)
                                .removeClass('highlight');
                        })
                        .text(cell.text)
                        .append(
                            $('<span>').text(start.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) + " - "
                                + new Date(cell.stop).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
                        )
                )
        );
        $("#events").append(currentDateDiv);
    });

    $('#version').text('Version: ' + $.fn.TimeSlider.VERSION);
    $('#date-slider-zoom').slider({
        min: 1,
        max: 48,
        value: 24,
        step: 0.2,
        slide: function (event, ui) {
            $('#date-slider').TimeSlider({hours_per_ruler: ui.value});
        }
    });

    let timeSlider = $('#date-slider').TimeSlider({
        start_timestamp: new Date().getTime(),
        current_timestamp: new Date().getTime(),
        timecell_enable_move: false,
        timecell_enable_resize: false,
        hours_per_ruler: 8,
        init_cells: cells,
        on_add_cell_callback: function (id, start, stop) {
            let timeCellInfo = cells.find(function (element) {
                return element._id === id;
            });
            $('#' + id).text(timeCellInfo.text);
        }
    });
    $('.prompts').css('top', '-174px');
    $('.reset').on('click', function () {
        timeSlider.data("timeslider").set_new_start_timestamp(new Date().getTime());
    });
}

$.ajax({
    type: 'GET',
    url: '/Events/' + event + '/events.json',
    dataType: 'JSON',
    success: function (cells) {
        renderEvent(cells);
    },
    error: function(xhr, status, error){
        alert(error);
    }
});

$.get('/Events/' + event + '/about.md', function(data) {
    $('#messages').html(marked(data));
});
