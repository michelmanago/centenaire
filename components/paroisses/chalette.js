import React from 'react';
import Carousel from '../carousel';

import Image from 'next/image';

export default function Chalette() {
 
    const imgArrayHistorique = [
        {url: '/static/img/paroisses/chalette/histoire0.jpg', legende: ''},
        {url: '/static/img/paroisses/chalette/histoire1.jpg', legende: ''},
        {url: '/static/img/paroisses/chalette/histoire2.jpg', legende: ''},
        {url: '/static/img/paroisses/chalette/histoire3.jpg', legende: ''},
        {url: '/static/img/paroisses/chalette/histoire4.jpg', legende: ''},
        {url: '/static/img/paroisses/chalette/histoire5.jpg', legende: ''},
    ];
    const imgArrayAujourdhui = [
        {url: '/static/img/paroisses/chalette/image1.jpg', legende: ''},
        {url: '/static/img/paroisses/chalette/interieur.jpg', legende: ''},
        {url: '/static/img/paroisses/chalette/image3.jpg', legende: ''},
        {url: '/static/img/paroisses/chalette/image4.jpg', legende: ''},
        {url: '/static/img/paroisses/chalette/image5.jpg', legende: ''},
    ];

    return (
        <div className="px-10 bio-block">
            <img className="flex sm:items-center float-left w-1/3 mr-2 mt-2"
                src="/static/img/paroisses/chalette/pretre.jpg" 
                alt="Prêtre de l\'église de Chalette" />
             <h2>L’Eglise orthodoxe de Chalette</h2>
            <p>L’Église Orthodoxe Russe de Chalette a été construite en 1924 grâce aux dons des émigrés et au travail de la confrérie de la Sainte  Trinité. L’église fut édifiée dans l’enceinte de l’usine Hutchinson dans le quartier dit « de Moscou », de nos jours le « quartier de Moscou » existe toujours. C’est l’administration de l’usine qui permit la construction de l’église dans le cadre de la législation Française. Tout cela a été officialisé et inscrit dans le journal officiel N°248 du 22 octobre 1925. L’église était construite en bois et ne possédait pas de clocher.</p>
            <p>De 1925 à 1926 le responsable de notre église était le prêtre Jean Filimonovitch Tsereteli descendant de la noblesse Russe. Il avait le grade de colonel dans l’armée impériale. Il était décoré du ruban avec croix d’or. Ce ruban se portait sur le côté lors des offices religieux. Il reçut aussi une calotte et un diplôme de l’archiprêtre du Synode de l’Église Orthodoxe Russe à l’étranger ainsi qu’une croix pectorale en or. </p>
            <p>A l’époque à Chalette était enregistré environ 600 orthodoxes. La majorité était composée de Cosaques du Don et du Kouban ainsi que des membres de la noblesse. Il y avait aussi des orthodoxes dans les villes environnantes comme Sens 200 personnes, Bagneaux 40 personnes, Troyes 70 personnes.</p>
            <p>Les membres de la communauté se mobilisent et s’organisent. En avril 1926 avec l’accord du maire  de Chalette se construit un emplacement pour abriter les cloches. Il se compose de deux poteaux et d’un toit de planches.</p>
            <p>En novembre 1926 le prêtre de l’église de la Sainte-Trinité était Théodore Vassilevitch Karakouline, fils d’un diacre et prêtre militaire décoré de prestigieuses médailles et décorations telles que l’ordre de Sainte Anne 3e degré avec glaives croisés, médaille d’argent de la campagne du général Drozdovski, ainsi qu’une calotte sertie d’une croix d’or sur un ruban de Saint Georges et un ruban pectoral portant l’inscription « Gallipoli 1920-1921 ».</p>
            <Carousel imgList={imgArrayHistorique} legende="Historique de l\'église de chalette" id="chalette-histoire" />
           <p>En connaissance de l’œuvre à accomplir avec son savoir et son autorité, père Théodore  prit en charge son ministère. Il accorda beaucoup d’importance au travail spirituel et à l’éducation auprès de la diaspora Russe. Pour son service, au sein de l’Église Orthodoxe Russe, par décret de son excellence le métropolite Euloge le 5 avril 1928; le jour de la Sainte Pâques il fut nommé archiprêtre.</p>
            <p>En 1931 grâce à son travail, une école paroissiale vit le jour. A cette époque l’école comptait 14 garçons et 14 filles ; on y enseignait la langue russe, l’histoire, la géographie de la Russie ainsi que le catéchisme.</p>
            <p>Des années durant les responsables de la communauté s’efforcèrent à éduquer les enfants dans l’esprit Orthodoxe et dans l’amour de la mère Patrie Russe. En 1955 l’école cessa son existence faute d’élèves en age d’être scolarisé.</p>
            <p>En 1934 pendant l’assemblée générale on nous informa de la démolition des baraques en bois y compris de l’église russe. Cela souleva le problème de la recherche d’un terrain où  construire une nouvelle église. Une commission composée de 4 personnes présidée par père Théodore  s’adressèrent à l’administration de l’usine Langlée afin de leur trouver un endroit où construire une nouvelle église. Le directeur de l’usine Monsieur Lansois très bien disposé envers la communauté russe (son épouse avait été une des demoiselles d’honneur de l’impératrice) répondit favorablement à leur requête et leur octroyat  un terrain appartenant à l’usine Hutchinson  d’une superficie de 408 m² .</p>
            <p>Le conseil paroissial  s’adressa à toute la diaspora orthodoxe russe de Chalette afin de leur demander de participer à la sainte œuvre de la construction de la nouvelle église. Père Théodore opta pour la construction d’une église en bois, car la construction d’une église en pierre était impossible. On reçut de l’argent du monde entier grâce aux lettres mandat.Ces dons facilitèrent le travail du prêtre pour l’aménagement intérieur de l’église. La bénédiction et la sanctification se fit après la liturgie le 24 juin 1934. Père Théodore  supervisa personnellement tout le travail, et les achats nécessaires à la construction de l’église. Le peintre V.Evtoukhov fit don de plusieurs icônes afin de décorer l’intérieur de l’église. M.Koroul  travailla sans relâche à la réalisation du Saint Linceul.</p>
            <p>Le 26 août 1934 l’église fut bénie par son excellence le métropolite  Euloge. En 1935 l’église créa un fond d’aide pour les chômeurs et les nécessiteux de la diaspora  russe. En 1937 la surface de terrain appartenant à l’église s’agrandit de 1000 m² . Grâce à l’activité des membres de la paroisse et aux dons, il fut construit une maison de réunion. Pour son travail durant la construction de l’église de la Sainte-Trinité père Théodore reçu une autre distinction ecclésiastique une « Palitsa ».</p>
            <Carousel imgList={imgArrayAujourdhui} legende="L\'église de chalette" id="chalette" />
            <p>Après la mort de Théodore Karakouline, le prêtre Jacob Protopopov fut désigné comme responsables. A la fête de la nativité du Christ l’année 1939 il reçut comme distinction une calotte ecclésiastique des mains de son Excellence le métropolite  Euloge.</p>
            <p>Le père Jacob portait sur ses épaules non seulement les besoins spirituels de la paroisse mais il devait résoudre les problèmes  de la maintenance. Durant les dures années 40, il coupait lui même le bois, réparait l’enclos de l’église ainsi que les marches. Du fait du départ massif des fidèles  pour travailler en Allemagne, la vie de la paroisse changea. On ressentait cruellement le manque de farine pour la préparation des prosphores. Il n’y avait pas en vente les produits pour les encensoirs . Malgré les difficultés de cette époque, les liturgies avaient toujours lieu. A la célébration de la Nativité du Christ, le père Jacob fut à nouveau décoré et reçu une croix pectorale en or des mains de son Excellence le métropolite Euloge.</p>
            <p>Depuis la création de l’église , jusqu’en 1954 le chef de chœur était Jean Moskalenko. Le chœur comptait 25 hommes qui réjouissaient les fidèles par la beauté des chants orthodoxes. Pendant de longues années la marguillière fut madame Karitina Dmitrievna Koulikova, aidée par O.Poliak. Grâce à leur inlassable travail l’église était tenue propre et agréable. D’après les paroles du père Jacob, ces deux travailleuses embellissaient l’église non seulement par les fleurs mais aussi par leur humilité.</p>
            <p>Pendant des dizaines d’années le père Jacob Protopopov appelait à se confesser et à communier à la Sainte Cène. Il invitait la jeunesse à fréquenter régulièrement  les offices religieux. Il s’occupait d’œuvres de bienfaisance et il s’efforçait toujours d’accorder  son attention à tous et ouvrait son âme chaleureuse. </p>
            <p>A la mort de notre prêtre, le conseil paroissial eut la lourde tâche de poursuivre les activités de l’église. La régularité des offices religieux changea. Depuis ce temps beaucoup de prêtres officièrent dans notre église. Parmi eux il y avait l’archiprêtre  Nicolas Obolensky. Nicolas Alexandrovitch Obolensky était un descendant des princes de la lignée de Rourik. Il était le fils du gouverneur de Saint-Pétersbourg parrain de l’impératrice Marie Fedorovna et du grand prince Constantin Constantinovitch. Sa vie en émigration fut un chemin difficile et douloureux . Il fut interné par les nazis dans le camp de concentration de Buckenvald où son épouse bien aimée fut décapitée par les nazis. Après avoir vécu cette tragédie il devint prêtre. Durant de longues années le père Nicolas Obolensky officia deux fois par mois dans notre modeste église.</p>
            <p>En 1966, avec la bénédiction de l’Archevêque Georges, la bibliothèque  russe de l’union des Cosaques combattants s’installa dans la maison paroissiale.</p>
            <p>Ces vingt dernières années la marguillière de notre communauté est madame Huguette Coneuf-Mironoff. Sur ses épaules repose beaucoup de travail et de soucis, la préparation des prosphores, la propreté de l’église ainsi que les indispensables travaux de réparation. Sous son autorité en 2007-2008 l’église fut restaurée. Son excellence l’Archevêque Gabriel donna sa bénédiction pour la construction d’une nouvelle maison paroissiale. Cela fut rendu possible grâce aux dons des fidèles mais surtout grâce au travail et aux grandes compétences de Piotr Yudine qui consacra pendant des années tous ses week-ends à l’édification de cette belle maison. La maison paroissiale a été construite en bois dans le plus pur style architectural russe. L’intérieur a été décoré avec un goût artistique exquis par Galina son épouse. Ils ont su recréer un petit coin de Russie en terre Gatinaise ,  qu’ils en soient remerciés.</p>
            <p>La salle peut contenir 40 personnes qui nous permet de continuer d’exercer la belle tradition de l’hospitalité russe.</p>
            <p>En conclusion quelques paroles de notre prêtre Jacob Protopopov « Merci de tout cœur  à ceux et celles qui ont prouvé leur amour et leur attachement à notre église, aux  donateurs ainsi qu’à ceux qui ont contribué à son embellissement  avec l’espoir qu’à l’avenir, avec l’aide de Dieu, se construira ce qui est bon ».</p>
       </div>
    );
}