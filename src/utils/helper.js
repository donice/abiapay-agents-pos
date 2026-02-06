var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function CamelCaseToTitleCase(s) {
    if (s == null) {
        return "";
    }
    s = s.replace(/_/g, " ");
    s = s.replace(/\b\w/g, function (str) { return str.toUpperCase(); });
    s = s.replace(/([a-z])([A-Z])/g, "$1 $2");
    var specialCases = {
        "Agent Email": "Agent Email",
    };
    var words = s.split(" ");
    for (var i = 0; i < words.length; i++) {
        var key = words.slice(i).join(" ");
        if (specialCases[key]) {
            words.splice.apply(words, __spreadArray([i, words.length - i], specialCases[key].split(" "), false));
            break;
        }
    }
    return words.join(" ");
}
export var getErrorMessages = function (errors) {
    if (errors == null) {
        return "";
    }
    return Object.values(errors).join(', ');
};
