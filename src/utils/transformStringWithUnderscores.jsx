export var transformStringWithUnderscores = function (input) {
    return input.replace(/_/g, ' ').replace(/\b\w/g, function (char) { return char.toUpperCase(); });
};
