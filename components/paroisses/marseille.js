import React from 'react';
import Carousel from '../carousel';

import Image from 'next/image';

export default function Marseille() {
 
    const imgArray = [
        {url: '/static/img/paroisses/marseille/Iconostase-Pâques-2018.jpg', legende: 'Iconostase à Pâques 2018'},
        {url: '/static/img/paroisses/marseille/pantocrator.jpg', legende: 'Pantocrator'},
        {url: '/static/img/paroisses/marseille/2018-Pâques.jpg', legende: 'Pâques 2018'},
        {url: '/static/img/paroisses/marseille/2020-Mgr-Jean-de-Doubna.jpg', legende: 'Visite de Monseigneur Jean de Doubna en 2020'},
        {url: '/static/img/paroisses/marseille/clergé-de-la-paroisse.jpg', legende: 'Clergé de la paroisse en 2021 - Père Jean Gueit et Diacre Stéphane Sevila'},
        {url: '/static/img/paroisses/marseille/1985-Bapteme-Marie-Mejekovskaya.jpg', legende: 'Baptême d\'adulte en 1985'},
        {url: '/static/img/paroisses/marseille/cathéchèse.jpg', legende: 'Cathéchèse des enfants'},
    ];
    return (
        <div className="px-10 bio-block">
            <h2>La paroisse Saint Hermogène à Marseille</h2>
            <h3>Le contexte historique</h3>
            <p>Contrairement à Nice, Cannes ou Menton, qui étaient au XIXe siècle des lieux de villégiature très prisés par la haute société russe et anglaise, Marseille était un port où les touristes étrangers ne séjournaient qu’en transit pour d’autre destinations. Aussi n’était -t-elle dotée au début du XXe siècle d’aucun édifice religieux russe, alors que les négociants grecs, implantés dans la ville au début du XIXe, avaient fondé en 1834 l’église orthodoxe grecque de la Dormition, première église orthodoxe en France.</p>
            <p>Les Russes qui arrivèrent à Marseille, font partie des populations qui, durant la guerre civile, s’étaient regroupées en Crimée, dernier bastion tenu par l’Armée Blanche sous le commandement du général Wrangel. En novembre 1920, alors que s’accentue la menace de l’Armée Rouge, le général Wrangel prend la décision d’évacuer la Crimée. </p>
            <p>Quelques centaines de ces émigrés venus de Crimée arrivent à Marseille en avril 1921 sur le navire “Rion”. Dans le port se trouvaient déjà d’autres bâtiments de la flotte de commerce russe, qui attendaient que les autorités décident de leur sort. Sur l’un de ces navires (“l’Empereur Nicolas I) était installée une chapelle dans laquelle le père Pierre Brilev, frère du capitaine, célébrait les offices. </p>
            <p>Les réfugiés russes civils sont accueillis dans le camp Victor Hugo, installé par la Croix Rouge française sur un terrain vague près de la gare St Charles.</p>
            <p> En 1923, le camp hébergeait près de 600 personnes. </p>
            <p>Le métropolite Euloge permit la création d’un lieu de culte dans le camp et nomma pour le desservir le père Avenir Diakov. Dans ses mémoires, le métropolite Euloge raconte : ”Une église très modeste fut installée dans un des baraquements ; le vent sifflait dans les fentes des murs. On voyait parfois entrer des chiens. Une nuit, le mistral souffla si fort que le baraquement dans lequel vivait le prêtre s’effondra comme un château de cartes. Le père Avenir se réveilla ; au-dessus de sa tête il ne voyait que le ciel et la pluie qui tombait.” [“Le chemin de ma vie” p.413]</p>
            <p>Quand la Ville de Marseille décida de supprimer le camp, les Russes s’installèrent en ville et la communauté loua un local pour l’église et pour le prêtre. </p>
            <h3>La création de la paroisse  </h3>
            <p>C’est alors que fut créée la paroisse Saint Hermogène. La communauté choisit pour protecteur ce patriarche qui, dans la période très agitée du “Temps des troubles” (début XXVIIe siècle) défendit avec courage la foi orthodoxe face à toutes les agressions politiques et militaires que subissait la Russie. Il fut canonisé en 1913, juste avant que n’éclate le cataclysme de la grande guerre et de la révolution. Peut-être les émigrés marseillais avaient ils le sentiment de vivre un moment historique comparable aux années agitées du règne de Boris Godounov. Aussi mirent-ils leur paroisse sous la protection d’un saint qui avait traversé sans faillir toutes les épreuves humaines, soutenu par la force de sa foi.</p>
            <p>La paroisse s’installa dans un petit bâtiment, situé en bordure du parc Borely, qui appartient à la Ville. C’est un ancien octroi, que les premiers paroissiens ont eux-mêmes aménagé en église, édifiant un petit bulbe surmonté d’une croix, une coupole intérieure, une iconostase pour séparer la nef du sanctuaire...Un petit local attenant fut construit pour l’hébergement du prêtre. Avec de faibles moyens mais beaucoup de dévouement, les paroissiens ont œuvré pour entretenir cette petite église.</p>
            <p>En 1934, lorsque fut assassiné à Marseille le roi Alexandre I de Yougoslavie (tué en même temps que Louis Barthou, ministre français des affaires étrangères dans un attentat sur la Canebière), les autorités yougoslaves firent édifier dans l’église un monument à la mémoire d’Alexandre I, grande icône représentant Saint Alexandre Nevsky et Saint André, patrons du roi et de la maison de Serbie.</p>
            <p>Pendant la deuxième guerre mondiale, le bâtiment fut réquisitionné par l’armée allemande. Rendue au culte après la guerre, l’église fut entretenue de façon ininterrompue par les fidèles. Lorsque, à la mort du père Leonid Lioubimov, en 1963, il n’y eut plus de prêtre à demeure, l’église fut desservie par le clergé de la cathédrale de Nice.</p>
            <h3>La situation actuelle</h3>
            <p>Ordonné en 1982, le père Jean Gueit fut nommé recteur de la paroisse par l’archevêque Georges (Wagner). La communauté se composait alors d’une quinzaine de “survivants” de la génération des fondateurs. Se plaçant dans la continuité de cet héritage, par respect des anciens et de la tradition russe, tout en s’ouvrant aux réalités contemporaines et locales, le père Jean proposa de célébrer tous les dimanches, en alternant les langues russe et française.</p>
            <p>Les célébrations régulières permirent à la communauté de s’agrandir et de se diversifier, intégrant des occidentaux que leur cheminement personnel a conduits à l’orthodoxie, aussi bien que des nouveaux immigrés, arrivés de différents pays d’Europe centrale et orientale (Russie, Ukraine, Géorgie, Biélorussie, Moldavie...)</p>
            <p>Désormais, la liturgie est célébrée chaque dimanche dans les deux langues, français et russe pour permettre la participation du plus grand nombre. Les Vigiles sont célébrées principalement la veille des grandes fêtes. La catéchèse des enfants est assurée par « matouchka » Anne Marie, assistée de mamans, celle des adultes par le père Jean également dans les deux langues alternativement.</p>
            <p>Soulignons que l’église Saint Hermogene a bénéficié de la contribution inestimable de deux iconographes, (Elisabeth Heriard et Anne Levert), qui ont réalisé des fresques et plusieurs icônes majeures ainsi deux grandes croix. </p>
            <Carousel imgList={imgArray} legende="" id="marseille" />
        </div>
    );
}
