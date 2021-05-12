import Carousel from '../carousel';

export default function Dormition() {
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
    ];

    const imgArrayToday = [
        {url: '/static/img/paroisses/dormition/Today/photo1.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo2.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo3.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo4.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo5.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo6.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo7.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo8.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo9.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo10.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo11.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo12.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo13.jpg', legende: ''},
    ];
    return (
        <div className="px-10 bio-block">
            <h2>Notre Dame de la Dormition à Sainte Geneviève des Bois</h2>

            <h3>La Nécropole Russe de Sainte Geneviève des Bois</h3>

            {/*<Carousel imgList={imgArraySanctuaire} legende="" id='1' />
            <Carousel imgList={imgArrayPose} legende="" id='2' />
            */}

            <p>
                La nécropole russe comprend d'une part l'église orthodoxe de la Dormition de la sainte mère de Dieu et
                vierge Marie, ses dépendances et son jardin, et d'autre part les tombes russes orthodoxes du cimetière
                communal de Sainte Geneviève des Bois.
            </p>
            <p>
                L'origine du cimetière provient de l'accueil fait aux émigrés russes âgés à la « Maison Russe » au
                château de la Cossonerie située à 500 mètres du cimetière, qui furent enterrés là dès 1927, poussant la
                municipalité de Sainte Geneviève des Bois à créer un « carré russe » au sein du cimetière communal. Ce
                dernier a été inscrit sur l'inventaire des sites pittoresques du département de l'Essonne en 1979 et à
                l'inventaire des monuments historiques en 2001. Avec plus de 5200 tombes orthodoxes où sont enterrés
                11600 défunts, la nécropole russe de Sainte Geneviève des Bois constitue le plus grand cimetière russe à
                l’étranger.
            </p>
            <p>
                Une bonne partie de l’élite de la Russie du 20 ème siècle y est enterrée comme par exemple les danseurs
                et chorégraphes Rudoph Noureev, Serge Lifar, Préobrajenskaya, .., les écrivains et poètes dont le prix
                Nobel de littérature Ivan Bounine, Merejkovsky, Boris Zaitsev, Zinaida Gyppius, Nadejda Teffi, des
                peintres et sculpteurs comme Dmitri Stelletsky, Zinaida Serebriakova, …, des philosophes et penseurs
                religieux comme les RP Serge Boulgakov, Wassili Zenkovsky et Nicolas Afanassieff, Anton Kartachev,
                Nicolas et Wladimir Lossky, des hommes d’Eglise comme le métropolite Euloge fondateur de l’Archevêché
                orthodoxe russe en Europe occidentale, des hommes politiques comme le comte Vladimir Kokovstsov (ancien
                premier ministre de Nicolas II), le Prince Gueorgui Lvoff (président du premier gouvernement provisoire
                en 1917), des militaires, le cinéaste Andreï Tarkovski, ou encore le prince Felix Youssoupov principal
                artisan de l’assassinat de Raspoutine.
            </p>

            <p>
                L'église construite en 1939 sous l’impulsion du métropolite Euloge, est de style novgorodien du XVème
                siècle avec un clocher lui de style pskovien. Elle est l'œuvre de l'architecte et décorateur Albert
                Alexandrovich Benois et de son épouse Margarita Alexandrovna qui ont également réalisés les fresques
                murales à l'intérieur de l'église et de la crypte. La nécropole russe constitue un patrimoine
                mondialement connu.
            </p>

            <h3>Histoire</h3>
            <p>
                En 1927, Sainte-Geneviève-des-Bois était une petite commune de neuf cents habitants qui, en raison de sa
                situation sur l’axe Paris – Orléans et de sa proximité avec la capitale (24 km), était en train de
                s’urbaniser rapidement. La bienfaitrice britannique Dorothy Paget, sensibilisée aux difficultés des
                émigrés russes de Paris, fit l’acquisition d’une vieille ferme de Sainte-Geneviève-des-Bois transformée
                en maison bourgeoise au XIXe siècle et connue depuis sous le nom de Château de la Cossonnerie. Miss
                Paget offrit le château à son amie russe, la princesse Vera Mestchersky19, ancienne administratrice de
                la Croix Rouge russe, qui envisageait de fonder une maison de repos et de retraite pour ses compatriotes
                réfugiés âgés, malades ou mutilés de guerre. De cette façon, le Château de la Cossonnerie à
                Sainte-Geneviève-des-Bois devint la « Maison Russe » En 1927, la princesse russe Vera Mestchersky fonda
                à Sainte-Geneviève-des-Bois une maison de retraite pour les plus âgés des émigrés russes qui avaient fui
                la Russie révolutionnaire et trouvé refuge en France. Avec les premiers décès de pensionnaires se posa
                la question du lieu de leur inhumation. DÈS 1927, le premier pensionnaire de la Maison Russe décédé fut
                inhumé au cimetière communal de Sainte-Geneviève-des-Bois, pas loin de la maison de retraite. Les années
                suivantes, les inhumations de pensionnaires russes au cimetière de la ville se poursuivirent.
            </p>

            <p>
                Au fil des années, on enterra non seulement les pensionnaires de la maison de retraite mais tous les
                émigrés russes décédés à Paris ou ailleurs en France. Le cimetière de Sainte-Geneviève-des-Bois devint
                ainsi la plus grande nécropole russe à l’étranger.
            </p>
            <h3>La constuction de l'église de la Dormition</h3>
            <p>
                Le métropolite Euloge, à la tête de l’archevêché des paroisses orthodoxes russes en Europe occidentale,
                prit la décision de faire construire un lieu de culte orthodoxe à proximité immédiate du cimetière.
                Ainsi, l’administration diocésaine fit l’acquisition d’un terrain jouxtant le cimetière pour y faire
                bâtir une église orthodoxe. La construction de l’église fut confiée à l’architecte russe Albert
                Alexandrovitch Benois qui fit appel à l'entrepreneur Jules Despeyroux.
            </p>
            <div className="flex flex-wrap">
                {' '}
                <img className="w-1/2 px-1" src="/static/img/architecte.jpg" alt="architecte" />
                <img className="w-1/2 px-1" src="/static/img/entrepreneur.jpg" alt="entrepreneur" />
            </div>
            <p>
                Pour la nouvelle église, Bénois adopta le style de Novgorod du XVe siècle simple et élégant : un édifice
                blanc de plan carré, découpé de fenêtres étroites, surmonté d’un toit vert symbolisant la terre et
                coiffé d’une coupole bleue suggérant le ciel portant une croix orthodoxe dorée à huit branches. La
                première pierre fut posée en avril 1938 et la consécration de l’église, dédiée à la Dormition de la Mère
                de Dieu, eut lieu en octobre 1939. C’est dans la crypte de cette église que reposent aujourd’hui les
                primats de l’archevêché des églises orthodoxes de tradition russe en Europe occidentale.
            </p>
            <Carousel imgList={imgArrayToday} legende="" id="dormition-today" />
        </div>
    );
}
