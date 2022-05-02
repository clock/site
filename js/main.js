// get time current 12 hour time
function getTime() {
    var date = new Date();
    var hour = date.getHours();

    if (hour > 12)
        hour = hour - 12;

    var min = date.getMinutes();
    var sec = date.getSeconds();
    var time = hour + ':' + min + ':' + sec;
    return time;
}

function check_title()
{
    let title = getTime();
    if (document.title != title)
        document.title = title;
}

// so the first update isnt delayed
check_title();

// run for infinity every 500ms
setInterval(check_title, 500);