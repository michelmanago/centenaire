import React, {useState} from 'react';
import Head from 'next/head';
import Header from '../components/header/header';
import SelectCompositeur from '../components/selectcompositeur';
import Kedroffp from '../components/compositeurs/kedroffp';
import Kedrofff from '../components/compositeurs/kedrofff';
import { getMenu } from '../model/menu';
import Evetz from '../components/compositeurs/evetz';

export default function Compositeurs({menu}) {
    const [section, setSection] = useState('KedroffP');

    const DisplayContent = () => {
        switch (section) {
            case 'KedroffP':
                return <Kedroffp />;
            case 'KedroffF':
                return <Kedrofff />;
                case 'Evetz':
                    return <Evetz />;
            default:
                return null;
        }
    };
    return (
        <div className="bg-pyellow">
            <Head>
                <title>Les Compositeurs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {menu && <Header menu={menu.data}/>}

            <div className="max-w-screen-xl pt-5 mx-auto bg-white shadow md:flex md:flex-wrap">
                <div className="visible md:hidden">
                    <SelectCompositeur compositeur={section} setCompositeur={setSection}/>
                </div>

                <div className="hidden md:block px-10 mx-auto md:w-1/4">
                    <div className="font-bold">Les compositeurs de musique liturgique:</div>
                    <ul className="list-disc">
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('KedroffP')}>
                            Nicolas Kedroff père
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('KedroffF')}>
                            Nicolas Kedroff fils
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Evetz')}>
                            Eugène Evetz
                        </li>
                    </ul>
                </div>
                <div className="md:w-3/4">{DisplayContent()}</div>
            </div>
        </div>
    );
}

export async function getStaticProps(context) {

    const menu = await getMenu(context.locale)
  
    return {props: {
      menu: menu
    }}
  }
    