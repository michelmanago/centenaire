import { insertMediaPage, deleteMediaPage } from '../dao/media_page'
import { query } from '../lib/db'

// dao

export async function attributeMediaToPage(media_id, page_id){

    const res = await insertMediaPage(media_id, page_id)
    
    return res
}

export async function dissociateMediaFromPage(media_id, page_id){

    const res = await deleteMediaPage(media_id, page_id)
    
    return res
}