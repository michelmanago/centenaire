
export default async function fetchMediaPaginated(pageOffset = 0, page_id){


    const url = new URL(window.origin + "/api/media")
    url.searchParams.append("page_offset", pageOffset)

    if(page_id){
        url.searchParams.append("page_id", page_id)
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