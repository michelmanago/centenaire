import React from 'react';
import Carousel from '../carousel';

import Image from 'next/image';

export default function Montpellier() {
 
    const imgArray = [
        {url: '/static/img/paroisses/montpellier/XIVeme_siecle.jpg', legende: 'L\'église au XIVème siècle'},
        {url: '/static/img/paroisses/montpellier/exterieur-eglise-sainte-croix.jpg', legende: 'Entrée de l\'église'},
        {url: '/static/img/paroisses/montpellier/interieur-eglise-sainte-croix.jpg', legende: 'Intérieur de l\'église Sainte-Croix'},
        {url: '/static/img/paroisses/montpellier/liturgie-en-2021.jpg', legende: 'Liturgie en 2021'},
        {url: '/static/img/paroisses/montpellier/liturgie-eveque.jpg', legende: 'Visite de l\'évêque Siméon de Domotevo'},
        {url: '/static/img/paroisses/montpellier/choeur2.jpg', legende: 'Le choeur'},
        {url: '/static/img/paroisses/montpellier/choeur.jpg', legende: 'Les choristes'},
    ];
    return (
        <div className="px-10 bio-block">
            <h2>Historique de la paroisse Sainte Hélène et la Sainte Croix de Montpellier</h2>
            <p>Au cours de l'année 2000, venant d'horizons divers (région du Languedoc, Paris…), un petit groupe d'orthodoxes, d'origines française et russe, s'est progressivement constitué à Montpellier. Des prières de vêpres et de matines étaient alors récitées, en français, aux domiciles des uns ou des autres, avec le diacre Joseph FOUILLEUL (rattaché alors au Patriarcat de Moscou). </p>
            <p>Pour les offices liturgiques, chacun fréquentait individuellement les paroisses d'Avignon ou de Grammont (Archevêché grec en France).</p>
            <p>Puis, en octobre 2006, ce groupe a souhaité se placer sous l'omophore de Mgr GABRIEL (archevêque des  paroisses orthodoxes de tradition russe, rattaché alors au Patriarcat Œcuménique). Il s'est alors constitué en communauté paroissiale sous le patronage de “Sainte Hélène et de la Sainte Croix”. </p>
            <p>En décembre 2008, Mgr GABRIEL a ordonné prêtre, pour desservir cette paroisse, le Père René (diacre Joseph) FOUILLEUL, qui en est nommé le recteur en juin 2012.</p>
            <p>Dans un premier temps, les offices liturgiques étaient célébrés au rez-de-chaussée de l'appartement (cf. Photo) d'une paroissienne (Martine BRISSON-VOISIN) dans un quartier proche du centre de Montpellier. Puis, dans le courant du mois de mars 2012, la grâce de Dieu, la persévérance d'un paroissien, et la bienveillance de l'archevêché catholique ont permis de célébrer les offices liturgiques à l'église Sainte Croix, une église dont les fondations sont du XIIème siècle, située dans le quartier de Celleneuve, à l'ouest de Montpellier. </p>
            <p>La fréquence des célébrations a été de deux fois par mois dans un premier temps, pour arriver à une fréquence de trois fois par mois. Puis, depuis quelques années, du dimanche du Pharisien et du Publicain jusqu’au dimanche de la Pentecôte, les offices sont célébrés tous les dimanches.</p>
            <p>Les offices liturgiques suivent le nouveau calendrier et sont chantés en français. Le chœur est dirigé par Nina Schidlovsky-Martin du Bosc, une des fondatrices de la paroisse.</p>
            <p>La paroisse s’étoffe progressivement et, depuis mars 2020, le père diacre Stéphane Sévila, ordonné le 16 février 2020 par Mgr Jean de Doubna, vient y concélébrer la liturgie, en alternance avec la paroisse Saint  Hermogène de Marseille (dont le recteur est le Protopresbytre Jean Gueit)</p>
            <p>L’histoire dit que l’église Sainte Croix commence en 789, lorsque Charlemagne bat les Maures, en ce lieu, le jour de la fête de la Sainte Croix, un 14 septembre. En 799, Charlemagne en donne le terrain à son ami Benoît d'Aniane pour y construire un prieuré "Cella Nova" (les cellules neuves), qui deviendra le village de  Celleneuve (Montpellier ne naîtra qu'en 989). Les moines occupaient déjà cet emplacement depuis fort longtemps car, cette situation, en plein coeur du territoire des évêques de Maguelone, permettait de contrôler le trafic sur les chemins qui traversaient la Mosson (notamment la Via Domitia) au niveau de Juvignac, et de percevoir des taxes.</p>
            <p>L’église fut profondément modifiée au 14éme siècle. Elle fut alors fortifiée et rehaussée, ce qui lui donne un air de forteresse, afin de contribuer à la défense du village alors menacé par les hordes de routiers qui dévastaient la région. C'est pourquoi la nef et l'abside ont été surélevées, avec la mise en place de mâchicoulis (ouvertures vers le bas) d’où l'on pouvait jeter de l'huile bouillante ou de lourdes pierres sur les attaquants. Actuellement c'est un simple toit à deux pans inversés qui a été placé sur le chemin de ronde, dont le seul vestige encore visible est un arc de pierre sous le rocher. Jusqu'à la fin du siècle dernier l'église abritait le gisant du roi Jacques d’Aragon.</p>
            <p>Aujourd’hui, il est difficile de se faire une idée de l'aspect complet de l'église tant elle est enchâssée dans les maisons, sinon, on verrait qu'elle ressemble à un bateau et à l’église des Saintes-Maries-de-la-Mer. L’intérieur de l’église a gardé son aspect roman initial.</p>
            <p>L’église de Sainte Croix est la seule église romane de Montpellier encore ouverte au culte.</p>
            <Carousel imgList={imgArray} legende="" id="montpellier" />
        </div>
    );
}
