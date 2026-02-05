import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('/signin');
    }, []);

    return null;
}

export default Index;
