import Head from 'next/head';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Header from '../components/header/header';
import styles from '../styles/pages/home.module.css';
import {useState} from 'react';
import { getMenu } from '../model/menu';

export default function Histoire({menu}) {
    const router = useRouter();
    const {locale, locales, defaultLocale} = router;


    return (
        <div className={`bg-pyellow`}>
            <Head>
                <title>histoire de l'archevêché</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header */}
            {menu && <Header menu={menu.data}/>}

            {/* Page home */}
            <div>
                <header className={styles.header + ' relative'}>
                    <Image
                        src="/static/img/vie-culturelle/cimetiere-russe/bandeau-cimetiere.jpg"
                        // width={1400}
                        // height={360}
                        objectFit="cover"
                        layout="fill"
                    />
                </header>
            </div>
            <main className="max-w-screen-xl pt-5 mx-auto bg-white shadow md:flex md:flex-wrap">
                <div className="mx-2 sm:mx-24">
                    <h3 >La maison russe</h3>		
                    <img className="float-left w-1/2 mt-2 mr-2" src="/static/img/vie-culturelle/cimetiere-russe/maisonrusse.jpg" /> 
                    <p>
                        En 1927, Sainte-Geneviève-des-Bois était une petite commune de neuf cents habitants qui, en raison de sa situation 
                        sur l’axe Paris – Orléans et de sa proximité avec la capitale (24 km), était en train de s’urbaniser rapidement. 
                        La bienfaitrice britannique Dorothy Paget, sensibilisée aux difficultés des émigrés russes de Paris, fit 
                        l’acquisition d’une vieille ferme de Sainte-Geneviève-des-Bois transformée en maison bourgeoise au XIXe siècle 
                        et connue depuis sous le nom de Château de la Cossonnerie. Miss Paget offrit le château à son amie russe, 
                        la princesse Vera Mestchersky19, ancienne administratrice de la Croix Rouge russe, qui envisageait de fonder 
                        une maison de repos et de retraite pour ses compatriotes réfugiés âgés, malades ou mutilés de guerre. 
                        De cette façon, le Château de la Cossonnerie à Sainte-Geneviève-des-Bois devint la « Maison Russe »                        En 1927, la princesse russe Vera Mestchersky fonda à Sainte-Geneviève-des-Bois une maison de retraite 
                        pour les plus âgés des émigrés russes qui avaient fui la Russie révolutionnaire et trouvé refuge en France. 
                        Avec les premiers décès de pensionnaires se posa la question du lieu de leur inhumation. 
                        Dès 1927, le premier pensionnaire de la Maison Russe décédé fut inhumé au cimetière communal de 
                        Sainte-Geneviève-des-Bois, pas loin de la maison de retraite. Les années suivantes, les inhumations 
                        de pensionnaires russes au cimetière de la ville se poursuivirent.
                    </p>
                    <p>
                        Au fil des années, on enterra non seulement les pensionnaires de la maison de retraite mais tous les émigrés 
                        russes décédés à Paris ou ailleurs en France. Le cimetière de Sainte-Geneviève-des-Bois devint ainsi la plus 
                        grande nécropole russe à l’étranger. En l’espace de dix-sept ans, de 1930 à 1947, il y a eu une augmentation 
                        considérable du nombre des concessions achetées par des Russes dans le cimetière de Sainte-Geneviève-des-Bois : 
                        27 concessions en 1930, 39 en 1931, 53 en 1935, 83 en 1939, 118 en 1941, 151 en 1942, 187 en 1943, 197 en 
                        1945 et 230 en 1947.
                    </p>
                    <p>
                        Le métropolite Euloge, à la tête de l’archevêché des paroisses orthodoxes russes en Europe occidentale, 
                        prit la décision de faire construire un lieu de culte orthodoxe à proximité immédiate du cimetière. 
                        La consécration de l’église, dédiée à la Dormition de la Mère de Dieu, eut lieu en octobre 1939.
                    </p>

                    <h3 >La seconde émigration</h3>		                                     
                    <p>
                        Après la Seconde Guerre mondiale et l’arrivée en France de la deuxième émigration russe, composée de prisonniers 
                        de guerre et de déportés refusant de rentrer en URSS, l’augmentation du nombre des inhumations russes au cimetière 
                        se poursuivit. Cette augmentation constante conduisit les autorités communales de Sainte-Geneviève-des-Bois à cinq 
                        agrandissements successifs du cimetière en 1931, 1945, 1955, 1969 et en 1980. Jusqu’au milieu des années 1970 d’ailleurs, 
                        la mairie de Sainte-Geneviève-des-Bois tolérait l’inhumation au cimetière des Russes extérieurs à la commune mais 
                        en 1976 elle y a mis officiellement fin.
                    </p>
                    <h3> Le cimetière aujourd'hui</h3>		                                      
                    <img className="float-right w-1/2 mt-2 ml-2" src="/static/img/vie-culturelle/cimetiere-russe/cimetiere.jpg" /> 
                     <p>
                        Le cimetière a été inscrit sur l'inventaire des sites pittoresques du département de l'Essonne en 1979 et à l'inventaire des monuments historiques en 2001. 
                        Avec plus de 5200 tombes orthodoxes où sont enterrés 11600 défunts, la nécropole russe de Sainte Geneviève des Bois constitue 
                        le plus grand cimetière russe en dehors de la Russie.
                    </p>
                    <p>
                        Une bonne partie de l’élite de la Russie du 20 ème siècle y est enterrée comme par exemple les danseurs et chorégraphes Rudoph Noureev, Serge Lifar, 
                        Préobrajenskaya, .., les écrivains et poètes dont le prix Nobel de littérature Ivan Bounine, Merejkovsky, Boris Zaitsev, Zinaida Gyppius, Nadejda Teffi, 
                        des peintres et sculpteurs comme Dmitri Stelletsky, Zinaida Serebriakova, …, des philosophes et penseurs religieux comme les RP Serge Boulgakov, 
                        Wassili Zenkovsky et Nicolas Afanassieff, Anton Kartachev, Nicolas et Wladimir Lossky,  des hommes d’Eglise comme le métropolite Euloge fondateur 
                        de l’Archevêché orthodoxe russe en Europe occidentale, des hommes politiques comme le comte Vladimir Kokovstsov (ancien premier ministre de Nicolas II), 
                        le Prince Gueorgui Lvoff (président du premier gouvernement provisoire en 1917), des militaires,  le cinéaste Andreï Tarkovski, ou encore le prince 
                        Felix Youssoupov principal artisan de l’assassinat de Raspoutine. 
                    </p>
                     <p>                                              
                        Dans son état actuel, le cimetière est assez étendu, clôturé par un haut mur blanc et découpé par de larges allées 
                        qui sont bordées d’arbres ; c’est la princesse Vera Mestcherski, en tant que directrice de la Maison russe, qui, 
                        en 1941, demanda l’autorisation du conseil municipal de Sainte-Geneviève-des-Bois pour faire planter des arbres en 
                        bordure des allées longeant les tombes russes.
                    </p>
                    <img className="float-left w-1/2 mt-2 mr-2" src="/static/img/vie-culturelle/cimetiere-russe/visite-poutine.jpg" /> 
                  <p>
                        Pour les 30 000 personnes qui visitent le lieu chaque année, des touristes russes pour la plupart, le cimetière
                        de Sainte-Geneviève-des-Bois est un « coin de la Sainte Russie », une partie de la « Russie éternelle ». 
                        Et pourtant, il n’a pas toujours été ainsi : les Russes de Russie ignoraient l’histoire du cimetière pratiquement 
                        jusqu’aux années 1980. Il fallut attendre la dissolution de l’Union soviétique et la levée de la censure pour que 
                        l’histoire du cimetière de Sainte-Geneviève-des-Bois soit connue en Russie. Quant aux autorités du pays, celles-ci 
                        virent dans le cimetière un important enjeu symbolique.
                    </p>
                    <p>
                        Les visites au cimetière du président Poutine en 2000 et de feu le patriarche Alexis II en 2007,
                        la remise par l’ambassadeur russe en France de la médaille Pouchkine à Tatiana Chomcheff, présidente du Comité pour 
                        l’entretien des sépultures russes du cimetière, mais aussi la prise en charge par l’Etat russe des frais de 
                        renouvellement des concessions appartenant à des familles russes témoignent de l’importance qu’accordent 
                        les autorités politiques et ecclésiastiques russes à la réconciliation de la mère patrie avec 
                        sa diaspora historique.
                    </p>
                </div>
            </main>
        </div>
    );
}

export async function getStaticProps(context) {

    const menu = await getMenu(context.locale)
  
    return {props: {
      menu: menu
    }}
  }
    