import React from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {

    return (
        <>
            <Head>
                <script
                    src="https://event-track-sdk-js.s3.us-east-1.amazonaws.com/sdk.js"
                    account-id="bfaa1795-5775-40d3-ab4e-2f57eed792eb"
                    event-project-id="81f102b3-52b4-448b-8d71-6444d71b938d"></script>
            </Head>
            <Component {...pageProps} />
        </>
    );
}