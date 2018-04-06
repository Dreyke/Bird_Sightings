var moment = require('moment-timezone');

function formatDate(date) {
    // Get UTC standard date version of this date
    m = moment.utc(date);
    //convert it to Minnesota's time zone and format
    return m.tz('America/Chicago').format('dddd, MMM Do YYYY, h:mm a');
}

// count number of sightings
function length(array) {
    return array.length;
}

module.exports = {
    formatDate,
    length
};