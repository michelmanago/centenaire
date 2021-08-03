export async function fetchMediaList(page_id = null){

    const url = new URL(window.origin + "/api/media")

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
        console.log("fetchMediaList", error)
        return []
    }

}