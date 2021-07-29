
export default async function fetchMediaList(page_id = null, accepts, get_associated_page = false){


    const url = new URL(window.origin + "/api/media")

    if(page_id){
        url.searchParams.append("page", page_id)
    }

    if(get_associated_page){
        url.searchParams.append("get_associated_page", true)
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