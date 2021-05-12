export default function Ivanovitch() {
    return (
        <div className="px-10 bio-block">
            <h2>Eveguéni Ivanovitch Evetz</h2>
            <img className="float-right w-52" src="/static/img/eugene-evetz.jpg" />
            <p>
                Eveguéni Ivanovitch Evetz est né en Biélorussie près de Minsk. Emigré d'abord au Maroc en 1949, puis à
                Paris dans les années soixante. Diplômé du Conservatoire de Varsovie, il fonde son propre choeur en 1963
                qui chante en Slavon dans la crypte de la Cathédrale Saint Alexandre Nevski. Sa première prestation
                consiste à chanter des Koliadki (chants traditionnels de Noël ukrainiens, similaires aux Christmas Carol
                anglais) au Noël des Sokols. En 1968, il prend la succession de P.V. Spassky qui vient de mourir : le
                choeur Evetz devient le choeur de la cathédrale. De huit choristes à ses débuts - la famille Evetz - la
                chorale compta jusqu'à 50 membres. Outre le choeur d'église (le petit choeur), Eveguéni Ivanovitch Evetz
                dirigea un choeur amateur de concerts (le grand choeur) dont les répétitions se tinrent chaque semaine
                dans la salle paroissiale de la cathédrale. Ceci permit promouvoir le chant religieux Orthodoxe à
                travers de nombreux disques et concerts dont les plus prestigieux furent donnés à la cathédrale de
                Reims, à la salle Pleyel, à l'église de la Madeleine avec l'illustre ténor Nicolas Gedda.
            </p>
            {/*<img className="float-left w-20 mr-2" src="/static/img/Eveguéni-Ivanovitch-Evetz.jpg" />*/}
            <div className='flex flex-wrap justify-center pb-2'>
                <a className="p-2 mx-auto border" href="/static/souvenir evgeni ivanovich.PDF" target="_blank">
                    <img className="inline-block" src="/static/img/file-text.svg" />
                    Extrait du bulletin paroissial de la cathédrale
                </a>
            </div>
            <p>
                Son activité musicale ne se limita pas à la direction de choeurs. Il enseigna également à Koenistein, au
                congrès d'étude de la langue russe. Il composa dans l'anonymat des oeuvres chantées à Daru dont Елице во
                Христа кристистися et le chant du bon larron en version choeur d'hommes, choeur de femmes et choeur
                mixte.
            </p>

            <div className="flex flex-wrap justify-center">
                <div className="mt-2 mb-2 text-center">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/srXTqC5wisE"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                    <div>"le chant du bon larron (en choeur de femmes) - Эксапостиларий великаво пятка)"</div>
                </div>
            </div>
        </div>
    );
}
