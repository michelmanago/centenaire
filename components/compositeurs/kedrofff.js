export default function Kedroffp() {
    return (
        <div className="px-10 bio-block">
            <h2>Nicolas Kedroff</h2>
            <img className="float-right w-1/3" src="/static/img/nicolas-kedrofff.jpeg" />
            <p>
                Pianiste et compositeur, Nicolas Kedroff est lauréat du conservatoire russe Serge Rachmaninov à Paris
                (dont son père est l’un des fondateurs), il accompagne quelques concerts au piano. En 1928, il intègre
                le Quatuor de son père comme 2ème ténor et prendra part aux trois autres tournées américaines, assurant
                progressivement le pupitre de 1er ténor.
            </p>
            <p>
                En 1939, la guerre éclate. Nicolas Kedroff-fils s’engage dans l’armée française. Fais prisonnier par les
                Allemands, il restera cinq ans en captivité. Il fut présent à la mort de son père qui s’éteignit le 30
                janvier 1940 à Paris et dont les funérailles furent célébrées à la cathédrale St-Alexandre-Nevsky. Au
                retour de captivité, Kedroff-fils décide de continuer l’œuvre de son père. Il s’inspire largement du
                répertoire de l’ancien Quatuor et y ajoute ses propres harmonisations. Il n’abandonnera jamais le
                répertoire populaire que son père avait tant magnifié mais s’en éloignera pour donner des concerts
                strictement religieux. Le public avait aussi évolué dans ses aspirations. C’est la période où
                l’Orthodoxie fait une forte impression en Occident, où le dialogue interreligieux s’intensifie, nourri
                par de grandes personnalités intellectuelles du monde orthodoxe. L’Eglise catholique manifeste un
                intérêt palpable pour l’Orthodoxie. Certains espèrent voir de leurs yeux une réunification prochaine des
                Eglises. C’est dans ce contexte que N. Kedroff-fils fait un arrangement du « Notre Père » en latin qui
                sera chanté en conclusion de tous les concerts devant un public, debout.
            </p>
            <p>
                En 1957, à l’occasion d’un concert donné salle Gaveau à Paris, le Quatuor fête ses 50 ans. En 1959, il
                repart pour l’Amérique où il effectue une série de concerts. Nicolas Kedroff fils enregistre alors deux
                disques de haute qualité, constitué d’un répertoire religieux. La première partie reprend des motifs
                anciens qu’il a lui-même harmonisé. La deuxième partie présente l’influence de l’école occidentale
                (XVIIIe et XIXe siècles) avec des compositions de D. Bortniansky, A. Lvov…et la troisième partie est
                consacrée à des œuvres liturgiques de la « Nouvelle Orientation », mouvement marqué par un retour à la
                tradition qui a pris forme dans le cadre de l’Ecole Synodale de Moscou au début du XXe siècle sous
                l’impulsion de compositeurs comme S. Smolensky ou A. Kastalsky. Cette école, interrompue par la
                Révolution, inspira d’autres musiciens de l’émigration tels que P. Tchesnokoff, A. Glazounov M.
                Kovalevsky ou Kedroff.
            </p>
            <p>
                N. Kedroff-fils et son Quatuor donna d’innombrables concerts en France et à l’étranger. Outre la
                maîtrise technique, le Quatuor se distinguait par sa haute culture musicale, un goût sans faille, une
                interprétation habitée. C’était également une époque où les programmes de concert se préparaient par des
                dizaines de répétitions.
            </p>
            <p>
                L’œuvre accomplie par N. Kedroff au profit de l’Eglise est immense. Il consacra presque toute sa vie à
                composer et harmoniser les chants liturgiques. Quoiqu’il fût parfois audacieux, il aima harmoniser avec
                simplicité les motifs traditionnels de l’Eglise. Kedroff fils, qui avait un goût affirmé pour l’écriture
                modale, fut suivi par une génération de musiciens ; en particulier, Maxime Kovalevsky, fondateur de la
                Société Musicale Russe (dont N. Kedroff était membre). Enfin, N. Kedroff a été le principal artisan des
                deux recueils de chant liturgique édités à Londres en 1962 et en 1975 qui rassemblent des œuvres du
                répertoire liturgique du XVIIIe et XIXe siècles, ainsi que celles, inédites jusqu’alors, des
                compositeurs de l’émigration. C’est grâce à cette publication que nous est connu une grande partie des
                œuvres liturgiques de son père et de lui-même.
            </p>
            <p>
                Le 23 mai 1981, Nicolas Kedroff fils s’éteignit. Compositeur, pianiste, chanteur, maître de chapelle,
                avant tout profond et sincère chrétien orthodoxe, il offrit (comme son père) sa généreuse obole à
                l’essor du chant liturgique russe. Au cours de sa vie, il a donné plus de 3000 concerts en Europe et aux
                Etats-Unis.
            </p>

            <div className="flex flex-wrap justify-center">
                <div className="mt-2 mb-2 text-center">
                    <audio
                        controls
                        src="/static/music/4571-musique-nicolas-kedroff-fils-bienheureux-l-homme.mp3"
                    >
                        Your browser does not support the
                        <code>audio</code> element.
                    </audio>
                    <div>Bienheureux l'homme</div>
                </div>

                <div className='mt-2 mb-2 text-center'>
                    <audio
                        controls
                        src="/static/music/4571-musique-nicolas-kedroff-fils-psaume-de-la-creation.mp3"
                    >
                        Your browser does not support the
                        <code>audio</code> element.
                    </audio>
                    <div>Psaume de la Creation</div>
                </div>

                <div className="mt-2 mb-4 text-center">
                    <audio
                        controls
                        src="/static/music/4571-musique-nicolas-kedroff-fils-seigneur-je-crie-vers-toi.mp3"
                    >
                        Your browser does not support the
                        <code>audio</code> element.
                    </audio>
                    <div>Seigneur je crie vers toi</div>
                </div>
            </div>
        </div>
    );
}
