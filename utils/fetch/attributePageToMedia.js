import fetchUpdateMedia from "./fetchUpdateMedia"

export default async function attributePageToMedia(page_id, media_id){

    return fetchUpdateMedia(media_id, {page_id})

}

export async function bulkAttributePageToMedia(page_id, media_ids){

    const promises = media_ids.map(id => attributePageToMedia(page_id, id))
    const results = await Promise.all(promises)
    return results

}