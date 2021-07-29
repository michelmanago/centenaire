
export default async function fetchUpdateMedia(media_id, fields){

    try {

        let results = null

        // Fetch
        const response = await fetch("/api/media/" + media_id, {

            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fields)
        })

        // Decode
        if(response.ok){
            results = await response.json()
        } else {
            throw new Error(response.statusText);
        }

        // Receive results
        return results

    } catch (error) {
        console.log("FetchUpdateMedia", error)
        throw new Error(error)
    }


}