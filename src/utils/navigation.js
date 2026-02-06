import { useRouter } from 'next/router';
export { useRouter };
export var usePathname = function () {
    var router = useRouter();
    return router.asPath.split('?')[0];
};
export var useSearchParams = function () {
    var router = useRouter();
    return {
        get: function (key) {
            var val = router.query[key];
            if (val !== undefined)
                return Array.isArray(val) ? val[0] : val;
            if (typeof window !== 'undefined') {
                var params = new URLSearchParams(window.location.search);
                return params.get(key);
            }
            return null;
        }
    };
};
