import React from 'react';
import Carousel from '../carousel';

import Image from 'next/image';

export default function SaintPrix() {
 
    const imgArray = [
        {url: '/static/img/paroisses/saintprix/Paroisse-St-Prix-1.jpg', legende: ''},
        {url: '/static/img/paroisses/saintprix/Paroisse-St-Prix-2.jpg', legende: ''},
        {url: '/static/img/paroisses/saintprix/Paroisse-St-Prix-3.jpg', legende: ``},
   ];
    return (
        <div className="px-10 bio-block">
            <h2>Paroisse de la Rencontre du Christ à Saint-Prix (Val d’Oise)</h2>
            <p>En 1975, à Eaubonne (95), le père André Fortounatto est autorisé par sa mère à transformer en chapelle un garage qui se trouvait dans son jardin. Il va régulièrement y célébrer des offices.</p>
            <p>Le succès de ce nouveau lieu de culte est tel que cette chapelle devient peu à peu trop exiguë. Il faut trouver un édifice capable d’absorber au mieux la demande. Et c’est à Cernay (95) qu’une petite église est mise à notre disposition par l’Évêché de Pontoise.</p>
            <p>Pendant que la chapelle d’Eaubonne restait fonctionnelle pour de simples offices, les fidèles furent accueillis à Cernay à l’occasion des grandes fêtes jusqu’à ce qu’elle soit désaffectée en 1983. A cette date et devant cet impératif une seule alternative se présenta au père André : la nécessité d’agrandir le local d’Eaubonne et tous les travaux nécessaires dans ce sens furent conduits par les paroissiens pendant 3 ans, sans que les offices aient cessé.</p>
            <p>La bénédiction par Mgr Georges Wagner de la chapelle agrandie eut lieu le 2 février 1986. A un noyau de fidèles d’une trentaine de personnes se joignirent par la suite des orthodoxes de passage plus ou moins régulièrement.</p>
            <p>Après le décès, en 1995, de la propriétaire, sœur Eugénie depuis 1980, à la fois mère du père André et gardienne des lieux, la vente du bien dut être réalisée. La recherche d’un nouveau local s’imposa. Petit à petit un espoir naquit grâce à un couple de Saint-Prix (95) qui, dès 1983 avaient </p>
            <p>proposé au père André que le colombier de leur propriété soit transformé en chapelle. Ce projet, abandonné alors devant l’importance des travaux, demeura finalement la meilleure et seule solution. </p>
            <p>Avec la grâce de Dieu et l’aide une fois de plus des paroissiens, non seulement la transformation se réalisa, mais la propriétaire, à la fin de sa vie, fit don à la paroisse du bâtiment aménagé et le 10 septembre 1995, dans cette chapelle de St. Prix eut lieu la première liturgie.</p>
            <p>La succession du père André Fortounatto se posa lorsqu’en 2002, à la retraite, il se retira dans les environs de Vichy, où il allait prendre en main l’église orthodoxe locale. Un paroissien de l’église de Boulogne, André Krementzoff, ordonné diacre en 1995, venu maintes fois officier à St. Prix aux côtés du  père André, lui succéda après que son ordination sacerdotale accordée par l’Archevêque fut célébrée le 2 juin2002.</p>
            <p>Trois années durant il fut aidé et secondé par son prédécesseur dans le service et la gestion de la paroisse, dans la poursuite de l’élan initial fondé sur la connaissance des paroissiens et l’atmosphère paisible et amicale générée par l’histoire et le cadre de cette église de St. Prix. </p>
            <p>Indissociable des offices, le chœur dirigé auparavant par Matouchka Hélène Fortounatto, est maintenant entre les mains expérimentées d’Anne Kawiecki, et secondée par Matouchka Patricia Krementzoff, le chantre de l’église.</p>
            <p>Fidèle à l’Archevêché des Églises Orthodoxes d’origine russe en Europe Occidentale, la paroisse a décidé d’adopter le calendrier julien. Les offices sont réguliers, une semaine sur deux, et toutes les fêtes sont célébrées. La langue principale est le français, mais quelques prières sont dites ou chantées en slavon. Compte tenu de la diversité des paroissiens, le Notre Père, au cours de la liturgie, se récite en 5 langues : français, slavon, serbe, polonais et roumain.</p>
            <p>Si la présence aux vêpres n’est pas importante, cela s’explique par la contrainte des distances souvent importantes. L’office du dimanche, lui, rassemble une cinquantaine de personnes.</p>
            <p>Le service à l’autel est assuré par des enfants encadrés, formés par des séances de catéchisme auxquelles Olga, la fille du père André F. a consacré du temps depuis le début. </p>
            <p>La vie sociale passe à Saint-Prix par les membres de la paroisse et leurs enfants, qui sont nombreux et nouent des liens à l’exemple d’une famille, sous la protection spirituelle et morale du Père André et de sa Matouchka Patricia.</p>
            <p>La paroisse est déclarée comme association cultuelle. Le bureau du conseil est composé du père André, du secrétaire Paul Fedèle, de la secrétaire adjointe Olga Fortounatto et du trésorier Damien Behr.</p>
            <p>Il est important de souligner que dès l’origine de l’association cultuelle, le père André Fortounatto, puis le père André Krementzoff ont, par respect, tenu à se manifester auprès des évêques successifs de Pontoise. Des relations amicales nouées depuis n’ont seulement pas cessé, mais elles se sont par la suite développées avec la paroisse catholique de Saint-Prix dont la fête est célébrée chaque année conjointement, avec adoration des reliques et procession.</p>

            <Carousel imgList={imgArray} legende="" id="crypte" />
        </div>
    );
}
