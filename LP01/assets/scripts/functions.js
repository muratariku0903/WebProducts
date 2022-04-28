function getDir(place, n) {
    return place.pathname.replace(new RegExp("(?:\\\/+[^\\\/]*){0," + ((n || 0) + 1) + "}$"), "/");
}

function getBrowserType(userAgent) {
    let type = '';
    if (userAgent.indexOf('msie') != -1) {
        type = 'msie';
    } else if (userAgent.indexOf('edge') != -1) {
        type = 'edge';
    } else if (userAgent.indexOf('chrome') != -1) {
        type = 'chrome';
    } else if (userAgent.indexOf('safari') != -1) {
        type = 'safari';
    } else if (userAgent.indexOf('firefox') != -1) {
        type = 'firefox';
    }

    return type;
}
