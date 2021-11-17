import Document, {Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return  {...initialProps}
    }
    render() {

        const hasGA = !!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/static/favicon.jpeg" />
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    {
                        hasGA && ([
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                            />,
                            <script
                                dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                                    page_path: window.location.pathname,
                                    });
                                `,
                                }}
                            />
                        ])
                    }
                    <meta content="width=device-width, initial-scale=1.0"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}


export default MyDocument