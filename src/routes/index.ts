
export const protectedRoutes: string[] = [
  '/',
  '/dashboard',
  '/tickets',
  '/tickets/transport',
  '/tickets/transport/add',
  '/tickets/transport/summary',
  '/tickets/market',
];

export const unprotectedRoutes: string[] = [
  '/signin',
  '/signout',
  '/forgot-password'
];
