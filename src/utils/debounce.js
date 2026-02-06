function debounce(func, delay) {
    if (delay === void 0) { delay = 500; }
    var timeoutId;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            func.apply(_this, args);
        }, delay);
    };
}
