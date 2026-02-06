var encodeMap = {
    "0": "Zm",
    "1": "Y0",
    "2": "E!",
    "3": "H_",
    "4": "Az",
    "5": "K9",
    "6": "Dc",
    "7": "Jc",
    "8": "Fu",
    "9": "Gxx",
};
var decodeMap = Object.fromEntries(Object.entries(encodeMap).flatMap(function (_a) {
    var key = _a[0], value = _a[1];
    return [value].map(function (v) { return [v, key]; });
}));
export var getHash = function (input) {
    if (!input)
        return "";
    return input
        .split("")
        .map(function (char) { return encodeMap[char] || char; })
        .join("");
};
export var decodeHash = function (input) {
    if (!input)
        return "";
    var result = "";
    var buffer = "";
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var char = input_1[_i];
        buffer += char;
        var matchedKey = Object.keys(decodeMap).find(function (key) { return buffer.endsWith(decodeMap[key]); });
        if (matchedKey) {
            result += matchedKey;
            buffer = '';
        }
    }
    return result;
};
