// get the full url for a media hosted on centenaire serveur image
export function getMediaLink(publicPath){
    return process.env.NEXT_PUBLIC_SERVER_IMAGE + publicPath
}

// the full url for centaire serveur image api
export function getServerImageEndpoint(){
    return  process.env.NEXT_PUBLIC_SERVER_IMAGE + "/centenaire/medias"
}

// fetch
export function getServeurImageMedia(mediaId){

    const endpoint = getServerImageEndpoint() + "/" + mediaId

    return fetch(endpoint)
    .then(response => {
        if(response.ok){
            return response.json()
        } else {
            throw new Error(response.statusText);
        }
    })
}