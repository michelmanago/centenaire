
export default async function fetchMediaPaginated(pageOffset = 0){


    const url = new URL(window.origin + "/api/media")
    url.searchParams.append("page_offset", pageOffset)

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