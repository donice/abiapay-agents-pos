import { useEffect, useState } from 'react';
var useNetworkStatus = function () {
    var _a = useState(true), isOnline = _a[0], setIsOnline = _a[1];
    useEffect(function () {
        var handleOnline = function () { return setIsOnline(true); };
        var handleOffline = function () { return setIsOnline(false); };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        setIsOnline(navigator.onLine);
        return function () {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    return isOnline;
};
export default useNetworkStatus;
