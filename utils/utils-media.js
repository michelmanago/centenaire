
/**
 * #
 * # CONSTANTS
 * #
 */
/** ACCEPTABLES FILES */

const MEDIA_TYPES = {
    IMAGE: "IMAGE",
    VIDEO: "VIDEO",
    DOCUMENT: "DOCUMENT",
}

// ## IMAGE
const ACCEPTABLE_TYPE_IMAGE = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/webp",
    "image/webp",
    "image/webp",
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

    return files

}

// check if this file is acceptable
export function isValidImage(accepts, mimetype) {
    
    const acceptableFiles = getValidFileTypes(accepts)

    return acceptableFiles.includes(mimetype)

}

// get file type
export function getFileType(mimetype){

    // images
    if(ACCEPTABLE_TYPE_IMAGE.includes(mimetype)){
        return "image"
    }

    else if(ACCEPTABLE_TYPE_VIDEO.includes(mimetype)){
        return "video"
    }

    else if(ACCEPTABLE_TYPE_DOCUMENT.includes(mimetype)){
        return "document"
    }

    else {
        return null
    }

}