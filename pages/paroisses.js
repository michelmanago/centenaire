import React, {useState} from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Chaville from '../components/paroisses/chaville';
import Dormition from '../components/paroisses/dormition';
import Daru from '../components/paroisses/daru';

export default function MaitreSpirituels({}) {
    const [section, setSection] = useState('Chaville');

    const DisplayContent = () => {
        switch (section) {
            case 'Chaville':
                return <Chaville />;
            case 'Dormition':
                return <Dormition />;
                case 'Daru':
                    return <Daru />;                   
            default:
                return null;
        }
    };
    return (
        <div className="bg-pyellow">
            <Head>
                <title>Les Paroisses:</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="max-w-screen-xl pt-5 mx-auto bg-white shadow md:flex md:flex-wrap">
                <div className="w-3/4 px-10 mx-auto md:w-1/4">
                    <div>Les Maîtres Spirituels:</div>
                    <ul className="list-disc">
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Chaville')}>
                            Notre-Dame Souveraine à Chaville
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Dormition')}>
                            Notre Dame de la Dormition
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Daru')}>
                            Cathédrale Saint Alexandre Nevski
                        </li>
                     </ul>
                </div>
                <div className="md:w-3/4">{DisplayContent()}</div>
            </div>
        </div>
    );
}
