export var formatAmount = function (input) {
    if (input === undefined || input === null) {
        return "0.00";
    }
    var num;
    if (typeof input === 'string') {
        var cleanedInput = input.replace(/,/g, '');
        num = parseFloat(cleanedInput);
    }
    else {
        num = input;
    }
    if (isNaN(num)) {
        return "~";
    }
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
