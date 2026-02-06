export var formatDate = function (dateString) {
    var date = new Date(dateString);
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = String(date.getFullYear()).slice(-2);
    var hours = String(date.getHours()).padStart(2, "0");
    var minutes = String(date.getMinutes()).padStart(2, "0");
    return "".concat(day, "/").concat(month, "/").concat(year, " ").concat(hours, ":").concat(minutes);
};
export var transformDate = function (dateString) {
    if (!dateString)
        return "";
    var _a = dateString.split(/[-/]/).map(Number), a = _a[0], b = _a[1], c = _a[2];
    var year = a > 31 ? a : c > 31 ? c : b;
    var day = a > 12 ? b : b > 12 || c > 31 ? c : a;
    var month = [a, b, c].find(function (part) { return part !== year && part !== day; });
    return "".concat(year, "-").concat(String(day).padStart(2, "0"), "-").concat(String(month).padStart(2, "0"));
};
export var submitDate = function (dateString) {
    if (!dateString)
        return "";
    var _a = dateString.split(/[-/]/).map(Number), a = _a[0], b = _a[1], c = _a[2];
    var year = a > 31 ? a : c;
    var day = c > 31 ? a : b > 12 ? b : c;
    var month = [a, b, c].find(function (part) { return part !== year && part !== day; });
    return "".concat(String(day).padStart(2, "0"), "-").concat(String(month).padStart(2, "0"), "-").concat(year);
};
