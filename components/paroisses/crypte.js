import React from 'react';
import Carousel from '../carousel';

import Image from 'next/image';

export default function Crypte() {
 
    const imgArray = [
        {url: '/static/img/paroisses/crypte/caféCrypteAnnees60.jpg', legende: 'Café dans les crypte (années 60)'},
        {url: '/static/img/paroisses/crypte/détente-Bénédiction-maison.jpg', legende: 'Procession pour la consécration de la cathédrale (11/09/1861)'},
        {url: '/static/img/paroisses/crypte/exposition-icônes-2004.jpg', legende: `Exposition d'icones en 2004)`},
        {url: '/static/img/paroisses/crypte/orarion-double-diacre-Joseph2005.jpg', legende: `Mgr Gabriel remet le double orarion au Père diacre Joseph en 2005`},
        {url: '/static/img/paroisses/crypte/baptême_2005.jpg', legende: `Père Boris fait entrer Matthias dans l’église (2005)`},
        {url: '/static/img/paroisses/crypte/Crypte-24.06.07.jpg', legende: `Le clergé de la crypte en Juin 2007)`},
        {url: '/static/img/paroisses/crypte/Buffet-du-monde-juillet-2010.jpg', legende: `Buffet Juillet 2010)`},
        {url: '/static/img/paroisses/crypte/vendredi-saint-2018.jpg', legende: `Procession du vendredi saint 2018)`},
        {url: '/static/img/paroisses/crypte/Ouganda_enfants-de-la-crypte.jpg', legende: `Remerciements des enfants d'un camp de vacances orthodoxe en Ouganda`},
        {url: '/static/img/paroisses/crypte/procession.jpg', legende: `Procession lors de la fête de Saint Alexandre Nevski (12 septembre 2020) `},
        {url: '/static/img/paroisses/crypte/enfants-encouragés.jpg', legende: `Mgr Élisée et Père François donnent des conseils aux jeunes paroissiens (2021)`},        
   ];
    return (
        <div className="px-10 bio-block">
            <h2>Paroisse de la Sainte Trinité (crypte de la cathédrale)</h2>
            <img className="flex sm:items-center float-left w-1/3 mr-2 mt-2"
                src="/static/img/paroisses/crypte/Père-Pierre-Struve.jpg" alt="Père Pierre Struve" />
            <p>On date le début de la communauté française de la Crypte de l’année 1964, lorsque l’archevêque, Mgr Georges (Tarassov), ordonna le Père Pierre Struve (1924-1968) pour être le premier prêtre de ce lieu et que, à partir de ce moment, la célébration des offices devint régulière. Pierre Struve, né en 1924 dans une famille d’émigrés russes, s’était très tôt impliqué dans la vie de l’Église, surtout par le biais du mouvement de jeunesse ACER (Action Chrétienne des Étudiants Russes). Il comptait dans ce mouvement beaucoup d’amis qui partageaient le même souhait d’avoir un lieu où l’on pourrait célébrer en français. Néanmoins, la communauté française de la Crypte a une préhistoire. Il est certain qu’après la Seconde Guerre mondiale, dès le milieu des années cinquante, il y avait de temps en temps à la Crypte des offices en français. Celui qui a joué un rôle clé dans cette mutation fut le théologien Paul Evdokimov, très partisan d’une orthodoxie française. Cela lui paraissait une nécessité pour tous les orthodoxes d’origine occidentale et tous ceux d’origine russe qui, de plus en plus nombreux, avaient perdu l’usage de leur langue. Mgr Georges qui succéda au métropolite Vladimir en 1960 favorisa la tenue d’offices en français à la Crypte en permettant à certains prêtres itinérants de célébrer plus ou moins régulièrement et il vit en Pierre Struve la personne d’envergure qui convenait pour fonder une paroisse française. Après son ordination, il le nomma premier prêtre pour desservir l’autel de la Crypte dédié à la Sainte Trinité. La première célébration eut lieu en 1964, peu avant le Carême.</p>
<p>En même temps qu’il ordonnait le P. Pierre Struve, l’archevêque Georges désigna Michel Evdokimov, le fils de Paul comme chef de chœur pour la chorale de la Crypte. La communauté de la Crypte grandit rapidement en nombre. Au noyau initial s’ajoutèrent des gens de différents horizons attirés par le renom de la Crypte et l’aura du P. Pierre que les émissions de télévision avaient rendu célèbre. Pour intégrer tous ces nouveaux venus, le P. Pierre et sa femme instituèrent ce qu’on appelle « le café », c’est-à-dire la possibilité, après la liturgie, de se réunir dans une salle mise à la disposition de la communauté par l’archevêque pour y prendre une boisson chaude et discuter. Cette coutume dure toujours. Parmi le petit nombre des fidèles des premières liturgies en Français de la Crypte, on comptait les futurs diacres puis protodiacres Georges Krjivoblotsky (+ 2007), Joseph Quemeraye et leurs familles : deux beaux exemples de service fidèle à la communauté. Père diacre Joseph sert toujours la Crypte avec beaucoup de dévouement. Il nous faut citer aussi Hélène Aristoff, médecin de formation qui, par la suite, fut chantre de la Crypte jusqu’à son décès en juillet 2010.  Au moment où la communauté prenait tout son essor, le 3 décembre 1968 survint la mort accidentelle du P. Pierre. L’émotion fut immense, dépassant de beaucoup le cadre de la communauté. L’archevêque, Mgr Georges, s’inquiéta de ne pas laisser orpheline cette communauté si pleine de promesses. Il fit appel à un jeune prêtre de l’Institut St Serge, le P. Boris Bobrinskoy (1925-2020). À son arrivée, le P. Boris trouva une communauté ébranlée dont la composition se modifia quelque peu. Mais P. Boris releva le défi et continua l’œuvre commencée par le P. Pierre et on peut dire avec le recul du temps, qu’il l’a accomplie. Recteur de la Crypte pendant plus de quarante ans, de 1968 à 2009, le Père Boris a été un acteur majeur dans l’essor de la communauté. Sa réputation de théologien et de pasteur a attiré un grand nombre de personnes à la Crypte et à l’Orthodoxie. D’emblée il apporta à la communauté ses qualités de liturge. Il l’a enseignée à de multiples occasions, principalement au cours de ses catéchèses pour adultes et grâce aussi à diverses publications. Malgré toutes ses autres charges comme théologien et enseignant, il a été pour elle un père aimant et attentif. Dans son ministère, Père Boris fut très bien secondé par le Père René Dorenlot, médecin ordonné diacre pour la Crypte par Mgr Georges en mai 1973 puis prêtre en avril 1978, toujours disponible et proche pour les Fidèles. Père René desservit aussi un temps comme recteur la paroisse de l’église St Serge de Radonège, à Colombelles, près de Caen. </p>
<p>Le nombre de fidèles augmentant, et surtout pour maintenir le lien entre tous ceux qui, pour des raisons diverses, ne pouvaient être présents tout en restant attachés à la Communauté, on décida de créer un bulletin.  Le n°1 parut en septembre 1971. D’abord mensuel, le Bulletin de la Crypte n’a depuis cessé de paraître et il est maintenant trimestriel. Le 15 février 1973, par décision Archiépiscopale, la Communauté Orthodoxe Française de la Sainte Trinité fut érigée au rang de paroisse.</p>
<p>En 1999, le Père Alexis Struve, fils du Père Pierre, a été ordonné pour la Crypte par l’archevêque Serge et il en a été nommé recteur à la retraite de Père Boris en 2009 jusqu’à sa mutation professionnelle en Ukraine, à l’été 2014. Le Père Élisée (Germain), d'ʹorigine russe par sa mère, tonsuré moine en 1998 au monastère Saint-Silouane, après des études de théologie à l'ʹInstitut Saint-Serge, a tout de suite servi à la Crypte après son ordination par Mgr Gabriel en 2005 et depuis le 1er août 2014, il en est le recteur. En décembre 2014, le cinquantenaire de la communauté a fait l’objet d’un numéro spécial du Bulletin (le n°428) avec de nombreux témoignages. L’ordination du recteur de la paroisse, Père Élisée comme évêque vicaire pour la cité gardée-de-Dieu de Reoutov, a eu lieu le dimanche 28 juin 2020 en la cathédrale Saint-Alexandre-Nevsky pour la plus grande joie des Fidèles. </p>
<p>En plus de 50 ans d’existence, la paroisse française de la Sainte Trinité s’est évidemment modifiée dans sa composition. Parmi les paroisses orthodoxes francophones de Paris, la Crypte est une des plus importantes en nombre de fidèles. Sa situation dans Paris et son lien avec la cathédrale en font un lieu de rencontre et de passage privilégié. La communauté a évolué depuis l’origine. Elle s’est francisée et compte une proportion de plus en plus grande de convertis. La participation des personnes d’origine russe qui, au début, ont beaucoup contribué au développement de cette communauté, a tendance à s’amenuiser, alors que d’autre part la présence d’orthodoxes venus de pays très divers, Europe de l’Est bien sûr mais aussi Proche Orient et Afrique noire entre autres, s’affirme de plus en plus. De ce fait, la Crypte garde un caractère pluri-éthnique très marqué.</p>
<p>En conclusion on peut dire qu’à travers un lieu, la crypte de la cathédrale russe de Paris, c’est aussi un aperçu sur l’enracinement de la foi orthodoxe dans un pays à dominante catholique avec aussi une présence protestante. Cet enracinement s’est fait dans le respect de ces diverses confessions et parfois en lien avec elles. Pour tout cela, l’histoire de la Crypte constitue une petite page de l’histoire de l’Église mais aussi une belle page de l’histoire de l’Archevêché.</p>

            <Carousel imgList={imgArray} legende="" id="crypte" />
        </div>
    );
}