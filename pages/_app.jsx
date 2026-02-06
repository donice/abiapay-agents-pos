import MainLayout from '@/src/components/layout/MainLayout';
import '../app/globals.css';
import './all-components-styles.scss';
function MyApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (<MainLayout>
            <Component {...pageProps}/>
        </MainLayout>);
}
export default MyApp;
