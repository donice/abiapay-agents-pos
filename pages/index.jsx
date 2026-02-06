import { useEffect } from 'react';
import { useRouter } from 'next/router';
var Index = function () {
    var router = useRouter();
    useEffect(function () {
        router.replace('/signin');
    }, []);
    return null;
};
export default Index;
