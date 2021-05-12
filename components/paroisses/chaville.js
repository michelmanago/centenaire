import Carousel from '../carousel';

export default function Chaville() {
    const imgArraySanctuaire = [
        {url: '/static/img/paroisses/chaville/Sanctuaire/photo1.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Sanctuaire/photo2.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Sanctuaire/photo3.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Sanctuaire/photo4.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Sanctuaire/photo5.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Sanctuaire/photo6.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Sanctuaire/photo7.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Sanctuaire/photo8.jpg', legende: ''},
    ];
    const imgArrayPose = [
        {url: '/static/img/paroisses/chaville/Pose/photo1.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Pose/photo2.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Pose/photo3.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Pose/photo4.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Pose/photo5.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Pose/photo6.jpg', legende: ''},
    ]

    const imgArrayToday = [
        {url: '/static/img/paroisses/chaville/Today/photo1.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo2.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo3.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo4.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo5.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo6.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo7.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo8.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo9.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo10.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo11.jpg', legende: ''},
        {url: '/static/img/paroisses/chaville/Today/photo12.jpg', legende: ''},
    ];
    return (
        <div className="px-10 bio-block">
            <h2>Notre-Dame Souveraine à Chaville</h2>

            <p>
                En mars 1917, en pleine guerre mondiale, une humble paysanne du village de Kolomenskoë, près de Moscou,
                voit apparaître l’icône de Notre-Dame Souveraine (dernière icône apparue en Russie) ; puis c’est la
                Révolution d’octobre, l’effondrement de l’Empire russe, l’exécution tragique de la famille impériale, la
                guerre civile et la misère.
            </p>
            <p>
                Certains Russes, fuyant leur terrible destinée, ayant tout perdu, partent pour d’autres pays, en
                particulier la France, se fixent à Paris et ses environs, particulièrement dans l’Ouest de la Capitale.
                Ils travaillent pour la plupart dans des usines (automobiles), donnant lieu à la création et à
                l’extension de lotissements à Chaville, Sèvres, Clamart, Ville d’Avray.
            </p>
            <p>
                En 1926, les Russes orthodoxes habitant Chaville et les communes limitrophes s’organisent et élisent un
                comité́ qui a pour mission de créer les premières bases d’une paroisse.
            </p>

            <p>
                Une chapelle de fortune est installée dans un garage près de la gare de Chaville-Vélizy. Le métropolite
                Euloge va désigner le père Kalachnikov pour assurer tous les offices à Chaville et Clamart.
            </p>
            <p>
                Cette paroisse est déclarée à la Préfecture de Versailles le 30 mai 1927, sous le nom d’Association
                orthodoxe russe de Chaville (journal officiel du 22 juin 1927) placée sous la protection de Notre Dame
                Souveraine.
            </p>

            <ul className="mb-2 ml-8 list-disc">
                <li>1927-1929 : recteur Georges Fedorov</li>
                <li>1929-1931 : recteur Georges Choumkine</li>
                <li>1932-1954 : recteur Jean MAXIMENKO</li>
            </ul>

            <p>
                Le 19 mai 1935 : pose de la première pierre de la petite église, près de la forêt de Meudon (située
                actuellement au 22 rue Alexis Maneyrol) dans un site calme et boisé, au centre de la communauté russe se
                répartissant sur les communes de Chaville, Viroflay, Vélizy-Bas et Vélizy le Clos. Les paroissiens, avec
                leur prêtre le père Jean Maximenko, construisent l’église de leurs propres mains.
            </p>

            <p>
                Le métropolite Euloge vient le 9 juin 1935 consacrer l’autel et célébrer l’office de la pose de la
                première pierre.
            </p>
            <Carousel imgList={imgArrayPose} legende="Pose de la 1ère pierre et construction de l'église" id='pose' />
            <p>
                Le père Jean Maximenko, élevé à la dignité d’archiprêtre mitré, sera le recteur de la paroisse jusqu’en
                1954.
            </p>
            <ul className="mb-2 ml-8 list-disc">
                <li>1955-1964 : archiprêtre Léonide Moguilevski</li>
                <li>1964-1966 : archiprêtre Léonide Nikolski</li>
                <li>
                    1967-1977 : archiprêtre Alexandre Davidoff. Apprécié de tous, il a de bons rapports avec l’église
                    catholique de Vélizy ; il meurt accidentellement le 31 mai en 1977.
                </li>
                <li>1977-1990 : recteur Pierre Nivière.</li>
            </ul>

            <p>Puis, les prêtres desservants la paroisse ont été successivement :</p>
            <ul className="mb-2 ml-8 list-disc">
                <li>1990-1994 : révérend Père Michel Evdokimov</li>
                <li>1994-1999 : révérend Père Nicolas Molinier</li>
            </ul>

            <p>
                La chapelle actuelle a été quelque peu remaniée (iconostase différente et clocheton ajouté). En 2002 une
                rénovation intérieure et extérieure a été entreprise et en 2005 des fresques de style orthodoxe russe y
                ont été exécutées.
            </p>

            <Carousel imgList={imgArraySanctuaire} legende='Fresques du sanctuaire' id='sanctuaire' />

            <p>
                Les offices sont célébrés en français et en slavon, les lectures et prédications en français et les
                chants liturgiques en slavon et en français.
            </p>

            <Carousel imgList={imgArrayToday} legende="La paroisse aujourd'hui" id='today' />
        </div>
    );
}
