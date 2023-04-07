import {Provider} from 'next-auth/client';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

import '../styles/globals.css';
import 'react-sortable-tree-patch-react-17/style.css';

//libs
import * as ga from '../lib/ga';

function MyApp({Component, pageProps}) {
    const router = useRouter();

    useEffect(() => {
        const hasGA = !!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

        if (hasGA) {
            const handleRouteChange = url => {
                ga.pageview(url);
            };
            //When the component is mounted, subscribe to router changes
            //and log those page views
            router.events.on('routeChangeComplete', handleRouteChange);

            // If the component is unmounted, unsubscribe
            // from the event with the `off` method
            return () => {
                router.events.off('routeChangeComplete', handleRouteChange);
            };
        }
    }, [router.events]);

    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
