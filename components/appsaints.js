import parse from 'html-react-parser'

export default function AppSaints ({currentLanguage}) {
    return (
        <div className="bg-pyellow">
		<div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <main className="bg-white sm:px-10">
                <h2 className="pb-4 text-4xl"    >Les 4 saints martyrs de l'action Orthodoxe</h2>
                <p className="">Le saint-synode du patriarcat œcuménique a procédé, lors de sa session du 16 janvier 2004, à la canonisation de cinq personnalités marquantes de 
                l'histoire spirituelle de l'émigration russe en France, le père Alexis Medvekov (1867-1934), mère Marie (Skobtsov) (1891-1945) et ses compagnons, 
                le père Dimitri Klépinine (1904-1944), Georges (Youri) Skobtsov (1921-1944) et Élie Fondaminsky (1880-1942). </p>
                <p className='pb-2'>
                    La canonisation dans la tradition orthodoxe repose sur quatre critères:
                </p>
                <ol className="ml-4 list-decimal list-outside">
                    <li className="pb-2">Le "combat" spirituel qu'a mené le futur saint, le "beau/bon combat de la foi" dont parle saint Paul (1 Tm 6,12 ; 2 Tm 4,7)
                    (agôn en grec ; en russe подвиг: le haut fait, l'exploit). En fait, la réalisation du plan de Dieu concernant cette personne, car nous sommes tous appelés 
                    à la sainteté. Cette réalisation peut être inscrite dans la durée d'une vie entière, une portion de vie ou peut s'être produite en un instant, comme pour le bon larron de l'Évangile.
                    Dans le cas de mère Marie, certains biographes ont tendance à séparer résolument la partie "pécheresse" de sa vie (entre sa naissance et sa venue à Paris) de sa vie "sainte", 
                    et situe le retournement à la mort de sa fille Anastasie, qui débouche sur sa profession monastique. Cette division est, à mon sens arbitraire et erronée, 
                    car il y a beaucoup de signes annonciateurs des hauts faits et du combat spirituel de la future moniale dans la vie d'Élisabeth Pilenko, dès le début de sa vie, confirmés par ses écrits 
                    et son oeuvre peinte et brodée.</li>
                    <li className="pb-2">La renommée ou la vénération posthume, ce que l'entourage du futur saint a dit de lui après sa mort ou ce que les gens qui ont vécu à son époque ont pu dire ou écrire 
                    plus tard de son combat spirituel. À cet égard, l'Église attache aussi de l'importance aux témoignages dits "extérieurs", se prémunissant ainsi de la tentation de n'écouter 
                    que les proches, qui peuvent être trop subjectifs. Ce désir de laisser des témoignages oraux ou écrits, naît de la volonté du peuple chrétien d'en connaître davantage sur une personne 
                    déjà aimée et qui inspire l'admiration. Cette reconnaissance peut revêtir, suivant les cultures, des formes diverses: rassemblement spontané sur la tombe de la personne vénérée, 
                    célébrations de Requiem, suivies d'hommages aux dates anniversaires de la naissance ou de la mort, collection d'objets lui ayant appartenu, photographie particulièrement vénérée 
                    et même icône ; volonté d'apposer une plaque, une croix, un signe à l'endroit où s'est accompli l'exploit, publication de livres, d'articles sur le défunt, tournage de films, symposiums, etc.<br />
                    Dans le cas de mère Marie, la bibliographie des oeuvres écrites à son sujet comporte, toutes langues confondues, plus de cent titres. Il y a quatre films sur sa vie, 
                    des émissions de télévision, et même une cantate écrite par I. Jvanetskaïa, qui fut interprétée à Moscou, en 1996, par une cinquantaine de musiciens. Plusieurs icônes 
                    ont été peintes, portant la mention "martyre" et présentant un nimbe. La plupart de ces témoignages mentionnent également le père Dimitri Klépinine, Youri Skobtsov et 
                    Élie Fondaminsky. Les orthodoxes considèrent ce type de "reconnaissance avant la lettre" comme l'expression de la ferveur du peuple chrétien, qui pousse l'évêque à entamer 
                    une démarche de canonisation. Il n'y a pas de "procès de canonisation", ni d'"avocat du diable", si ce n'est qu'il se trouve, hélas, des esprits chagrins qui ne retiennent 
                    que les anecdotes cruelles colportées par ceux que le "prophétisme" du saint a dérangé.</li>
                    <li className="pb-2">L'état du corps. Dans le cas du père Alexis Medvedkov [prêtre de la petite paroisse d'Ugine (Savoie), de 1931 à sa mort, en 1934. Son corps fut retrouvé intact, en 1956, 
                    lors de l'exhumation rendue nécessaire par une transformation du cimetière communal, et transféré, l'année suivante, dans la crypte de l'église du cimetière orthodoxe de 
                    Sainte-Geneviève-des-Bois (Essonne). Il a été, lui aussi, canonisé le 16 janvier dernier] ce fut l'élément déterminant. C'est un signe d'élection, une façon d'attirer l'attention 
                    des humains qui n'ont pas remarqué du vivant de la personne en question, à la vie humble et discrète, qu'il était saint. Mais, dans la plupart des cas, et notamment chez les martyrs, 
                    il n'y a plus de corps: il a été noyé, oublié, enseveli dans la merzlota comme, par exemple, c'est le cas pour la plupart des néo-martyrs russes du 20e siècle.
                    Dans le cas des martyrs de l'Action orthodoxe, leurs corps ont été brûlés dans les fours crématoires et leurs cendres dispersées. Mais des habitants d'Anapa, au sud de la Russie, 
                    ville dont mère Marie a été le maire et qui la vénèrent particulièrement, ont recueilli des cendres à Ravensbrück et les ont rapportées pour les vénérer dans le musée qu'ils ont construit à sa mémoire. 
                    Dans l'église Saint-Roch à Paris, où ont lieu chaque mois de juin des concerts de musique sacrée orthodoxe, il y a des urnes où ont été rassemblées les cendres des suppliciés des différents 
                    camps de concentration nazis. Ce serait, peut-être, une bonne idée de recueillir, nous aussi, et de placer dans quelque monastère ou église orthodoxe de France, accessibles à la vénération des fidèles, 
                    quatre urnes avec des cendres recueillies à Ravensbrück, Auschwitz et Buchenwald.</li>
                    <li className="pb-2">Les miracles. Ils sont à relier à la vénération. Autrefois, l'évêque, ou l'hagiographe chargé du dossier de canonisation, recueillait et tentait de vérifier des témoignages 
                    de guérisons, de conversions, de réconciliations directement liés soit à une prière adressée à la personne vénérée, soit au contact avec un objet ou à "une relique" lui ayant appartenu.
                    Aujourd'hui, la notion de miracle s'est élargie et l'on considère que le fait même que cette personne vénérée ait "mené le bon combat", qu'elle ait accompli son "exploit" et ait inspiré 
                    l'entourage d'en faire autant est un miracle. Le fait que des orthodoxes se soient conduits de façon digne de leur qualité de chrétiens, aidant les sans-abri et sauvant les persécutés 
                    aux heures noires de l'Occupation nazie, nous fait honneur et nous inspire. De même qu'on appelle miracle le fait que des personnes peu ou pas croyantes, ayant appris l'exploit et 
                    la vénération du futur saint, se soient tournées vers Dieu ou aient placé leur action caritative sous son patronage en lui adressant déjà des prières. Ainsi, les infirmières 
                    du Centre Sainte-Anastasie qui se dévouent au service des orphelins et des enfants des rues à Saint-Pétersbourg ont placé mère Marie parmi les saintes qu'elles vénèrent et invoquent.
                    </li>
                </ol>       
            </main>
            </div>
        </div>
	)
}
