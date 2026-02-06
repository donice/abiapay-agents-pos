export function randomInvoiceGenerator() {
    var randomNumber = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    var randomLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26), 65 + Math.floor(Math.random() * 26));
    var now = new Date();
    var year = String(now.getFullYear()).slice(2); // Get last two digits of the year
    var month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    var day = String(now.getDate()).padStart(2, '0');
    var hour = String(now.getHours()).padStart(2, '0');
    var minute = String(now.getMinutes()).padStart(2, '0');
    var dateTimeString = "".concat(year).concat(month).concat(day).concat(hour).concat(minute);
    return randomNumber + randomLetters + dateTimeString;
}
