import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

    customWidth: {
        maxWidth: 2000,
        fontSize: theme.typography.pxToRem(20),
        
    }
}));

const longText1 = `Народная воля (Liberté [ou volonté] du peuple): société révolutionnaire fondée en 1879, qui prônait la terreur.`;
const longText2 = `Homme politique allemand, Ferdinand Lassalle (1825-1864) participe au mouvement révolutionnaire, puis s&#39;oriente vers le socialisme réformiste.`;
const longText3 = `Théodore Stefun (1864-1965), philosophe et essayiste, a vécu en Allemagne.`;
const longText4 = `Vers de Pouchkine, qui évoque ses amis morts ou envoyés en exil.`;
const longText5 = `En français dans le texte`;
const longText6 = `personnage de la pièce de Gorki Dans les bas-fonds.`;
const longText7 = `Vers de Pouchkine`;
const longText8 = `Les narodniki (populistes) créèrent le parti socialiste révolutionnaire russe (S.R).`;
const longText9 = `Pierre Lavrov (1825-1900) -professeur de mathématiques, chef de file et idéologue des populistes`;
const longText10 = `Youri Chirinski-Chikhmatov (1890-1942) - journaliste politique mort à Auschwitz.`;
const longText11 = `En français dans le texte`;



export default function Fondaminsky() {
    const classes = useStyles();
    return (
        <div className="px-10 bio-block">
            <h2>Élie Fondaminsky (1880-1942)</h2>

            <p>
                Il est difficile d&#39;évoquer la figure d&#39;Élie Isidorovitch Fondaminski sans tomber dans le ton
                hagiographique. Ce fut en vérité un juste dans les sens chrétien aussi bien que laïc de ce terme, en
                outre il mourut en martyr. Certes, ses chances d&#39;accéder à la canonisation, lui un juif et un
                socialiste révolutionnaire, sont minimes. Mais il est une autre canonisation, laïque celle-ci, qui,
                l&#39;intervention du mouvement  <Tooltip disableFocusListener title={longText1} classes={{ tooltip: classes.customWidth }}>
                <a>Liberté du Peuple</a></Tooltip> aidant, a édulcoré
                et dépersonnalisé les biographies du plus grand nombre des justes de l&#39;intelligentsia russe.
                C&#39;est pourquoi il est si important de conserver les traits vivants du visage de l&#39;homme avant
                qu&#39;ils ne disparaissent, effacés sous la légende héroïque. Une certaine dose d&#39;approche critique
                à la façon des Bollandistes est ici requise.
            </p>

            <h3>Une rare bonté</h3>
            <p>
                Je n&#39;ai jamais rencontré Bunakov-Fondaminski en Russie. Seuls l&#39;écho de sa légende, celle
                d&#39;<Tooltip disableFocusListener title={longText2} classes={{ tooltip: classes.customWidth }}><a>un Lassale</a></Tooltip>, d&#39;un
                Invincible, était parvenu jusqu&#39;à moi en ces temps lointains de la première révolution. C&#39;est à
                Paris que je fis sa connaissance, peu après mon arrivée dans cette ville, tout à la fin de l&#39;année
                1925 ou au début de l&#39;année 1926. Je ne saurais dire dans quelle circonstance a eu lieu notre
                rencontre, mais aussi loin que je remonte dans mes souvenirs d&#39;émigration, je me revois dans le
                confortable salon des Fondaminski, en train de prendre le thé en compagne de quelques visiteurs, ou
                encore dans le bureau d&#39;Elie Isidorovitch au milieu d&#39;un conversation d&#39;affaire ou d&#39;un
                débat d&#39;idée avec le maître des lieux, presque toujours en relation avec l&#39;une ou l&#39;autre de
                ses innombrables opérations littéraires ou publiques. Pendant quinze ans je fus son collaborateur dans
                toutes ses entreprises, et en particulier dans la revue La Cité nouvelle (Новый град), où nous avait
                rejoint Th.A. <Tooltip disableFocusListener title={longText3} classes={{ tooltip: classes.customWidth }}><a>Stepun</a></Tooltip>. J&#39;
                ai pu observer la vie familiale d&#39;E.I, quand je fus son hôte dans la
                villa qu&#39;il possédait à Grasse. Ai-je le droit de me dire son ami dans le sens russe du mot ? A vrai
                dire, je n&#39;en sais rien. E.I. ne m&#39;associait pas aux aspects intimes de sa vie, parlait peu de
                lui-même, de son passé. Il ne se plaignait jamais. D&#39;autres l&#39;ont sûrement mieux connu et plus
                profondément, mais, j&#39;en ai bien peur, « les uns ne sont plus là, d&#39; »
                <Tooltip disableFocusListener title={longText4} classes={{ tooltip: classes.customWidth }}><a>autres sont loin</a></Tooltip>. Aussi me vois je
                contraint de reconstituer son portrait intérieur à partir de reflets et de fragments d&#39;impressions
                extérieures.
            </p>
            <p>
                La première chose qui frappait et conquérait chez Fondaminski était sa rare bonté. Elle semblait
                infinie. Il est diverses espèces de bontés. Celle d&#39;E.I. se manifestait avec le plus d&#39;éclat
                sous l&#39;aspect de l&#39;humilité. La douceur et la délicatesse qu&#39;il montrait dans ses rapports
                avec les gens étaient en vérité étonnantes. Je ne l&#39;ai jamais vu irrité, impatient ou même indigné.
                Il semblait disposé à accepter tout un chacun dans son commerce fraternel, à tout pardonner, à faire
                crédit par avance. La tolérance dont il savait faire preuve envers les convictions d&#39;autrui, même
                les plus éloignées des siennes ou les plus opposées, était tout simplement inouïe dans le milieu de
                l&#39;intelligentsia russe engagée. Il s&#39;efforçait toujours de comprendre ce en quoi résidait la
                vérité ultime de son adversaire et d&#39;emporter sa conviction plutôt que de battre en brèche ses
                arguments. Il s&#39;affligeait souvent du fanatisme des russes de son milieu et de l&#39;intelligentsia
                russe dans son ensemble, toujours prête à changer des divergences de vues en inimitié personnelle. Tel
                n&#39;était pas le cas de Fondaminski, comme s&#39;il n&#39;avait jamais appartenu à cet « ordre », si
                estimé de lui, de l&#39;intelligentsia russe. Il est vrai que cette tolérance s&#39;explique en partie
                par la découverte qu&#39;il avait faite de l&#39;autre face de la réalité. Il fut l&#39;un des rares à
                avoir su, à ce tournant historique, discerner le visage authentique, non caricaturé, tant de la vieille
                que de la nouvelle Russie. Mais les seuls éléments intellectuels ne suffisent pas à expliquer sa
                tolérance. « L&#39;Église élargie » possède, elle aussi, ses fanatiques parmi nous. Chez E.I. la
                tolérance était l&#39;expression de la bonté, laquelle savait prendre chez lui une forme active, preuve
                qu&#39;il ne s&#39;agissait pas seulement chez lui d&#39;un dispositif de défense vital, qui souvent
                n&#39;est que le masque de l&#39;indifférence. E.I. aidait un grand nombre de gens tant matériellement
                que moralement. Il venait aux secours de ceux qui le méritaient comme de ceux qui ne le méritaient pas,
                sans ménager son argent. Or, comme on sait, l&#39;argent est un indice de bonté plus fiable que les
                sourires.
            </p>
            <p>
                Mais il est des présents plus précieux encore que l&#39;argent et les sourires. E.I. attirait les gens
                que rongeait un chagrin personnel ou qui s&#39;étaient égarés sur les chemins de la vie. On allait le
                voir non seulement comme un ami, mais comme une sorte de guide spirituel, un starets laïc. A notre
                époque de désarroi, d&#39;égarement et de désespoir, le besoin d&#39;un guide extérieur est plus fort
                que jamais. E.I. ne répugnait pas à cette fonction qui lui était échue. Il semblait même l&#39;aimer,
                abandonnant sur ce point son habituelle humilité. Peut-être est-ce parce que les vérités morales lui
                apparaissaient plus claires, plus irréfragables que les vérités rationnelles, à propos desquelles il
                prêtait volontiers l&#39;oreille à l&#39;opinion d&#39;autrui. Et pourtant, quelque absolus que fussent
                pour lui les impératifs moraux, E.I. n&#39;était pas un guide spirituel rigoureux. Jamais il ne
                stigmatisait, jamais il n&#39;imposait un fardeau trop lourd. Il compatissait, partageait le malheur
                d&#39;autrui et donnait espoir. Son optimisme se révélait alors un remède miraculeux. On pouvait croire
                qu&#39;il n&#39;existait pas pour lui dans la vie de situations tragiques ou sans issue. Ou même qui
                exigent la mort ou quelque autre sacrifice douloureux, parfois pire que la mort. Cet optimisme se
                maintenait chez lui dans les circonstances les plus contraires. Il n&#39;était pas la manifestation
                d&#39;une vitalité naturelle, mais une confession de foi, l&#39;expression d&#39;un devoir moral. Aucun
                mot ne s&#39;échappait plus souvent de ses lèvres que ce « parfait ! parfait ! » qui était son
                expression favorite. Il le prononçait parfois hors de propos, dans des circonstances fort éloignées de
                la perfection. E.I. resta fidèle à lui-même et à son éternel optimisme même pendant la dernière maladie
                de sa femme tendrement aimée, lorsque son état fut déclaré désespéré. Au cimetière encore, au dessus de
                la tombe d&#39;Amalia Osipovna, il s&#39;efforçait d&#39;afficher sur son visage un sourire. Mais ce
                sourire avait quelque chose de dément.
            </p>
            <p>
                Bien sûr, l&#39;optimisme était une qualité précieuse pour un directeur de
                <Tooltip disableFocusListener title={longText5} classes={{ tooltip: classes.customWidth }}>
                <a>conscience</a></Tooltip> laïc. Par cet optimisme, E. I. faisait davantage penser au Lucas de
                Gorki qu&#39;aux starets d&#39;Optino. Non qu&#39;il fût, à l&#39;
                <Tooltip disableFocusListener title={longText6} classes={{ tooltip: classes.customWidth }}><a>instar de Lucas</a></Tooltip>
                ou de Gorki, partisan du « rêve d&#39;or » ou de «
                l&#39; »<Tooltip disableFocusListener title={longText7} classes={{ tooltip: classes.customWidth }}>
                <a>illusion qui nous élève</a></Tooltip>. Mais il était
                constitutionnellement incapable d&#39;infliger la moindre souffrance à un être humain. La vérité, même
                la vérité morale, devait s&#39;écarter devant l&#39;homme. L&#39;amour de l&#39;homme exigeait avant
                tout pour E.I. la consolation, le soulagement du malheur.
            </p>
            <p>
                Si l&#39;on considère que l&#39;amour parfait doit être au-dessus de la pitié, force est d&#39;admettre
                que l&#39;amour d&#39;E.I. n&#39;était pas parfait, quoique infiniment supérieur à ce qu&#39;entend par
                ce même mot un inhumain ascétisme. Mais une autre dimension manquait à son amour, et sur ce point
                l&#39;ascétisme inhumain était sans conteste de son côté : celle d&#39;une relation vraiment
                personnelle, ce qu&#39;on peut appeler choix ou élection : di-lectio. Pour beaucoup de représentants de
                l&#39;éthique monastique, mais cela vaut aussi pour Tolstoï, l&#39;amour doit être égal pour tous, sans
                aucune préférence. Cependant, dans le cœur limité et non pas infini de l&#39;homme, une telle égalité
                anémie l&#39;amour, le rend tiède, sinon froid. Sans aucun doute, ils étaient nombreux parmi les amis
                d&#39;E.I. ou parmi ses enfants spirituels à qui il apportait son aide, à se plaindre de son cœur si
                vaste, en prenant conscience qu&#39;ils ne pourraient prétendre à une place exclusive dans son
                existence. E.I., du moins dans les années où je l&#39;ai connu, n&#39;avait pas d&#39;amis, au sens où
                les romantiques comprenaient ce mot. Il était conscient de ce trait ou de ce défaut de son caractère et
                acceptait avec l&#39;humour de l&#39;humilité le reproche qu&#39;on lui faisait de « fausse bonté ».
            </p>
            <p>
                L&#39;absence de haine chez E.I., son infinie tolérance si non envers le mal, du moins envers les
                méchants, son optimisme enfin, faisaient le désespoir de ses camarades de parti, et de beaucoup
                d&#39;autres. Lorsqu&#39;on lui parlait, on avait peine à se convaincre qu&#39;il était ce même Bounakov
                l&#39;Invincible qu&#39;il avait été auparavant. Il ne reniait rien, ne maudissait rien dans son passé.
                Mais il était devenu chrétien et cela avait changé sa nature. Nous ne savons pas, et je doute qu&#39;un
                vivant puisse encore raconter, comment s&#39;était produite cette conversion. Ce fut apparemment un long
                processus, commencé dans les premières années de ce siècle, c&#39;est-à-dire, dans les premières années
                de sa carrière révolutionnaire. Sans nul doute des crises ont-elles dû ponctuer ce parcours spirituel
                qui fut dans l&#39;ensemble heureux. E.I. évoquait à mots couverts une de ces crises, et c&#39;est
                seulement par conjecture, que nous pouvons y chercher la solution à l&#39;énigme que constituait sa
                personnalité. Il disait avoir vécu un choc psychique profond, qui l&#39;avait conduit à la maladie
                nerveuse, peut-être au seuil de la folie. Il était sorti renouvelé de cette crise, mais cela n&#39;avait
                pas été facile. On dit de ceux qui ont vécu une conversion religieuse accompagnée d&#39;une
                restructuration complète de leur personnalité qu&#39;ils sont « renés ». Ce terme s&#39;applique mal à
                E.I. À son propos, on pense plutôt à un beau vase, qui aurait été brisé, pour être ensuite soigneusement
                recollé. Les traces de restauration n&#39;apparaissent pas au premier abord, mais se distinguent
                clairement pour peu qu&#39;on l&#39;observe attentivement. Ou peut-être faudrait-il recourir à une image
                organique. Les plaies les plus graves se referment, les os se ressoudent, mais les cicatrices demeurent.
                On relève parfois une incapacité musculaire, telle qu&#39;une claudication. L&#39;humilité, la
                tolérance, l&#39;optimisme presque irréels dont faisaient preuve E.I. étaient sinon un masque
                dissimulant son visage, du moins une carapace où il s&#39;enfermait, l&#39;égide lui permettant de
                repousser les monstres qu&#39;il avait entrevus un jour au fond du chaos.
            </p>

            <h3>Le Christianisme d&#39;Élie Fondaminski</h3>

            <p>
                <Tooltip disableFocusListener title={longText8} classes={{ tooltip: classes.customWidth }}>
                <a>Son passé de narodnik</a></Tooltip>, facilitait pour E.I. son autoéducation dans le christianisme. Il lui fallut
                apprendre à neuf l&#39;humilité et la patience. Mais la philanthropie pouvait être transplantée en
                l&#39;état, sans douleur. Dans la science de la charité les justes athées de l&#39;intelligentsia russe
                n&#39;avaient pas grand chose à apprendre des chrétiens de leur temps. Demeurait aussi la « kénose » des
                narodnik, cette forme d&#39;ascèse sociale par laquelle l&#39;intelligentsia russe rejoignait les
                traditions de sainteté russe. Les « vêtements grossiers » de saint Serge de Radonège trouvaient leur
                correspondant dans les vestes élimées et les cols froissés qu&#39;E.I arborait dans les réunions ou même
                au concert, à sa barbe non rasée les jours de semaine.
            </p>
            <p>
                Il ne se soumettait pas à des épreuves ascétiques, ne dormait pas sur des clous comme Rakhmetov, ne se
                privait pas des biens de la culture et du confort que mettaient à sa portée ses ressources matérielles
                ou plutôt les habitudes de vie de son épouse, mais il n&#39;en éprouvait aucun besoin et il était clair
                qu&#39;il y aurait renoncé sur le champ si les circonstances l&#39;avaient exigé.
            </p>
            <p>
                Jusqu&#39;à quel point le christianisme d&#39;E.I. était-il profond et complet ? Il est difficile de
                répondre à cette question. Comme on sait, il ne reçut le baptême qu&#39;à la veille de sa mort, et ne
                participait donc pas aux sacrements de L&#39;Église ni à ce qu&#39;on appelle la vie ecclésiale. Mais il
                priait et on le voyait à l&#39;église tous les dimanches. Dans les dernières années avant la guerre, il
                appartenait à la petite paroisse française du père Gillet. Il aurait été naturel de supposer chez lui
                quelque réticence de nature dogmatique ou autre, qui l&#39;aurait amené à remettre son entrée dans
                l&#39;Église. Mais E.I. écartait toujours des suppositions de cette nature. Par modestie, il ne prononça
                jamais aucun discours ni ne publia aucun article touchant à la théologie et il sut résister avec succès
                à la tentation de devenir un publiciste orthodoxe. Cependant les interprétations modernes de
                l&#39;orthodoxie de Soloviev, de Boulgakov et surtout de Berdiaev semblaient le satisfaire pleinement.
            </p>
            <p>
                E.I. récusait tout autant cette autre supposition qu&#39;il ne recherchait pas les sacrements parce
                qu&#39;il n&#39;en ressentait pas la nécessité. Son idéalisme philosophique pouvait le faire penser,
                mais E.I. affirmait qu&#39;il comprenait parfaitement pourquoi l&#39;être humain, fait de chair et
                d&#39;esprit, avait besoin de symboles matériels pour accéder aux dons spirituels. Et cette affirmation
                était sincère, bien qu&#39;indubitablement il allait au Christ par le chemin de l&#39;éthique plus que
                par celui de la mystique et des sacrements. Quand on lui demandait pourquoi il refusait le baptême
                malgré son accord complet avec l&#39;Église, il répondait qu&#39;il en était indigne. Et dans
                l&#39;humilité de cette conscience de soi il y avait une part de vérité. Tel les chrétiens du IVe
                siècle, il estimait que le baptême constituait un nouveau tournant dans la vie, une nouvel élan vers la
                sainteté. En plein XXe siècle, il faisait revivre le catéchuménat.
            </p>
            <p>
                Mais il devait y avoir une autre cause encore à sa temporisation : son identité juive. L&#39;élément
                russe l&#39;emportait chez Fondaminski sur l&#39;élément juif, tant du point de vue de la culture que du
                caractère moral. Mais il y avait place en lui pour la judéité. Sans se préoccuper particulièrement des
                problèmes propres à celle-ci, il ne voulait pas rompre ses liens avec le peuple juif, et en premier lieu
                avec le cercle d&#39;amis, de parents et de proches pour qui religion et identité nationale étaient
                indissolublement liées. Même des « agnostiques » ne lui aurait pas pardonné son baptême, où ils auraient
                vu une trahison. La tragédie religieuse du judaïsme lui était rendue particulièrement sensible par la
                situation de sa femme, Amalia Osipovna, chrétienne de conviction comme lui, mais dont les liens de sang
                avec le judaïsme étaient plus forts que les siens. L&#39;amour passionné qu&#39;elle éprouvait pour sa
                mère, une juive orthodoxe, lui rendait impossible le baptême, même après la mort de celle-ci : A.O. ne
                voulait pas se séparer de sa mère même dans l&#39;au-delà. Tel devait aussi être le drame religieux
                d&#39;E.I. Ce drame rappelle beaucoup celui de Péguy, ce catholique orthodoxe et fervent, qui
                jusqu&#39;à l&#39;approche de la mort ne pouvait aller à la messe pour ne pas abandonner ses amis
                incroyants, cet « ordre » de l&#39;intelligentsia radicale auquel il appartenait. Au demeurant,
                Fondaminski n&#39;abordait jamais ce motif secret de son catéchuménat. Et toujours il alléguait son
                indignité.
            </p>

            <h3>L&#39;œuvre d&#39;Élie Fondaminsky</h3>
            <p>
                E.I. Fondaminski ne fut pas un penseur de premier plan. Sa personnalité reste beaucoup plus marquante
                que ses écrits. Cependant sa pensée travaillait constamment, infatigablement et avec abnégation et il
                prendra sans nulle doute sa place dans l&#39;histoire de la pensée sociale russe. Il reçut en partage ce
                qui fut la tâche de sa vie, à savoir de jeter un pont entre le mouvement révolutionnaire des narodnik et
                le christianisme. La tâche n&#39;était pas aisée, dans la mesure où il souhaitait rester un activiste
                social et non se réfugier, comme beaucoup d&#39;autres l&#39;avaient fait après avoir essuyé un
                naufrage, dans une religion du salut personnel. Il ne s&#39;engagea pas non plus aveuglément sur les
                traces d&#39;un des nouveaux chefs de file socialistes de l&#39;orthodoxie tels que Boulgakov ou
                Berdiaev. Il cherchait son propre chemin.
            </p>
            <p>
                Fondaminski n&#39;avait guère de facilité pour l&#39;écriture. C&#39;était un orateur né, et la plus
                grande partie de ce qu&#39;il a écrit, constitue la notation d&#39;un discours intérieur ininterrompu.
                Il écrivait peu au demeurant, préférant se faire le promoteur de la pensée des autres ou de la pensée
                commune. On peut étudier ses idées en se référant à son grand travail inachevé intitulé Les Chemins de
                la Russie, qui fut publié dans les Notes contemporaines, ainsi qu&#39;à ses articles dans la revue La
                Cité nouvelle (Новый град) (1931-1939).
            </p>
            <p>
                Les Chemins de la Russie sont consacrés au passé. Il s&#39;agit d&#39;un essai d&#39;analyse de
                l&#39;idéologie politique qui fut au fondement de l&#39;édification de l&#39;État russe. E.I. mena son
                enquête jusqu&#39;au XIXe siècle, restant toujours dans la sphère d&#39;une seule idée : l&#39;idée
                autocratique russe.
            </p>
            <p>
                Tout comme les eurasiens, avec Danilevski et Spengler, Fondaminski affirmait l&#39;opposition
                fondamentale de la Russie et de l&#39;Europe. Il rangeait la Russie dans la sphère culturelle de
                l&#39;Orient avec l&#39;Égypte et la Chine. Le Royaume Moscovite était pour lui la plus haute
                manifestation de l&#39;idée russe dans le passé, et dans l&#39;autocratie il voyait la foi politique du
                peuple russe. Cette conception de l&#39;autocratie lui avait été inspirée par les slavophiles russes,
                qu&#39;il vénérait profondément, comme les pères du mouvement narodnik russe. Dans les sources
                historiques, principalement du XVIIe siècle, il avait puisé un très grand nombre de matériaux en vue de
                caractériser l&#39;idéal du souverain moscovite, père du peuple, défenseur des orphelins et des
                opprimés. La valeur scientifique de ce travail était minée par sa partialité. Fondaminski ne pouvait
                voir et étudier qu&#39;un seul aspect de la réalité, et il n&#39;avait dans sa palette que des couleurs
                sans nuances. Mais après Tikhomirov, de la Liberté du peuple, c&#39;est Fondaminski, le socialiste
                révolutionnaire, qui réunit le matériau le plus riche pour la compréhension du l&#39;esprit de
                l&#39;autocratie russe.
            </p>
            <p>
                Tout comme les eurasiens, avec Danilevski et Spengler, Fondaminski affirmait l&#39;opposition
                fondamentale de la Russie et de l&#39;Europe. Il rangeait la Russie dans la sphère culturelle de
                l&#39;Orient avec l&#39;Égypte et la Chine. Le Royaume Moscovite était pour lui la plus haute
                manifestation de l&#39;idée russe dans le passé, et dans l&#39;autocratie il voyait la foi politique du
                peuple russe. Cette conception de l&#39;autocratie lui avait été inspirée par les slavophiles russes,
                qu&#39;il vénérait profondément, comme les pères du mouvement narodnik russe. Dans les sources
                historiques, principalement du XVIIe siècle, il avait puisé un très grand nombre de matériaux en vue de
                caractériser l&#39;idéal du souverain moscovite, père du peuple, défenseur des orphelins et des
                opprimés. La valeur scientifique de ce travail était minée par sa partialité. Fondaminski ne pouvait
                voir et étudier qu&#39;un seul aspect de la réalité, et il n&#39;avait dans sa palette que des couleurs
                sans nuances. Mais après Tikhomirov, de la Liberté du peuple, c&#39;est Fondaminski, le socialiste
                révolutionnaire, qui réunit le matériau le plus riche pour la compréhension du l&#39;esprit de
                l&#39;autocratie russe.
            </p>
            <p>
                Tout comme les eurasiens, avec Danilevski et Spengler, Fondaminski affirmait l&#39;opposition
                fondamentale de la Russie et de l&#39;Europe. Il rangeait la Russie dans la sphère culturelle de
                l&#39;Orient avec l&#39;Égypte et la Chine. Le Royaume Moscovite était pour lui la plus haute
                manifestation de l&#39;idée russe dans le passé, et dans l&#39;autocratie il voyait la foi politique du
                peuple russe. Cette conception de l&#39;autocratie lui avait été inspirée par les slavophiles russes,
                qu&#39;il vénérait profondément, comme les pères du mouvement narodnik russe. Dans les sources
                historiques, principalement du XVIIe siècle, il avait puisé un très grand nombre de matériaux en vue de
                caractériser l&#39;idéal du souverain moscovite, père du peuple, défenseur des orphelins et des
                opprimés. La valeur scientifique de ce travail était minée par sa partialité. Fondaminski ne pouvait
                voir et étudier qu&#39;un seul aspect de la réalité, et il n&#39;avait dans sa palette que des couleurs
                sans nuances. Mais après Tikhomirov, de la Liberté du peuple, c&#39;est Fondaminski, le socialiste
                révolutionnaire, qui réunit le matériau le plus riche pour la compréhension du l&#39;esprit de
                l&#39;autocratie russe.
            </p>
            <p>
                Tout comme les eurasiens, avec Danilevski et Spengler, Fondaminski affirmait l&#39;opposition
                fondamentale de la Russie et de l&#39;Europe. Il rangeait la Russie dans la sphère culturelle de
                l&#39;Orient avec l&#39;Égypte et la Chine. Le Royaume Moscovite était pour lui la plus haute
                manifestation de l&#39;idée russe dans le passé, et dans l&#39;autocratie il voyait la foi politique du
                peuple russe. Cette conception de l&#39;autocratie lui avait été inspirée par les slavophiles russes,
                qu&#39;il vénérait profondément, comme les pères du mouvement narodnik russe. Dans les sources
                historiques, principalement du XVIIe siècle, il avait puisé un très grand nombre de matériaux en vue de
                caractériser l&#39;idéal du souverain moscovite, père du peuple, défenseur des orphelins et des
                opprimés. La valeur scientifique de ce travail était minée par sa partialité. Fondaminski ne pouvait
                voir et étudier qu&#39;un seul aspect de la réalité, et il n&#39;avait dans sa palette que des couleurs
                sans nuances. Mais après Tikhomirov, de la Liberté du peuple, c&#39;est Fondaminski, le socialiste
                révolutionnaire, qui réunit le matériau le plus riche pour la compréhension du l&#39;esprit de
                l&#39;autocratie russe.
            </p>
            <p>
                Tout comme les eurasiens, avec Danilevski et Spengler, Fondaminski affirmait l&#39;opposition
                fondamentale de la Russie et de l&#39;Europe. Il rangeait la Russie dans la sphère culturelle de
                l&#39;Orient avec l&#39;Égypte et la Chine. Le Royaume Moscovite était pour lui la plus haute
                manifestation de l&#39;idée russe dans le passé, et dans l&#39;autocratie il voyait la foi politique du
                peuple russe. Cette conception de l&#39;autocratie lui avait été inspirée par les slavophiles russes,
                qu&#39;il vénérait profondément, comme les pères du mouvement narodnik russe. Dans les sources
                historiques, principalement du XVIIe siècle, il avait puisé un très grand nombre de matériaux en vue de
                caractériser l&#39;idéal du souverain moscovite, père du peuple, défenseur des orphelins et des
                opprimés. La valeur scientifique de ce travail était minée par sa partialité. Fondaminski ne pouvait
                voir et étudier qu&#39;un seul aspect de la réalité, et il n&#39;avait dans sa palette que des couleurs
                sans nuances. Mais après Tikhomirov, de la Liberté du peuple, c&#39;est Fondaminski, le socialiste
                révolutionnaire, qui réunit le matériau le plus riche pour la compréhension du l&#39;esprit de
                l&#39;autocratie russe.
            </p>

            <h3>L&#39;humanisme de Fondaminski</h3>

            <p>
                Dans le champ large de la culture, et non de la politique, Fondaminski donnait à son idéal le nom
                d&#39;humanisme. Ce n&#39;était bien sûr qu&#39;un malentendu sémantique, très fréquent dans notre
                milieu. Nous confondons l&#39;humanisme avec l&#39;humanité, et considérons l&#39;homme non pas comme un
                être créatif, mais comme un être souffrant. L&#39;humanisme se confond avec l&#39;enseignement du Sermon
                sur la Montagne, mais il faut en même temps en exclure les humanistes de la Renaissance qui lui ont
                donné son nom, tout comme les grands humanistes de notre temps : Goethe, Nietzsche, Viatcheslav Ivanov.
                En revanche, s&#39;y trouvent inclus Belinski et Dobrolioubov, Dickens et Nekrasov. L&#39;humanisme de
                Fondaminski était d&#39;ordre purement éthique, dans le prolongement de la tradition panmoraliste des
                narodnik russes. Fondaminski n&#39;était pas pour autant étranger à toute culture esthétique. On pouvait
                le rencontrer à un concert ou dans une exposition artistique. Il appréciait l&#39;art sincèrement, et
                ses jugements, toujours modestes, ne montraient pas trop d&#39;incompétence. Cependant le principe
                esthétique n&#39;avait pas trouvé de place dans sa vision du monde. Il est probable que ni Nietzshe ni
                les décadents n&#39;avaient jamais touché son âme, et n&#39;avaient en rien entamé son intégrité morale.
                Là était sa force et son bonheur. Réconcilier Nietzsche avec le Christ, tâche à laquelle s&#39;était
                attelé Berdiaev, était incomparablement plus difficile à accomplir, que ce ne l&#39;était avec Nekrasov.
                Mais l&#39;univers de Fondaminski s&#39;en trouvait resserré, on y respirait une atmosphère confinée.
                Malgré l&#39;attraction qu&#39;exerçait sur lui le monde contemporain et l&#39;avenir, toute sa figure
                était celle d&#39;un autre âge : l&#39;ombre portée du XIXe siècle.
            </p>
            <p>
                L&#39;humanisme tel que le comprenait Fondaminski était certainement d&#39;origine chrétienne, et
                pourtant, selon lui, il avait été réalisé ou du moins manifesté au monde par la Révolution française.
                Étrange égarement, partagé par beaucoup. En ce sens, Fondaminski, qui n&#39;avait pas étudié
                l&#39;histoire de l&#39;Europe d&#39;aussi près que celle de la Russie, resta fidèle aux illusions de sa
                jeunesse. Mais il se rendait bien compte qu&#39;à mesure que s&#39;y perdait la foi monarchique, la
                Russie devenait l&#39;arène du combat entre l&#39;autocratie et les idéaux de liberté, d&#39;égalité et
                de fraternité. Personnellement, dans la dernière moitié de sa vie, Fondaminski fut non pas tant un
                combattant qu&#39;un héraut de cet humanisme révolutionnaire. Il observait dans sa patrie le naufrage de
                ses idéaux dans les flammes d&#39;une révolution totalitaire, mais ne désespérait pas. Il connut une
                expérience encore plus amère : il voyait trahir son humanisme par la jeunesse de l&#39;émigration, à
                l&#39;éducation de laquelle il avait consacré tant de forces. Ils l&#39;aimaient ; ils aimaient
                l&#39;entendre parler du christianisme, du socialisme, de l&#39;autocratie ; mais ils se bouchaient les
                oreilles quand il leur parlait de liberté. Privé de liberté, l&#39;idéal n&#39;était plus qu&#39;une
                variante russe du fascisme, qui infestait tous les nouveaux courants révolutionnaires. Fondaminski
                voyait cela, mais ne désespérait pas. Il avait sa propre philosophie de l&#39;histoire, dans laquelle il
                est aisé de voir les traces des lettres historiques de
                <Tooltip disableFocusListener title={longText9} classes={{ tooltip: classes.customWidth }}>
                <a>Lavrov</a></Tooltip>. Luttant contre le
                marxisme et toute forme de matérialisme historique, Fondaminski revenait à la foi en la force invincible
                des idées et de leurs porteurs : les personnalités héroïques. N&#39;importe quelle idée peut conquérir
                le monde, dans quelques circonstances historiques que ce soit. Il suffit pour cela de la foi vigoureuse
                d&#39;un groupe d&#39;hommes unis autour de cette idée et prêts à la mettre en œuvre. La victoire en
                Russie de Lénine en dépit de toutes les lois économiques, en dépit du bon sens, confortait, selon
                Fondaminski, sa doctrine. Il aimait dire que dans les années 90, le parti bolchévique tout entier aurait
                pu prendre place sur un seul divan. Il croyait que les quelques jeunes gens qu&#39;il asseyait de réunir
                autour de lui pourront avec le temps changer le destin de la Russie, et peut être du monde. Mais
                l&#39;adhésion intellectuelle ne suffisait pas. L&#39;efficacité d&#39;une idée dépend de
                l&#39;enthousiasme de ceux qui la portent et une grande part du travail de Fondaminski était consacrée à
                la « culture de l&#39;enthousiasme ».
            </p>
            <p>
                Contrairement au Lénine des années 90, comme de toutes les autres années d&#39;ailleurs, Fondaminski
                accordait moins de prix à la pureté des principes et à la qualité du choix, qu&#39;à la portée de son
                œuvre de propagande. Il entrait en contact avec tous les groupements politiques et culturels qui le
                toléraient, tout en organisant les siens propres. Sans même parler de la revue Notes contemporaines
                (Современные записки), dont il fut l&#39;un des rédacteurs, il travaillait dans les cercles de
                l&#39;Action Chrétienne des Étudiants Russes, puis de l&#39;Action Orthodoxe; fréquentait le RDO, les
                petits-russiens, le Club Post-révolutionnaire de 
                <Tooltip disableFocusListener title={longText10} classes={{ tooltip: classes.customWidth }}>
                <a>Chirinski-Chikhmatov</a></Tooltip>; donnait même des
                conférences à l&#39;Union de la Noblesse (Союз дворян). Cette liste n&#39;épuise en aucun cas
                l&#39;ensemble des organisations et des cercles dans lesquels Fondaminski investissait ses efforts
                inlassables. Après avoir fondé La Cité Nouvelle, il cherchait à en faire le centre de son activité
                organisationnelle. Selon ses conceptions, autour de La Cité Nouvelle et à partir de ses idées devaient
                se créer par branches professionnelles, parmi les enseignants, les ingénieurs, les médecins, les
                écrivains, des groupes d&#39;intellectuels qui se prépareraient en vue d&#39;un travail public en
                Russie. De ces projets, un seul vit le jour : le Cercle des jeunes écrivains (ou plutôt poètes). De
                toutes les catégories professionnelles, les poètes sont les moins adaptés au rôle de réformateurs et
                d&#39;hommes publics. Mais ils étaient attirés par Fondaminski, car ils trouvaient auprès de lui une foi
                et une chaleur humaine capables de les réchauffer dans le froid glacial de Montparnasse. Chez certains
                naissait le désir de trouver une issue hors de leur état d&#39;anarchie intérieure dans un idéal
                positif, qu&#39;il fût social ou religieux. Fondaminski en a aidé plus d&#39;un à se trouver, à garder
                pied dans la débâcle. Mais son action publique ne connut pas le succès. Il tenta de choisir parmi les
                membres du Cercle un petit groupe de personnes partageant les idées de la Cité Nouvelle et disposés à
                travailler pour elles, mais dès le début le noyau du l&#39;ordre futur manqua d&#39;unité. Quand la
                guerre éclata, le groupe se disloqua ; beaucoup tombèrent sous le charme du fascisme moscovite. Quand
                l&#39;on considère l&#39;œuvre de Fondaminski objectivement et sous son aspect public, on doit constater
                qu&#39;elle sombra dans l&#39;échec. Au sujet de Fondaminski, on pourrait employer ces mots d&#39;un
                ancien auteur russe : il sema comme sur de l&#39;eau. Mais les résultats extérieurs ne sauraient mesurer
                l&#39;effet d&#39;une parole soutenue par une conviction de feu et par l&#39;amour. On voudrait croire
                que ceux des « patriotes soviétiques » qui furent un temps les disciples et les auditeurs d&#39;E.I., ne
                sont plus capables de devenir de bons tchéquistes. Le malheur historique de Fondaminski est de
                n&#39;avoir pas vécu assez longtemps pour faire la rencontre de la nouvelle jeunesse soviétique qui a «
                choisi la liberté ». En lui, ces jeunes gens auraient trouvé le guide qu&#39;ils cherchent avec tant de
                passion, tandis que lui aurait trouvé en eux l&#39;armée de la Cité Nouvelle qui aurait pu - qui sait ?
                - conquérir une nouvelle Russie.
            </p>

            <h3>Le martyre</h3>
            <p>
                Ce patient et valeureux combat défensif contre le chaos fut soumis à rude épreuve. La mort de sa femme
                fut pour E.I. un coup terrible. Quelques années plus tard, il avouait un jour qu&#39;il avait perdu tout
                goût pour les joies de l&#39;existence ; que même la nature qui lui procurait auparavant tant de
                consolation, lui pesait désormais. Cependant il ne laissait rien paraître de la profonde blessure que
                lui avait infligée cette perte. Il ne se referma pas et ne se fit pas même moins sociable. Il se réfugia
                entièrement dans le travail. L&#39;activité publique fut dès lors toute sa vie : il n&#39;avait plus de
                vie personnelle. C&#39;est là-dessus que le destin lui asséna un second coup, qui l&#39;acheva. Le
                chaos, en apparence, triomphait.
            </p>
            <p>
                Aussi russe qu&#39;il fût, Fondaminski aimait la France : il en aimait la terre merveilleuse, les gens,
                simples, intelligents et bons. C&#39;était, pour lui, sur cette terre qu&#39;était née la religion
                humaniste. Il n&#39;y avait pas d&#39;autre Europe à ses yeux. Quand les armées d&#39;Hitler
                renversèrent comme du carton les lignes de défense françaises, Fondaminski en fut presque malade,
                physiquement. Il ne dormait pas la nuit, ne pouvait plus dissimuler son état d&#39;accablement. La
                défaite de la France signifiait pour lui la fin de la guerre. Il ne croyait pas en l&#39;Angleterre, ne
                la connaissant d&#39;ailleurs pas. La déroute militaire marquait le triomphe définitif du mal sur terre,
                du moins dans les limites de notre époque historique. Quelle souffrance dut endurer E.I. au moment où se
                rompait le dernier fil qui le reliait au monde de la culture, sans doute même à la terre elle-même !
                Combien de fois a-t-il dû répéter : « Mon Dieu, pourquoi m&#39;as-tu abandonné ? »
            </p>
            <p>
                Rentré dans le Paris allemand après s&#39;être réfugié pour l&#39;été à Arcachon (1940), Fondaminski
                réfléchit longtemps et douloureusement à la question de savoir s&#39;il devait rester ou partir pour
                l&#39;Amérique, où s&#39;étaient enfui ou s&#39;apprêtaient à s&#39;enfuir la plus part de ses amis
                issus du camp socialiste. Mais fuir n&#39;avait de sens que pour continuer le combat. Il n&#39;en avait
                pas la force et il n&#39;y croyait plus. Les difficultés de la fuite - et dans quel but ? pour assurer
                sa propre survie ? - semblaient insurmontables. Dans cette irrésolution et dans cette absence de
                volonté, E.I. produisait l&#39;impression pitoyable d&#39;un homme anéanti. « Méprisé et humilié plus
                que tous les fils de l&#39;homme. » Et cependant ce n&#39;est tout de même pas par faiblesse que E.I.
                demeura à Paris, où il était en danger de mort. Ce qui l&#39;emporta fut, je pense, une décision libre.
                Tous ses amis n&#39;étaient pas en Amérique. Les activistes étaient partis, mais d&#39;autres étaient
                restés, avec lesquels il pouvait prier et parler des choses dernières : Mère Marie (Skobtsov), ses amis
                de la Maison de l&#39;Orthodoxie : Motchulski, Berdiaev et combien d&#39;autres. Dans les derniers
                jours, face à la mort, E.I. sentit que ce monde lui était plus proche que celui de l&#39;action
                publique, même chrétienne, à laquelle il avait consacré sa vie.
            </p>
            <p>
                Fondaminski fut arrêté avec les russes en juillet 1941, quand commença la guerre avec l&#39;URSS, mais
                il fut maintenu en détention (à Compiègne) avec les juifs, alors que la plupart des russes avaient déjà
                été libérés. On dit qu&#39;il lui fallut subir dans le camp une dernière épreuve : l&#39;antisémitisme
                de ses compatriotes, qui ne s&#39;adoucissait pas même devant le sort d&#39;innocents condamnés sans
                défense. Mais sa captivité fut partagée par des amis-chrétiens, grâce auxquels nous savons combien il
                s&#39;est raffermi et combien il a grandi en ces temps terribles. Manifestement il avait accepté la mort
                et s&#39;était préparé à elle. Il écrivait même alors à sa sœur qu&#39;il vivait le meilleur moment de
                son existence : « Je me sens très bien, et cela fait longtemps, longtemps que je ne m&#39;étais senti
                aussi tranquille, gai et même heureux. » Ce fut aussi l&#39;impression de sa sœur qui réussit à obtenir
                une entrevue avec lui (en février 1942) : «
                 <Tooltip disableFocusListener title={longText11} classes={{ tooltip: classes.customWidth }}>
                <a> Il est en bonne humeur, même heureux</a></Tooltip> » Dans le camp, Élie Isidorovitch travaillait beaucoup ; il fit même des
                conférences pour ses camarades de détention. C&#39;est alors qu&#39;il se décida aussi à recevoir le
                baptême. Aucune pression ne fut exercée sur lui. Ce fut au contraire au prêtre qui le baptisa de
                ressentir son ascendant, sa supériorité spirituelle et même théologique. Ce prêtre racontait que
                lorsqu&#39;après le baptême, il célébrait la liturgie au cours de laquelle E.I. devait communier pour la
                première fois, les soldats allemands firent irruption au milieu de l&#39;office et interrompirent la
                célébration, car l&#39;église du camp devait fermer. Le sacrement fut achevé en dehors de l&#39;église,
                dans un baraquement. C&#39;est ainsi que le vieux clandestin rencontra clandestinement son Christ.
            </p>
            <p>
                Pour déterminer avec précision la signification de la mort de Fondaminski, il convient de se souvenir
                qu&#39;elle fut pour partie volontaire. L&#39;occasion d&#39;assurer son salut s&#39;était présentée à
                lui. Tombé gravement malade, il fut transféré à l&#39;hôpital. L&#39;évasion était possible et des amis
                (des socialistes, cette fois) se proposaient pour l&#39;organiser. Mais Fondaminski refusa. Il motiva
                son refus par son désir de partager le sort des juifs condamnés. Dans ses derniers jours, il voulait
                vivre avec les chrétiens et mourir avec les juifs, rachetant ainsi, peut-être, la souffrance qu&#39;il
                leur avait involontairement infligée par son baptême.
            </p>
            <p>
                La mort de Fondaminski restera sans doute à jamais enveloppée de mystère. Il fut emmené en Allemagne, où
                ses traces se perdent. On ne connaît même pas le camp où il rencontra sa fin. Ses proches et ses amis
                ont pendant des années espéré son salut. La rumeur disait qu&#39;il avait été transféré en Russie ;
                certains ont même entendu sa voix à la radio. Cependant sa mort est indubitable. Le gouvernement
                français informa la famille de la date exacte : le 19 novembre 1942. Des détails extérieurs peuvent-ils
                ajouter quelque chose au sens de son sacrifice terrible et glorieux ? Non pas des milliers, mais des
                millions d&#39;êtres humains ont emprunté le même chemin vers le Golgotha, mais peu sont morts
                volontairement afin de partager les souffrances de leur peuple (même s&#39;il n&#39;était le sien
                qu&#39;à moitié).
            </p>
            <p>
                La mort librement acceptée, apparemment injustifiée et sans but, le refus de défendre sa vie face aux
                assassins - « tel l&#39;agneau immaculé, sans voix devant celui qui le tond » - est l&#39;expression
                russe de l&#39;imitation kénotique du Christ. Par sa non-résistance, l&#39;ancien révolutionnaire, lion
                devenu agneau, se faisait le disciple - en avait-il lui- même conscience ? - du premier saint russe, le
                prince Boris.
            </p>
            <p>
                Le kénotisme religieux russe, a dès les premiers jours du christianisme en Russie, trouvé une double
                issue à sa soif d&#39;exploit ascétique : l&#39;abaissement social, fondé sur la charité, ainsi que la
                mort volontaire et sacrificielle. Des siècles plus tard, dans la culture athée du XIXe siècle, le
                mouvement des narodnik russes (la même kénose, essentiellement), suivant inconsciemment la voix de la
                conscience d&#39;un peuple encore chrétien, trouvait son accomplissement dans ces deux démarches. En la
                personne d&#39;E.I. Fondaminski, le mouvement des narodnik paya avec surplus sa dette historique à
                l&#39;Église.
            </p>
        </div>
    );
}
