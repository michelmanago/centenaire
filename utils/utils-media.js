
/**
 * #
 * # CONSTANTS
 * #
 */
/** ACCEPTABLES FILES */

export const MEDIA_TYPES = {
    IMAGE: "image",
    VIDEO: "video",
    DOCUMENT: "document",
    AUDIO: "audio",
}

const ACCEPTABLE_TYPE_IMAGE = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/webp",
    "image/webp",
    "image/webp",
]

const ACCEPTABLE_TYPE_AUDIO = [
    "audio/wave",
    "audio/wav",
    "audio/webm",
    "audio/ogg",
    "audio/mpeg",
    "audio/mp3",
    "audio/opus",
]

const ACCEPTABLE_TYPE_VIDEO = [
    "video/mp4",
    "video/mpeg",
    "video/webm",
    "video/ogg",
    "video/3gpp",
    "video/3gpp2",
    "video/x-msvideo",
    "video/ogg",
]

const ACCEPTABLE_TYPE_DOCUMENT = [
    "text/plain",
    "application/pdf",
    "application/zip",
]

/**
 * #
 * # FUNCTIONS
 * #
 */

// Array of valid mimtypes
export function getValidFileTypes(accepts){

    let files = []

    // images
    if(accepts.includes("image")){
        files.push(...ACCEPTABLE_TYPE_IMAGE)
    }

    if(accepts.includes("video")){
        files.push(...ACCEPTABLE_TYPE_VIDEO)
    }

    if(accepts.includes("document")){
        files.push(...ACCEPTABLE_TYPE_DOCUMENT)
    }

    if(accepts.includes("audio")){
        files.push(...ACCEPTABLE_TYPE_AUDIO)
    }

    return files

}

// check if this file is acceptable
export function isValidFileType(accepts, mimetype) {
    
    const acceptableFiles = getValidFileTypes(accepts)

    return acceptableFiles.includes(mimetype)

}

// get file type
export function getFileType(mimetype){

    // images
    if(ACCEPTABLE_TYPE_IMAGE.includes(mimetype)){
        return MEDIA_TYPES.IMAGE
    }

    else if(ACCEPTABLE_TYPE_VIDEO.includes(mimetype)){
        return MEDIA_TYPES.VIDEO
    }

    else if(ACCEPTABLE_TYPE_DOCUMENT.includes(mimetype)){
        return MEDIA_TYPES.DOCUMENT
    }

    else if(ACCEPTABLE_TYPE_AUDIO.includes(mimetype)){
        return MEDIA_TYPES.AUDIO
    }

    else {
        return null
    }

}


/** MISC */

/**
 * 
 * @param {String} legende - stringified array of object (medias.legende)
 * @returns {Array.<{locale: String, value: String}>|null}
 */
export function legendeAsArray(legende){

    let legendeArray = ""

    try {
        legendeArray = JSON.parse(legende) 
    } catch (error) {
        console.warn("ModalMediaListEdit : legende invalide")
    }

    return Array.isArray(legendeArray) ? legendeArray : []
}


export function getFilenameFromPath(media){

    const public_path = media.public_path

    if(public_path){

        const paths_as_array = public_path.split("/")
        const filename = paths_as_array[paths_as_array.length - 1]
        
        return filename
    }

    return "monFichier.png"
}

export function getLegendeFromLocal(legendes, local) {
    var legendesParse = [];
    if (legendes) {
        legendesParse = JSON.parse(legendes);
    }

    var legendeTmp = "";
    for (const legende of legendesParse) {
        if (legende.locale === local) {
            legendeTmp = legende.value;
            break;
        }
    }
    return legendeTmp;
}