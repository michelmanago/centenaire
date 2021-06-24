const MAX_RECURSIVE_FETCH_SLUG = 40

export default function getAvailableSlug(slugString, tryCount = 1){

    if(tryCount > MAX_RECURSIVE_FETCH_SLUG){
        return Date.now();
    }

    const slugQuery = slugString + (tryCount > 1 ? `-${tryCount}` : "")
    const url = new URL(window.location.origin + "/api/page")
    url.searchParams.append("slug", slugQuery)

    return fetch(url.toString())
    .then(response => {
        if(response.ok){
            return response.json()
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(body => {
        
        if(!body || (body && Array.isArray(body) && !body.length)){
            // console.log("available", slugQuery)
            return slugQuery
        } else {
            
            // console.log("not available", slugQuery)
            return getAvailableSlug(slugString, tryCount + 1)
        }

    })
    .catch(err => {
        console.log(err)
    })

}