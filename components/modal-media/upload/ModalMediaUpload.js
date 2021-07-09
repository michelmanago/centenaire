// libs

import { useRouter } from "next/router";
import { useRef, useState } from "react"
import fetchCreateMedia from "../../../utils/fetch/fetchCreateMedia";
import { getValidFileTypes, isValidFileType } from "../../../utils/utils-media";

// utils


export default function ModalMediaUpload({onMediaUploaded, accepts, originalPageId}){

    // router
    const {locales} = useRouter()

    // ref
    const inputRef = useRef()

    // states
    const [loading, setLoading] = useState()

    // utils
    const resetInput = () => {
        if(inputRef && inputRef.current){
            inputRef.current.value = ""
        }
    }
    
    // methods
    const onFileChange = async event => {

        const input = event.target

        if (input.files && input.files[0]) {

            const file = input.files[0]

            if(isValidFileType(accepts, file.type)){

                // default .legende
                const defaultLegende = locales.map(locale => ({
                    locale,
                    value: ""
                }))

                const media = await fetchCreateMedia(file, defaultLegende, originalPageId)
                
                if(media){
                    // has just been uploaded so you dont filter it
                    // media.justUploaded = true

                    onMediaUploaded(media)
                } else {
                    alert("not ok")
                    resetInput()
                }

            } else {
                alert("Le format n'est pas accepté.")
                resetInput()
            }
        }

    }

    // others
    const acceptableFilesAttribute = getValidFileTypes(accepts).join(", ")

    // acceptable files string
    let acceptableFiles = acceptableFilesAttribute
    acceptableFiles = acceptableFiles.replace(/image\//g, ".") // images
    acceptableFiles = acceptableFiles.replace(/video\//g, ".") // video
    acceptableFiles = acceptableFiles.replace(/audio\//g, ".") // audio
    acceptableFiles = acceptableFiles.replace(/(?:file|application|text)\//g, ".") // document


    return (
        <div className="flex flex-col justify-center items-center h-full">

            <p className="text-2xl font-medium">Déposez vos fichiers pour les téléversez</p>
            <p>ou</p>

            {/* Input file */}
            <div className="border bg-gray-100 hover:bg-gray-200 relative w-1/3 cursor-pointer">

                {/* Real */}
                <input ref={inputRef} accepts={acceptableFilesAttribute} onChange={onFileChange} className="cursor-pointer absolute w-full h-full left-0 top-0 opacity-0" type="file" />

                {/* Fake */}
                <div className="pointer-events-none relative py-3 rounded text-center border border-blue-600 text-blue-600">Séléctionner des fichiers</div>
            </div>

            {/* Acceptable files */}
            <p className="text-sm mt-3 max-w-md text-center">Formats acceptés : {acceptableFiles}</p>
        </div>
    )

}
