
export default async function fetchMediaList(page_id = null){

    let route = "/api/media"

    if(page_id){
        route += "?page=" + page_id
    }


    try {
        
        let results = null

        // Fetch
        const response = await fetch(route)


        // Decode
        if(response.ok){
            results = await response.json()
        } else {
            throw new Error(response.statusText);
        }

        // Receive results
        return results

    } catch (error) {
        console.log("AttributePageToMedia", error)
        return []
    }

}