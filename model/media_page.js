import { insertMediaPage, deleteMediaPage, selectMediaPage } from '../dao/media_page'

// dao

export async function getMediaPage(media_id, page_id){

    const res = await selectMediaPage(media_id, page_id)
    
    return res
}

export async function attributeMediaToPage(media_id, page_id){

    const association = await getMediaPage(media_id, page_id)

    // media must not be already associated to this page
    if(!association){
        const res = await insertMediaPage(media_id, page_id)
    }
}

export async function dissociateMediaFromPage(media_id, page_id){

    const res = await deleteMediaPage(media_id, page_id)
    
    return res
}