import React from 'react';
import Head from 'next/head';
import StickerPrintsComponent from '@/src/components/modules/prints/sticker';

const StickerPrintsPage = () => {
    return (
        <div>
            <Head>
                <title>Sticker Prints - ABIAPAY</title>
            </Head>
            <StickerPrintsComponent />
        </div>
    );
};

export default StickerPrintsPage;
