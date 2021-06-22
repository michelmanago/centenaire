import React from 'react';
import Carousel from '../carousel';

import Image from 'next/image';

export default function SaintBrieuc() {
 
    const imgArray = [
        {url: '/static/img/paroisses/saintbrieuc/Chapelle-et-communs-en-2014.jpg', legende: 'Chapelle et communs en 2014'},
        {url: '/static/img/paroisses/saintbrieuc/Intérieur-chapelle-de-la-Dormition.jpg', legende: 'Intérieur de la chapelle de la Dormition'},
        {url: '/static/img/paroisses/saintbrieuc/Chapelle-du-Saint-Esprit-à-Plérin.jpg', legende: 'Chapelle du St Esprit à Plérin'},
        {url: '/static/img/paroisses/saintbrieuc/Liturgie-épiscopale-à-Plérin.jpg', legende: 'Liturgie épiscopale à Plérin'},
        {url: '/static/img/paroisses/saintbrieuc/Office-vespéral-en-décembre-2015-1.jpg', legende: 'Vêpres en 2015 à Plérin'},
        {url: '/static/img/paroisses/saintbrieuc/Office-vespéral-2015-2.jpg', legende: 'Vêpres en 2015 à Plérin'},
        {url: '/static/img/paroisses/saintbrieuc/Palmes-2018.jpg', legende: 'Office des rameaux en 2018'},
        {url: '/static/img/paroisses/saintbrieuc/Le-Grand-Samedi-en-2012.jpg', legende: 'Samedi Saint 2012'},
        {url: '/static/img/paroisses/saintbrieuc/Pâques-2015.jpg', legende: 'Office de Pâques 2015'},
        {url: '/static/img/paroisses/saintbrieuc/Pâques-en-2017.jpg', legende: 'Office de Pâques 2017'},
        {url: '/static/img/paroisses/saintbrieuc/I-Pâques-en-2018.jpg', legende: 'Office de Pâques 2018'},
        {url: '/static/img/paroisses/saintbrieuc/Théophanie-2016.jpg', legende: 'Office de la Thépphanie 2016'},
        {url: '/static/img/paroisses/saintbrieuc/Visite-pastorale-Mgr-Syméon-en-2014.jpg', legende: 'Visite Pastorale de Mgr Syméon en 2014'},
        {url: '/static/img/paroisses/saintbrieuc/Vêpres-à-Plumaudan.jpg', legende: 'Vêpres à Plumaudan'},
        {url: '/static/img/paroisses/saintbrieuc/agapes-festives.jpg', legende: 'Agapes festives'},
   ];
    return (
        <div className="px-10 bio-block">
            <h2>La communauté paroissiale Saint Brieuc</h2>
            <img className="flex sm:items-center float-left w-1/3 mr-2 mt-2"
                src="/static/img/paroisses/saintbrieuc/Icône-Saint-Brieuc.jpg" 
                alt="Icône de Saint Brieuc" />
            <p>La Communauté Saint Brieuc réunit les fidèles orthodoxes de la ville bretonne du même nom et de sa belle région côtière en Côtes-d’Armor. C’est à la demande de l’Archevêque Gabriel de bienheureuse mémoire, que le Père Jean-Michel Sonnier, à l’époque diacre de la Communauté Sainte Anne de Lannion, a commencé à en poser les bases fin 2008, rapidement épaulé par une petite équipe motivée. </p>
            <p>La création d’une Association Cultuelle s’en est suivie, puis la recherche d’un lieu adapté à ses célébrations. La chapelle historique d’un village proche de St-Brieuc ayant été repérée par une fidèle de la première heure, Marie-Edith Combrade, puis reconnue propice à plusieurs égards, une convention était bientôt signée entre le diocèse catholique favorable à ce projet et la jeune communauté orthodoxe. Ainsi lui fut-il délégué l’usage liturgique de cette chapelle providentiellement dédiée au Saint Esprit, au lieu-dit  Le Sépulcre, à Plérin/mer. </p>
            <p>Après une période consacrée aux travaux d’aménagements prioritaires, une première Liturgie y rassemblait déjà une soixantaine d’adultes accompagnés d’une quinzaine d’enfants. Communauté pourvue dès l’origine d’une riche diversité, où le Notre Père se déclinait en français, russe, géorgien et roumain.  Avec toutefois une prépondérance géorgienne qui contribua à l’adoption de l’ancien style pour le calendrier liturgique, bien que les célébrations y soient essentiellement francophones. Au fil de célébrations prolongées d’agapes conviviales, elle s’est fortifiée, fidélisée et étoffée de paroissiens faisant jusqu’à une heure et demie de route pour la rejoindre. Mgr Syméon, alors notre doyen, accompagnera cette croissance par des visites régulières plusieurs années durant.</p>
            <p>En 2011, un prêtre bien connu des Orthodoxes du grand Ouest qu’il fut l’un de premiers à desservir de longues années durant, le Père Pierre Tchesnakoff, fit avec ses deux fils don à l’Archevêché d’une chapelle aménagée 36 ans plus tôt près de Dinan, sur la commune de Plumaudan - au départ pour y réunir chaque été de nombreux Russes en villégiature sur la côte proche, puis les membres disséminés de la Fraternité de l’Ouest. Elle devint ainsi le 1er lieu de culte spécifiquement orthodoxe en Bretagne, dédié à la Dormition de la Mère de Dieu, fête estivale devenue le rendez-vous annuel de beaucoup d’entre eux. </p>
            <p>Ce fut alors notre paroisse presque voisine de St-Brieuc qui se vit confier la responsabilité de ce lieu emblématique, où se réunirent rapidement trente à quarante fidèles tout au long de l’année, les offices alternant désormais entre les deux églises. Le bâtiment adjacent à la chapelle fut alors aménagé avec l’aide de plusieurs d’entre eux, pour répondre au besoin d’un lieu de vie paroissiale où se tiennent depuis avec bonheur au fil des dimanches et des fêtes, agapes, réunions et catéchèses. </p>
            <p>Dans le même temps était achevée à Plérin une belle iconostase, ainsi que d’autres éléments du programme iconographique de l’église, avec le précieux concours de matouchka Anne. Notre Archevêque le Métropolite Jean y vint en visite début 2017, et put constater la vitalité de cette communauté encore jeune, mais désormais bien ancrée dans le paysage orthodoxe de la Bretagne nord, et qui manifesta depuis envers lui et l’Archevêché sa loyauté et sa fidélité.</p>
            <p> Elle s’était placée d’emblée sous la protection de l’un des 7 saints fondateurs des évêchés de Bretagne, du temps de l’Eglise indivise, et se veut à la fois ancrée dans la Tradition de nos Pères et ouverte à la mission, par l’accueil attentif et fraternel de tous ceux qui viennent y frapper. </p>
            <Carousel imgList={imgArray} legende="" id="stbrieuc" />
        </div>
    );
}
