import dynamic from 'next/dynamic';

import Header from '../components/header/header';
import {getMenu} from '../model/menu';
import {getPageByName, getPageByType} from '../model/page';

const NavCompositeur = dynamic(() => import('../components/compositeurs/nav'));

export default function DynPage({pageName, menu, pageData, listPage}) {
    return (
        <div>
            <Header menu={menu.data} />

            <div className="max-w-screen-xl pt-5 mx-auto bg-white shadow md:flex md:flex-wrap">
                {pageData && pageData.page === 'compositeur' && (
                    <div className="w-3/4 px-10 mx-auto md:w-1/4">
                        <NavCompositeur list={listPage} />
                    </div>
                )}

                {pageData && pageData.blockcontent ? (
                    <div className="md:w-3/4">
                        <div dangerouslySetInnerHTML={{__html: pageData.blockcontent}}></div>
                    </div>
                ) : (
                    <div>Page Dynamique {pageName}</div>
                )}
            </div>
        </div>
    );
}

export async function getStaticPaths({locales}) {
    // Call an external API endpoint to get posts
    //const defunts = await getDefunts(100, 0);
    //const posts = await res.json();

    // Get the paths we want to pre-render based on posts
    /*const paths = defunts.data.map(
        defunt => (
            {
                params: {id: defunt.id.toString()},
                locale: 'fr',
            },
            {
                params: {id: defunt.id.toString()},
                locale: 'en',
            },
            {
                params: {id: defunt.id.toString()},
                locale: 'ru',
            }
        ),
    );*/
    const paths = [];

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: 'blocking'};
}

export async function getStaticProps(context) {
    const {pageName} = context.params;
    const menu = await getMenu(context.locale);
    const pageData = await getPageByName(pageName);
    let listPage = null;
    if (pageData) {
        listPage = await getPageByType(pageData.page);
    }
    return {props: {pageName, menu, pageData, listPage}};
}
