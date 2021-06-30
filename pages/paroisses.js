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
import SaintBrieuc from '../components/paroisses/saintbrieuc';
import Chalette from '../components/paroisses/chalette';
import Grenoble from '../components/paroisses/grenoble';
import Maastricht from '../components/paroisses/maastricht';
import Marseille from '../components/paroisses/marseille';
import Montpellier from '../components/paroisses/montpellier';
import SainteFoy from '../components/paroisses/saintefoy';
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
                return "/static/img/paroisses/olivier-de-serres/bandeau-ods.jpg";    
            case 'SaintBrieuc':
                return "/static/img/paroisses/saintbrieuc/bandeau-saintbrieuc.jpg";                                
            case 'Chalette':
                return "/static/img/paroisses/chalette/bandeau-chalette.jpg";                                
            case 'Maastricht':
                return "/static/img/paroisses/maastricht/bandeau-maastricht.jpg";                                
            case 'Marseille':
                return "/static/img/paroisses/marseille/bandeau-marseille.jpg";                                
            default:
               return null;
        }
    };


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
            case 'SaintBrieuc':
                return <SaintBrieuc />;                                            
            case 'Chalette':
                return <Chalette />;                                            
            case 'Grenoble':
                return <Grenoble />;  
            case 'Maastricht':
                return <Maastricht />;                                            
            case 'Marseille':
                return <Marseille />;                                            
            case 'Montpellier':
                    return <Montpellier />;                                    
            case 'SainteFoy':
                return <SainteFoy />;
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

            {Bandeau() && <header className={styles.header + ' relative'}>
                    <Image
                        src= {Bandeau()}
                        // height={360}
                        objectFit="cover"
                        layout="fill"
                    />
            </header>}
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
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('SaintBrieuc')}>
                            Saint Brieuc
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Chalette')}>
                            Chalette
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Grenoble')}>
                            Grenoble
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Maastricht')}>
                            Maastricht
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Marseille')}>
                            Marseille
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Montpellier')}>
                            Montpellier
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('SainteFoy')}>
                            SainteFoy   
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
    