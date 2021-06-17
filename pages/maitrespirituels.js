import React, {useState} from 'react';
import Head from 'next/head';
import Header from '../components/header/header';
import Chrol from '../components/maitrespirituels/chrol';
import { getMenu } from '../model/menu';

export default function MaitreSpirituels({}) {
    const [section, setSection] = useState('Chrol');

    const DisplayContent = () => {
        switch (section) {
            case 'Chrol':
                return <Chrol />;

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

            {menu && <Header menu={menu.data}/>}

            <div className="max-w-screen-xl pt-5 mx-auto bg-white shadow md:flex md:flex-wrap">
                <div className="w-3/4 px-10 mx-auto md:w-1/4">
                    <div>Les Maîtres Spirituels:</div>
                    <ul className="list-disc">
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Chrol')}>
                            Le Père Léonide Chrol
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
    