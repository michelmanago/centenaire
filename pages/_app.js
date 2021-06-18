import {Provider} from 'next-auth/client';

import '../styles/globals.css';
import 'react-sortable-tree/style.css';

//libs

function MyApp({Component, pageProps}) {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
