import { useRouter } from 'next/router';

export { useRouter };

export const usePathname = () => {
    const router = useRouter();
    return router.asPath.split('?')[0];
};

export const useSearchParams = () => {
    const router = useRouter();
    return {
        get: (key: string) => {
            const val = router.query[key];
            if (val !== undefined) return Array.isArray(val) ? val[0] : val;

            if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                return params.get(key);
            }
            return null;
        }
    } as any;
};
