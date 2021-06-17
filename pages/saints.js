import Head from 'next/head';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Header from '../components/header/header';
import styles from '../styles/pages/home.module.css';
import AppSaints from '../components/appsaints';
import {useState} from 'react';
import Klepinine from '../components/saints/klepinine';
import Marie from '../components/saints/marie';
import Fondaminsky from '../components/saints/fondaminsky';
import Skobtsov from '../components/saints/skobtsov';
import {Medvekov} from '../components/saints/medvekov';
import { getMenu } from '../model/menu';

export default function Saints({menu}) {
    const router = useRouter();
    const {locale, locales, defaultLocale} = router;

    const [section, setSection] = useState('default');

    const DisplayContent = () => {
        switch (section) {
            case 'Medvekov':
                return <Medvekov />;
            case 'Marie':
                return <Marie />;
            case 'Klépinine':
                return <Klepinine />;
            case 'Skobtsov':
                return <Skobtsov />;
            case 'Fondaminsky':
                return <Fondaminsky />;
            default:
                return <AppSaints currentLanguage={locale} />;
        }
    };

    return (
        <div className={`bg-pyellow`}>
            <Head>
                <title>Les saints de l'archevêché</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header */}
            {menu && <Header menu={menu.data}/>}

            {/* Page home */}
            <div>
                <header className={styles.header + ' relative'}>
                    <Image
                        src="/static/img/bandeau_cathedrale.jpg"
                        // width={1400}
                        // height={360}
                        objectFit="cover"
                        layout="fill"
                    />
                </header>
            </div>
            <div className="max-w-screen-xl pt-5 mx-auto bg-white shadow md:flex md:flex-wrap">
                <div className="w-3/4 px-10 mx-auto md:w-1/4">
                    <div>Les Saints:</div>
                    <ul className="list-disc">
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('default')}>
                            Définitions
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Medvekov')}>
                            Père Alexis Medvekov (1867-1934)
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Marie')}>
                            Mère Marie (Skobtsov) (1891-1945)
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Klépinine')}>
                            Père Dimitri Klépinine (1904-1944)
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Skobtsov')}>
                            Georges (Youri) Skobtsov (1921-1944)
                        </li>
                        <li className="cursor-pointer hover:underline" onClick={() => setSection('Fondaminsky')}>
                            Élie Fondaminsky (1880-1942)
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
    