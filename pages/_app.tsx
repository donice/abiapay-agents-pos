import type { AppProps } from 'next/app'
import MainLayout from '@/src/components/layout/MainLayout'
import '../app/globals.css'
import './all-components-styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    )
}

export default MyApp
