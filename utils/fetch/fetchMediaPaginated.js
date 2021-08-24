import { MEDIA_TYPES } from "../utils-media"

const allTypesMedia = Object.values(MEDIA_TYPES)

export default async function fetchMediaPaginated(pageOffset = 0, page_id, accepts = allTypesMedia, with_no_page = false){


    const url = new URL(window.origin + "/api/media")
    url.searchParams.append("page_offset", pageOffset)

    if(page_id){
        url.searchParams.append("page_id", page_id)
    }

    if(accepts){
        url.searchParams.append("accepts", accepts.join("-"))
    }

    if(with_no_page){
        url.searchParams.append("with_no_page")
    }

    try {
        
        let results = null

        // Fetch
        const response = await fetch(url.toString())

        // Decode
        if(response.ok){
            results = await response.json()
        } else {
            throw new Error(response.statusText);
        }

        // Receive results
        return results

    } catch (error) {
        throw new Error(error.message)
    }

}