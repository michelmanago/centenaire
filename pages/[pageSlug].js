

// libs
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router';

// component
import Header from '../components/header/header';
import PageTemplate from '../components/page-template/PageTemplate';

// model
import {getMenu} from '../model/menu';
import { getPageBySlug } from '../model/page';

const NavCompositeur = dynamic(() => import('../components/compositeurs/nav'));

export default function DynPage({ menu, page}) {

    if(!page){
        return <DefaultErrorPage statusCode={404} />
    }

    // Lifecycle
    useEffect(() => {

        // hack for dev
        window.EDIT_THIS_PAGE = `${window.location.origin}/admin/page/${page.id}`
        
    }, [])


    // utils
    const pageType = page && page.page


    // hoooks
    const router = useRouter()


    return (
        <div>
            <Header menu={menu.data} />


            <main className="border max-w-screen-xl mx-auto py-10 px-10 bg-white">

                {/* Page - NO TYPE */}
                {
                    page && !pageType && <PageTemplate page={page}/>
                }

            </main>



            {/* <div className="max-w-screen-xl pt-5 mx-auto bg-white shadow md:flex md:flex-wrap">
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
                    <div>Page Dynamique {pageSlug}</div>
                )}
            </div> */}
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

    const {pageSlug} = context.params;

    const menu = await getMenu(context.locale);
    const page = await getPageBySlug(context.locale + "/" + pageSlug).catch(err => null);

    console.log("back p ", page)

    return {props: {page, menu}};
}

