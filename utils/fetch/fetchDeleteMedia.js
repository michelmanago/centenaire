import { getServerImageEndpoint } from "../utils-serveur-image";

export default async function fetchDeleteMedia(mediaId){

    try {

        let results = null

        // Fetch
        const response = await fetch(getServerImageEndpoint() + "/" + mediaId , {
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
        console.log("FetchDeleteMedia", error)
        return false
    }


}