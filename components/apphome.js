import parse from 'html-react-parser'
import Image from 'next/image'



export default function AppHome ({currentLanguage}) {
    return (
        <div className="bg-pyellow">
            <div className="container sm:mx-auto bg-pwhite max-w-screen-xl">
                <main className="bg-white pt-4 sm:px-48">
                   <h2 className=""    >Centenaire de l'Archevêché</h2>
 
                    <p className="pb-2">
                        L’Archevêché est une entité ecclésiale orthodoxe réunissant les églises de tradition russe en Europe occidentale. </p>
                    <p className='pb-2'>
                        Rattaché canoniquement au Patriarcat de Moscou, l’Archevêché est actuellement dirigé par Son Éminence le métropolite Jean de Doubna. Fidèle à son ancrage spirituel et liturgique issu 
                        de la tradition russe, il conserve les spécificités de son fonctionnement ecclésial et pastoral tel qu’établi par le Concile de Moscou de 1917-1918 ainsi que l'héritage de sa propre 
                        tradition.
                    </p>
                    <p className='pb-2'> Fondé en 1921 par le saint patriarche Tikhon et confiée au métropolite Euloge, l'Archevêché célèbre cette année son centenaire.
                        A cette occasion et en ces temps d'épidémie de Covid19, nous avons réalisé ce site d'exposition virtuelle qui retrace les événements marquants de ces cent dernières années.
                        Nous présentons notamment les contributions de l'Archevêché au patrimoine éclesial et culturel. </p>
                        <p>
                     </p>

                     <div className="ml-175px"><Image src='/static/img/paroisses/saintefoy/serie1/1-skite.jpg'
                        layout="responsive"
                        width="788"
                        height="1050"></Image>
                    </div>
                </main>
            </div>
        </div>
	)
}
