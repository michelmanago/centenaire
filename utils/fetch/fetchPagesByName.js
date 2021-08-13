
export default async function fetchPagesByName(name = ""){

    const url = new URL(window.origin + "/api/page/byname?name=" + name)

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