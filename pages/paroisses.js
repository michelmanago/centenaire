import React, {useState} from 'react';
import Head from 'next/head';
import Header from '../components/header/header';
import styles from '../styles/pages/home.module.css';
import Image from 'next/image';
import SelectParoisse from '../components/selectparoisse';
import Chaville from '../components/paroisses/chaville';
import Dormition from '../components/paroisses/dormition';
import Crypte from '../components/paroisses/crypte';
import Daru from '../components/paroisses/daru';
import SaintPrix from '../components/paroisses/saintprix';
import Troyes from '../components/paroisses/troyes';
import Olivierdeserres from '../components/paroisses/olivierdeserres';
import { getMenu } from '../model/menu';


export default function MaitreSpirituels({menu}) {
    const [section, setSection] = useState('Chaville');
 
    const Bandeau = () => {
        switch (section) {
            case 'Chaville':
                return "/static/img/paroisses/chaville/bandeau-chaville.jpg";
            case 'Dormition':
                return "/static/img/paroisses/dormition/bandeau-dormition.jpg";
            case 'Daru':
                    return "/static/img/paroisses/daru/bandeau-daru.jpg";               
            case 'Crypte':
                return "/static/img/paroisses/crypte/bandeau-crypte.jpg";
            case 'SaintPrix':
                return "/static/img/paroisses/crypte/bandeau-crypte.jpg";              
            case 'Troyes':
                return "/static/img/paroisses/crypte/bandeau-crypte.jpg";           
            case 'Olivierdeserres':
                return "/static/img/paroisses/crypte/bandeau-crypte.jpg";                                
            default:
                return null;
        }
    };

    console.log("bandeau is "+Bandeau);

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
            case 'Olivierdeserres':
                return <Olivierdeserres />;                                            
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
 
            {menu && <Header menu={menu.data}/>}

            <header className={styles.header + ' relative'}>
                    <Image
                        src= {Bandeau()}
                        // height={360}
                        objectFit="cover"
                        layout="fill"
                    />
                    </header>
            <div className="max-w-screen-xl pt-5 mx-auto bg-white shadow md:flex md:flex-wrap">

                <div className="visible md:hidden">
                    <SelectParoisse paroisse={section} setParoisse={setSection}/>
                </div>
 
                <div className="hidden md:block px-10 mx-auto md:w-1/4">
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
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Olivierdeserres')}>
                            Olivier de Serres
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
    