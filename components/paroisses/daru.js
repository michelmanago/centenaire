import React from 'react';
import Carousel from '../carousel';

import Image from 'next/image';

export default function Daru() {
 
    const imgArrayHistorique = [
        {url: '/static/img/paroisses/daru/gravures/1859-Plan-daru.jpg', legende: 'Plan de la cathédrale (1859)'},
        {url: '/static/img/paroisses/daru/gravures/1861-09-11-Consecration1.jpg', legende: 'Procession pour la consécration de la cathédrale (11/09/1861)'},
        {url: '/static/img/paroisses/daru/gravures/1861-09-11-Consecration2.jpg', legende: 'consécration de la cathédrale (11/09/1861)'},
        {url: '/static/img/paroisses/daru/gravures/1861-09-21-cathedrale.jpg', legende: 'La nouvelle cathédrale russe de Paris'},
        {url: '/static/img/paroisses/daru/gravures/1894-jour-de-lan.jpg', legende: 'Jour de l an à l église russe'},
        {url: '/static/img/paroisses/daru/gravures/1894-Serment-au-Tsar.jpg', legende: 'serment de fidélité au nouveau Tsar (1894)'},
   ];

   const imgArrayExterieur = [
        {url: '/static/img/paroisses/daru/exterieur/rue-pierre-le-grand.jpg', legende: 'Rue Pierre Le Grand'},
        {url: '/static/img/paroisses/daru/exterieur/coupoles.jpg', legende: 'Coupole de la cathédrale'},
        {url: '/static/img/paroisses/daru/exterieur/mosaique.jpg', legende: 'Mosaïque de la façade'},
        {url: '/static/img/paroisses/daru/exterieur/exterieur-droit.jpg', legende: 'Coté droit'},
        {url: '/static/img/paroisses/daru/exterieur/grille.jpg', legende: 'Grille extérieure'},
        {url: '/static/img/paroisses/daru/exterieur/detail1.jpg', legende: 'Détail extérieur'},
        {url: '/static/img/paroisses/daru/exterieur/detail2.jpg', legende: 'Détail extérieur'},
    ];

    const imgArrayInterieur = [
        {url: '/static/img/paroisses/daru/interieur/face.jpg', legende: 'Intérieur de cathédrale vue de face'},
        {url: '/static/img/paroisses/daru/interieur/iconostase.jpg', legende: 'Iconostase de la cathédrale'},
        {url: '/static/img/paroisses/daru/interieur/lustres.jpg', legende: 'Lustres'},
        {url: '/static/img/paroisses/daru/interieur/iconostase-droite.jpg', legende: 'Iconostase, partie droite'},
        {url: '/static/img/paroisses/daru/interieur/iconostase-gauche.jpg', legende: 'Iconostase, partie gauche'},
        {url: '/static/img/paroisses/daru/interieur/gauche.jpg', legende: 'Intérieur, vue de gauche, choeur de la cathédrale'},
        {url: '/static/img/paroisses/daru/interieur/droite.jpg', legende: 'Intérieur, vue de droite'},
        {url: '/static/img/paroisses/daru/interieur/tombeau-christ.jpg', legende: 'Tombeau du Christ'},
        {url: '/static/img/paroisses/daru/interieur/tombeau-christ-detail.jpg', legende: 'Détail tombeau du Christ'},
        {url: '/static/img/paroisses/daru/interieur/chapelle-droite.jpg', legende: 'Chapelle droite'},

    ];

      const imgArrayFresques = [
        {url: '/static/img/paroisses/daru/fresques/coupole.jpg', legende: 'La coupole de la cathédrale'},      
        {url: '/static/img/paroisses/daru/fresques/christ-coupole2.jpg', legende: 'La coupole de la cathédrale'},      
        {url: '/static/img/paroisses/daru/fresques/christ-coupole.jpg', legende: 'La coupole de la cathédrale'},   
        
        {url: '/static/img/paroisses/daru/fresques/tour-coupole1.jpg', legende: 'Le pourtour de la coupole de la cathédrale'},   
        {url: '/static/img/paroisses/daru/fresques/tour-coupole2.jpg', legende: 'Le pourtour de la coupole de la cathédrale'},   
        {url: '/static/img/paroisses/daru/fresques/tour-coupole3.jpg', legende: 'Le pourtour de la coupole de la cathédrale'},   
 
        {url: '/static/img/paroisses/daru/fresques/coin1.jpg', legende: 'Le pourtour de la coupole de la cathédrale'},   
        {url: '/static/img/paroisses/daru/fresques/coin2.jpg', legende: 'Le pourtour de la coupole de la cathédrale'},   
        {url: '/static/img/paroisses/daru/fresques/coin3.jpg', legende: 'Le pourtour de la coupole de la cathédrale'},   
         

        {url: '/static/img/paroisses/daru/fresques/cene.jpg', legende: 'La cène'},
        {url: '/static/img/paroisses/daru/fresques/sermon-sur-la-montagne.jpg', legende: 'Le sermon sur la montagne'},      
        {url: '/static/img/paroisses/daru/fresques/rameaux.jpg', legende: 'L\'entrée à Jérusalem'},      
        {url: '/static/img/paroisses/daru/fresques/nativite.jpg', legende: 'La nativité'},      
 
        {url: '/static/img/paroisses/daru/fresques/christ-marchant-sur-eau.jpg', legende: 'Le Christ marchant sur l\'eau'},
        {url: '/static/img/paroisses/daru/fresques/peche-miraculeuse.jpg', legende: 'La pêche miraculeuse'},      
    
    ];

      const imgArrayIcones = [
        {url: '/static/img/paroisses/daru/icones/icone-st-alexandre-nevski.jpg', legende: 'Icone de Saint Alexandre Nevski'},
        {url: '/static/img/paroisses/daru/icones/icone-mere-de-Dieu.jpg', legende: 'Icone de la Vierge de Vladimir'},
        {url: '/static/img/paroisses/daru/icones/icone-st-georges.jpg', legende: 'Icone de Saint Georges terrassant le dragon'},
        {url: '/static/img/paroisses/daru/icones/icone-christ.jpg', legende: 'Icone du Christ'},
        {url: '/static/img/paroisses/daru/icones/icone-marins.jpg', legende: 'Icone des marins'},
        {url: '/static/img/paroisses/daru/icones/tryptique-mere-de-Dieu.jpg', legende: 'Tryptique, Vierge de Vladimir'},
        {url: '/static/img/paroisses/daru/icones/tryptique-transfiguration.jpg', legende: 'Tryptique, transfiguration'},
        {url: '/static/img/paroisses/daru/icones/tryptique-vierge-signe.jpg', legende: 'Tryptique, Vierge du signe'},
        {url: '/static/img/paroisses/daru/icones/icone-monument-tsar.jpg', legende: 'Monument en mémoire du défunt Tsar et de sa famille'},
        {url: '/static/img/paroisses/daru/icones/icone-vierge.jpg', legende: 'Icone de la Vierge Marie'},
        {url: '/static/img/paroisses/daru/icones/icone.jpg', legende: 'Icone'},
        {url: '/static/img/paroisses/daru/icones/icone2.jpg', legende: 'Icone'},
      ];


    return (
        <div className="px-10 bio-block">
            <h2>Cathédrale Saint Alexandre Nevski</h2>

            <p>L’apparition d’une église russe à Paris est étroitement liée, comme dans la plupart des pays, à l’échange de missions diplomatiques. Les relations entre la France et la Russie remontent au XIe siècle, au temps où Anne de Kiev, fille de Iaroslav le Sage épouse Henri Ier roi de France (1051).Il n’y a néanmoins pas de représentations permanentes jusqu’à la visite de Pierre le Grand en France, en 1717. Des relations diplomatiques plus étroites sont alors établies et une ambassade permanente est ouverte, auprès de laquelle pourtant il n’y aura pas encore systématiquement d’église. Il faudra attendre le décret du tsar Alexandre I du 12 février 1816 sur l’établissement d’une église de confession gréco-russe auprès de la mission diplomatique à Paris. Ce sera le début de l’existence ininterrompue d’une église russe à Paris.</p>
<p>Paris avait ceci de particulier qu’une grande colonie orthodoxe y était présente, composée de russes mais aussi d’autres nationalités. Une église dédiée à St Pierre et Paul fut d’abord créée dans des locaux loués (rue de Mesley puis rue de Berri) qui à l’évidence étaient trop exigus pour contenir tous les russes désireux de la fréquenter et si l’on considère tous les orthodoxes, la nécessité de disposer d’une église plus vaste située dans un bâtiment indépendant devenait criante.</p>
<p>A partir de 1847, le père Joseph Vassilieff, recteur de l’église russe de Paris, docteur en théologie de l’Académie de St Petersbourg consacre toute son énergie à ce projet. Il faut lui reconnaître tout le mérite de l’initiative, des démarches et de tous les efforts qui auront été nécessaires pour mener à bien cette entreprise unique en son genre. Son initiative généreuse se heurte à de nombreuses difficultés ; les conditions sont peu favorables (la guerre de Crimée a lieu de 1853 à 1856) et le gouvernement russe et le St Synode refusent catégoriquement au père Vassili toute subvention pour la construction de l’édifice. Il va alors envisager un financement privé, une souscription. Mais il a besoin d’une autorisation pour la lancer et ce n’est qu’en 1856, après deux autres refus qu’il obtient l’autorisation du tsar Alexandre II d’ouvrir cette souscription.</p>
<p>Cette église était destinée non seulement aux Russes, mais à toute la communauté orthodoxe. Sa construction également est devenue l’affaire de tous. Toutes les composantes de la société y participent. Dans la collecte des fonds vont s’impliquer les orthodoxes de Paris, russes, français, serbes, des militaires ou des nonnes, des commerçants de la foire de Nijni Novgorod que le père Joseph démarche en personne et le tsar Alexandre II lui-même sur sa cassette personnelle. Chacun contribue suivant ses moyens, 20 centimes pour un étudiant grec de la Sorbonne jusqu’à 100 000 francs pour un mécène grec. Aux orthodoxes se joignent des catholiques et des protestants.</p>
<p>En 1857 et 1858, deux parcelles attenantes sont acquises pour la construction de l’église. Nous devons le projet du bâtiment à l’architecte Kouzmine, tandis que Strohm en est le maître d’œuvre ; tous deux sont membres de l’Académie des Beaux-arts de St Petersbourg.</p>
<p>L’église est en pierres de taille blanches, dans un style russo-byzantin. Les architectes, les iconographes et les artistes qui y ont travaillé se sont inspirés des document établis à l’occasion des grands travaux de restauration en 1847 de la basilique Ste Sophie de Constantinople, ce qui explique l’appellation « russo-byzantine » du style.</p>
<p>La première pierre fut posée solennellement le 3 mars 1859 et les travaux sont achevés en août 1861. Consacrée à saint Alexandre Nevsky, la cérémonie de la dédicace fut célébrée par Mgr Léonce, le 30 août (ancien style) soit le 11 septembre 1861, jour de la translation des reliques du saint de Vladimir à Saint Petersbourg (1724).</p>
<Carousel imgList={imgArrayHistorique} legende="Gravures retraçant la construction et la consécration de la cathédrale" id="daru-gravures" />
<p>L’église russe de Paris a alors le même statut que toutes les églises russes à l’étranger, elle est rattachée au métropolite de St Petersbourg et de Ladoga. Pendant la guerre civile, après l’évacuation des Armées Blanches de Crimée, sa sainteté Tikhon, patriarche de Moscou et de toutes les Russies confie l’administration des églises russes à l’étranger à une direction ecclésiale collégiale.  En mars 1921 il établit l’archevêque Euloge comme Chef des Eglises russes en Occident. Lorsque Monseigneur Euloge devenu métropolite se fixe à Paris, l’église St Alexandre Nevsky devient le siège de l’archevêché naissant. Des statuts paroissiaux rédigés conformément aux règles du Concile de Moscou sont adoptés et l’association cultuelle est déclarée en 1923 aux autorités françaises conformément à la loi, ce qui officialise la vie paroissiale qui existait depuis la construction de l’église. Jusqu’en 1945 St Alexandre Nevsky est également l’église des ambassades de Serbie et de Bulgarie en France.</p>
<Carousel imgList={imgArrayExterieur} legende="Vue de l'extérieur de la cathédrale" id="daru-exterieur" />
<p>En 1930, pour avoir refusé de taire ses critiques à l’égard de la politique antireligieuse du pouvoir soviétique, le métropolite Euloge est démis par le métropolite Serge, locum tenens du siège patriarcal de Moscou. Sa Sainteté Photus II, Patriarche œcuménique, accède alors à la demande du conseil épiscopal et le 17 février 1931 accueille officiellement sous son omophore l’archevêché qui devient Exarchat.</p>
<p>Le rattachement canonique de l’archevêché au Patriarcat de Moscou a été restauré le 3 novembre 2019 avec la délivrance d’une charte de rattachement patriarcale et synodale (Gramota).</p>
<p>Le métropolite Euloge peut être considéré comme le fondateur de l’archevêché qu’il a dirigé de 1921 à 1946.</p>
<p>Le métropolite Vladimir va lui succéder. Après avoir servi 20 ans à Nice, il avait été appelé en 1945 par le métropolite Euloge pour l’aider à diriger l’Exarchat. En 1946, après le décès du métropolite Euloge, Monseigneur Vladimir est confirmé à sa tête par le patriarche œcuménique. En 1951 Il élève l’église St Alexandre Nevsky au rang de cathédrale.</p>
<Carousel imgList={imgArrayInterieur} legende="Vue de l'intérieur de la cathédrale" id="daru-intérieur" />
<p>Après lui, se sont succédés l’archevêque Georges (Tarassoff) (1960 – 1981), l’archevêque Georges (Wagner) (1981 – 1991), l’archevêque Serge (Konovaloff) (1993 – 2003), l’archevêque Gabriel (de Vylder) (2003-2013), l’archevêque Job (Getcha) (2013-2015). Aujourd’hui l’archevêque Jean (Renneteau), métropolite de Doubna, dirige l’archevêché.</p>
<p>Depuis les temps de l’infatigable père Joseph Vassilieff, le clergé de la cathédrale non seulement remplit avec abnégation et dévouement ses devoirs envers ses paroissiens, mais apporte une aide spirituelle à tous ceux qui en ont besoin et va au-devant d’eux dans les hôpitaux ou les maisons de retraite.</p>
<p>Le chœur occupe une place particulière dans l’histoire de la cathédrale. Au début, il était dirigé par des chefs de chœurs français et complété le cas échéant par des chanteurs français. En 1921 le protodiacre N. Tikhomiroff organise le premier chœur de chanteurs russes. Depuis 1925, cinq maîtres de chapelle particulièrement talentueux se sont succédés : N.P. Afonsky (1925-1949), P.V. Spassky (1949-1968), E.I. Evetz (1968-1988), V.E. Evetz (1988-2007) et aujourd’hui le protodiacre Alexandre Kedroff. Sous leur direction, le chœur contribue à créer une atmosphère harmonieuse et à embellir le déroulement des offices. Le chœur de la cathédrale donne des concerts en France et à l’étranger, il a fait de nombreux enregistrements et a beaucoup contribué à ouvrir aux chrétiens d’occident et aux amateurs de musique religieuse les chants russes. Tous les ans les offices de Noël et de Pâques célébrés dans la cathédrale sont retransmis par la radio.</p>
<p>Le 7 juin 1867, après avoir échappé la veille à un attentat au Bois de Boulogne, l’empereur Alexandre II et son épouse l’impératrice Marie en visite officielle en France, assistent à un Te Deum dans la cathédrale. Les accompagnent dans leurs prières l’empereur Napoléon III et son épouse, le roi de Prusse Guillaume I et son premier ministre Bismark, les grands ducs Alexandre et Vladimir ainsi que la grande duchesse Marie. L’attentat avait eu lieu le jour de l’Ascension et pour avoir eu la vie sauve, le tsar offrit à l’église deux icônes, une de l’Ascension et l’autre de saint Alexandre Nevsky. En 1896 l’empereur Nicolas II et l’impératrice Alexandra ont également commencé leur visite officielle à Paris par un Te Deum dans la cathédrale.</p>
<Carousel imgList={imgArrayFresques} legende="Fresques de la cathédrale" id="daru-fresque" />
<p>Dès sa consécration, l’église est devenue le centre spirituel de la colonie russe en France et à partir de 1922, lorsque le métropolite Euloge y établit le siège de l’archevêché, elle devient le centre spirituel des Russes dispersés à travers Europe occidentale.</p>
<p>A l’issue de la révolution, on estime que la population russe disséminée à l’extérieur de la Russie représente deux ou trois millions de personnes. Une part importante de cette « Russie hors frontières » s’est regroupée en Europe occidentale et notre église devient le centre non seulement de la vie spirituelle mais aussi sociale de l’émigration. Tous ceux qui ont trouvé asile en France s’y pressent pour y trouver réconfort et prières après avoir subi les affres de la révolution. Nombreux sont ceux parmi les nouveaux arrivants qui espèrent y retrouver des proches ou des compagnons d’arme. La communauté spirituelle qui s’y installe attire vers l’église St Alexandre Nevsky de plus en plus de fidèles. Beaucoup de ceux qui avaient combattu dans les différentes unités de l’Armée impériale ou de l’Armée blanche y sont conduits à leur dernière demeure.</p>
<p>Nombre d’icône et de monuments commémoratifs y ont été placés en mémoire de compagnons d’armes ou en l’honneur d’unités de l’Armée Impériale ou des Armées Blanches. On peut citer ceux en mémoire du Corps Expéditionnaire Russe et de la Légion Russe tombés en France durant la guerre de 1914 – 1918, de la Flotte Aérienne russe, des volontaires de la Division du Général Drozdovsky, de l’Armée Impériale des Volontaires et de l’Armée russes, des Cosaques du Don et des Cosaques hors de Russie, du régiment Seménoff de la Garde Impériale, du 250e anniversaire du régiment Préobrajensky de la Garde Impériale, du tricentenaire du régiment de hussards Izioumski. L’association des fidèles à la mémoire de l’empereur Nicolas II a érigé un Mémorial en souvenir de la famille Impériale tuée en 1918.</p>
<Carousel imgList={imgArrayIcones} legende="Icones de la cathédrale" id="daru-icones" />
<p>Lorsque Napoléon III a donné son accord pour le projet, il l’aurait qualifié de « curieux, original, mais très beau ».
La cathédrale a été classée monument historique en 1983, mais ce n’est pas son seul apanage. Les tournants de l’histoire, la révolution russe dont les conséquences désastreuses ont été supportées pendant près d’un siècle par toute l’Europe de l’Est lui a attribué, ainsi qu’à l’Archevêché, une responsabilité particulière.</p>
<p>En un siècle et demi la cathédrale a servi de façon exemplaire les Russes et tous les orthodoxes en France et en Europe occidentale. Elle est devenue le témoin de la vie personnelle, familiale et sociale de plusieurs générations issues de l’émigration blanche puis des autres vagues d’émigrants venus de Russie et d’Europe de l’Est ; c’est à l’abri de ses voûtes qu’ils se rassemblent dans les moments importants de leur vie.</p>
<p>La cathédrale Saint Alexandre Nevsky appartient à chaque « parisien » orthodoxe, qui en franchit le seuil avec sincérité, quelles que soient sa nationalité et la durée de son séjour à Paris et chacun y est accompagné par la prière prononcée par Monseigneur Léonce le jour de la consécration : Que tes yeux soient nuit et jour ouverts sur cette maison ; Ecoute la prière de ceux qui entrent en ce lieu avec foi</p>

        </div>
    );
}
