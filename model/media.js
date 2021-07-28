import { query } from '../lib/db'

// dao
import { getMedias, putSingleMedia, selectSingleMedia } from '../dao/media'

export async function updateMedia(media_id, fields){

    // get the media
    const the_media = await getSingleMedia(media_id)

    // intersect with updated_fields
    if(fields.legende){
        fields.legende = JSON.stringify(fields.legende)
    }
    const new_media = Object.assign(the_media, fields)

    const res = putSingleMedia(media_id, new_media)

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