import React from 'react';
import Carousel from '../carousel';

import Image from 'next/image';

export default function Dormition() {
     const imgArrayPose = [
        {url: '/static/img/paroisses/dormition/Pose/photo1.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Pose/photo2.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Pose/photo3.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Pose/photo4.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Pose/photo5.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Pose/photo6.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Pose/photo7.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Pose/vue-aerienne.jpg', legende: 'L\'église se trouvait à l\'époque au milieu des champs'},
        {url: '/static/img/paroisses/dormition/Pose/lettre-A-benoit.jpg', legende: 'Lettre de recommandation de Alexandre Benoit à Jules Despeyroux datant de 1946'},
    ];

    const imgArrayToday = [
        {url: '/static/img/paroisses/dormition/Today/portail.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/face.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/arriere.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/clocher1.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/clocher2.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo1.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo3.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/portes-sanctuaire.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo5.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/icone-christ.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/icone-vierge-marie.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/archange-gabriel.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/archange-michel.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo2.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo4.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo6.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo10.jpg', legende: 'Pâques 2021'},
        {url: '/static/img/paroisses/dormition/Today/photo11.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo12.jpg', legende: ''},
        {url: '/static/img/paroisses/dormition/Today/photo13.jpg', legende: 'bénédiction des koulitchs, Pâques 2021'},
    ];
    return (
        <div className="px-10 bio-block">
            <h2>L'église Notre Dame de la Dormition à Sainte Geneviève des Bois</h2>

            <h3>La nécropole russe </h3>

            <p>
                La nécropole russe comprend d'une part l'église orthodoxe de la Dormition de la sainte mère de Dieu et
                vierge Marie, ses dépendances et son jardin, et d'autre part les tombes russes orthodoxes du cimetière
                communal de Sainte Geneviève des Bois. La nécropole russe constitue un patrimoine
                mondialement connu.
            </p>
            <p>
            Le métropolite Euloge, à la tête de l’archevêché des paroisses orthodoxes russes en Europe occidentale,
            prit la décision de faire construire un lieu de culte orthodoxe à proximité immédiate du cimetière.
            L’administration diocésaine fit l’acquisition d’un terrain jouxtant le cimetière pour y faire
            bâtir une église orthodoxe. La construction de l’église fut confiée à l’architecte russe Albert
            Alexandrovitch Benois qui fit appel à l'entrepreneur Jules Despeyroux. Albert
            Benois et de son épouse Margarita Alexandrovna ont également réalisés les fresques
            murales à l'intérieur de l'église et de la crypte.
            </p>
            <div className="flex flex-wrap">
                <div className="w-1/2 px-1">
                    <Image
                        src="/static/img/architecte.jpg"
                        alt="architecte"
                        width={860}
                        height={1400}
                        layout="intrinsic"
                    />
                </div>
                <div className="w-1/2 px-1">
                    <Image
                        src="/static/img/entrepreneur.jpg"
                        alt="entrepreneur"
                        width={860}
                        height={1400}
                        layout="intrinsic"
                    />
                </div>
            </div>
             <Carousel imgList={imgArrayPose} legende="" id="dormition-pose" />
            <p>
                Pour la nouvelle église, Bénois adopta le style de Novgorod du XVe siècle simple et élégant : un édifice
                blanc de plan carré, découpé de fenêtres étroites, surmonté d’un toit vert symbolisant la terre et
                coiffé d’une coupole bleue suggérant le ciel portant une croix orthodoxe dorée à huit branches. 
                Le clocher lui de style Pskovien. La
                première pierre fut posée en avril 1938 et la consécration de l’église, dédiée à la Dormition de la Mère
                de Dieu, eut lieu en octobre 1939. C’est dans la crypte de cette église que reposent aujourd’hui les
                primats de l’archevêché des églises orthodoxes de tradition russe en Europe occidentale ainsi qu'Albert
                Benois et son épouse Margarita.
            </p>
            <Carousel imgList={imgArrayToday} legende="La paroisse aujourd'hui" id="dormition-today" />
        </div>
    );
}
