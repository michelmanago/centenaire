import React, {useState} from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Chaville from '../components/paroisses/chaville';
import Dormition from '../components/paroisses/dormition';
import Crypte from '../components/paroisses/crypte';
import Daru from '../components/paroisses/daru';
import SaintPrix from '../components/paroisses/saintprix';
import Troyes from '../components/paroisses/troyes';


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
            case 'Crypte':
                return <Crypte />;  
            case 'SaintPrix':
                return <SaintPrix />;                   
            case 'Troyes':
                return <Troyes />;                   
                          
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
                    <div className="font-bold">Les Paroisses:</div>
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
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Crypte')}>
                            Crypte de la cathédrale
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('SaintPrix')}>
                            Saint Prix
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Troyes')}>
                            Troyes
                        </li>
                     </ul>
                </div>
                <div className="md:w-3/4">{DisplayContent()}</div>
            </div>
        </div>
    );
}
