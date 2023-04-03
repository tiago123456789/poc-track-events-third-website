import React, { useEffect } from 'react';

export default function Index() {

    useEffect(() => {
        window.emitEvent("PageViewNext", null)
    }, [])

    return (
        <>
            <h1>Next.js Third Website</h1>
        </>
    );
}