

// libs
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import DefaultErrorPage from 'next/error'
import Head from "next/head"

// component
import Header from '../components/header/header';
import PageDefault from '../components/page-template/PageDefault';
import PageWithCategory from '../components/page-template/PageWithCategory';

// model
import {getMenu} from '../model/menu';
import { getPageBySlug } from '../model/page';

// utils
import { getMediaLink } from '../utils/utils-serveur-image';

const NavCompositeur = dynamic(() => import('../components/compositeurs/nav'));


// styles
const bannerStyles = {
    height: 360
}



export default function DynPage({ menu, page}) {
    
    // redirect 404
    if(!page){
        return <DefaultErrorPage statusCode={404} />
    }

    // Lifecycle
    useEffect(() => {

        // hack for dev
        window.EDIT_THIS_PAGE = `${window.location.origin}/admin/page/${page.originalPageId}`
        
    }, [])


    // utils
    const renderPage = page => {

        const hasCategory = !!page.page


        if(hasCategory){
            return <PageWithCategory key={page.id} page={page}/>
        } 

        else {
            return <PageDefault key={page.id} page={page}/>
        }

    }

    // hooks

    return (
        <div>
            <Head>
                <title>{page && page.pageName}</title>
                
            </Head>

            <Header menu={menu.data} translations={page.translations}/>


            {/* Banner */}
            {page.bandeau && (
                <div style={bannerStyles} className="">
                    <img
                        className="block object-cover w-full h-full"
                        src={getMediaLink(page.bandeau.public_path)}
                        alt=""
                    />
                </div>
            )}

            <main className="max-w-screen-xl px-5 py-10 mx-auto bg-white border">

                {
                    renderPage(page)
                }
                
            </main>

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
    const page = await getPageBySlug(context.locale + "/" + pageSlug, "render").catch(err => null);

    return {
        props: {
            page, menu 
        },
        
        revalidate: 10,
    };
    
    
}

