import { getFileType } from "../utils-media"
import { getServerImageEndpoint } from "../utils-serveur-image"

export default async function fetchCreateMedia(file, defaultLegende, originalPageId){

    try {

        const serverImageEndpoint = getServerImageEndpoint()

        // form
        const formdata = new FormData()
        formdata.append("file", file, file.name)
        formdata.append("legende", JSON.stringify(defaultLegende))
        // get type
        const fileType = getFileType(file.type)
        formdata.append("type", fileType)
        formdata.append("page_id", originalPageId)

        // Fetch
        let results = null
        const response = await fetch(serverImageEndpoint, {
            method: "POST",
            body: formdata
        })

        // Decode
        if(response.ok){
            results = await response.json()
        } else {
            throw new Error(response.statusText);
        }

        return results

    } catch (error) {
        console.log(error)
        return false
    }
}