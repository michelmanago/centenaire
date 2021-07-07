
export default async function fetchUpdateMedia(media_id, fields){

    try {

        console.log(fields)

        
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
        return true

    } catch (error) {
        console.log("FetchUpdateMedia", error)
    }


}