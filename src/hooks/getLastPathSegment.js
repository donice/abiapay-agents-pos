export var getLastPathSegment = function (path) {
    if (!path) {
        return "";
    }
    var segments = path.split("/");
    return segments[segments.length - 1] || "";
};
