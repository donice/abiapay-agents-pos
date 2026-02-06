export function getCurrentDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = padNumber(now.getMonth() + 1); // Months are zero-indexed
    var day = padNumber(now.getDate());
    var hours = padNumber(now.getHours());
    var minutes = padNumber(now.getMinutes());
    var seconds = padNumber(now.getSeconds());
    return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
function padNumber(num) {
    return num.toString().padStart(2, '0');
}
