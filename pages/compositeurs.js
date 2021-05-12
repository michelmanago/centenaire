import React, {useState} from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Kedroffp from '../components/compositeurs/kedroffp';
import Kedrofff from '../components/compositeurs/kedrofff';

export default function Compositeurs({}) {
    const [section, setSection] = useState('KedroffP');

    const DisplayContent = () => {
        switch (section) {
            case 'KedroffP':
                return <Kedroffp />;
            case 'KedroffF':
                return <Kedrofff />;

            default:
                return null;
        }
    };
    return (
        <div className='bg-pyellow'>
            <Head>
                <title>Les Maîtres Spirituels</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="max-w-screen-xl pt-5 mx-auto bg-white shadow md:flex md:flex-wrap">
                <div className="w-3/4 px-10 mx-auto md:w-1/4">
                    <div>les compositeurs de musique liturgique:</div>
                    <ul className="list-disc">
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('KedroffP')}>
                            Nicolas Kedroff père
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('KedroffF')}>
                            Nicolas Kedroff fils
                        </li>
                    </ul>
                </div>
                <div className="md:w-3/4">{DisplayContent()}</div>
            </div>
        </div>
    );
}
