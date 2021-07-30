
export default async function fetchMediaList(page_id, with_pages = false, pageOffset = 0){


    const url = new URL(window.origin + "/api/media")

    // pagination
    url.searchParams.append("page_offset", pageOffset)

    // of page
    if(page_id){
        url.searchParams.append("page_id", page_id)
    }

    if(with_pages){
        url.searchParams.append("with_pages", true)
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
        console.log("fetchMediaList", error)
        throw new Error(error.message)
    }

}