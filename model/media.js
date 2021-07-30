
// dao
import { getMedias, putSingleMedia, selectSingleMedia } from '../dao/media'
import { attributeMediaToPage } from './media_page'

export async function updateMedia(media_id, fields){

    // get the media
    const the_media = await getSingleMedia(media_id)

    // legende as Array of Object (in order to be processed by dao)
    if(fields.legende){
        fields.legende = JSON.stringify(fields.legende)
    }

    // new media
    const new_media = Object.assign(the_media, fields)

    // update with new media
    await putSingleMedia(media_id, new_media)

    // associate media
    if(fields.page_id){
        await attributeMediaToPage(media_id, fields.page_id)

    }

    return the_media

}

export async function getSingleMedia(media_id){

    const the_media = await selectSingleMedia(media_id)

    if(!the_media){
        throw new Error("Le media n'existe pas.")
    }

    return the_media

}

export async function getMediaList(page_id, get_associated_page){

    const mediaList = await getMedias(page_id, get_associated_page)
    return mediaList

}