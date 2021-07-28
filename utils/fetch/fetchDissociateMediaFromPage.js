export default async function fetchDissociateMediaFromPage(media_id, page_id){

    try {

        let results = null

        // Fetch
        const response = await fetch(`/api/media_page?media=${media_id}&page=${page_id}`, {
            method: "DELETE",
        })

        // Decode
        if(response.ok){
            results = await response.json()
        } else {
            throw new Error(response.statusText);
        }

        // Receive results
        return true

    } catch (error) {
        console.log("FetchDeleteMediaPage", error)
        return false
    }


}