// libs
import Head from "next/head"
import {getSession} from 'next-auth/client';

// model
import { getMenu } from "../../../model/menu"

// components
import Header from "../../../components/header/header"
import ListMedia from "../../../components/list-media/list-media";
import { getMedia } from "../../../model/media";
import { MEDIA_TYPES } from "../../../utils/utils-media";
import { getMediaLink } from "../../../utils/utils-serveur-image";

const defaultAccepts = Object.values(MEDIA_TYPES)


export default function PageMedia({menu, media}) {
    

    return (
        <>

            <Head>
                <title>Admin - Liste des media</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {menu && <Header menu={menu.data}/>}

            <ListMedia media={media}/>
        </>
    )
}

export async function getServerSideProps(context) {

    const {req, query} = context;

    // session
    const session = await getSession({req});


    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?redirect=admin/page`,
            },
        };
    }
    
    // query
    let pageOffset = context.query.offset
    pageOffset = pageOffset ? parseInt(pageOffset) : 0


    let associatedTo = context.query.page
    associatedTo = associatedTo ? parseInt(associatedTo) : null

    let mediaType = context.query.accepts

    const isFilteringNonAssociated = !(typeof query.with_no_page === "undefined")

    const menu = await getMenu(context.locale)
    const media = await getMedia(
        associatedTo, 
        pageOffset, 
        mediaType ? [mediaType] : defaultAccepts,
        isFilteringNonAssociated
    )
    
  
    return {props: {
      menu: menu,
      media,
    }}

}