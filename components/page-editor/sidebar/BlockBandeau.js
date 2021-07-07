// libs

import { useEffect, useState } from "react";

// utils
import { getMediaLink, getServeurImageMedia } from "../../../utils/utils-serveur-image";

// components
import ModalMedia from "../../modal-media/ModalMedia";
import PageEditorSidebarBlock from "./page-editor-sidebar-block";


export default function BlockBandeau({updatePages, addAttributedMedia, bandeau_id}){

    // states
    const [opened, setOpened] = useState(false)
    const [src, setSrc] = useState("")

    // methods
    const onMediaSelected = media => {

        const media_id = media.id

        // close
        setOpened(false)

        // add to bandeau
        updatePages({
            bandeau_id: media_id
        })

        // add to attributed media
        addAttributedMedia(media_id)
    }
    const onRemove = () => {
        updatePages({bandeau_id: null})
    }


    // lifecycle

    useEffect(() => {

        // load image
        if(bandeau_id){

            getServeurImageMedia(bandeau_id)
            .then(media => {
                setSrc(getMediaLink(media.public_path))
            })

        } else {
            setSrc("")
        }

    }, [bandeau_id])

    return (
        <PageEditorSidebarBlock title="Bandeau de page">

            {/* MODE - CREATE */}
            <div style={{display: bandeau_id ? "none" : ""}}>
                <button onClick={() => setOpened(true)} className="text-blue-500 underline">Ajouter une image</button>
                <ModalMedia
                    opened={opened}
                    onClose={() => setOpened(false)}
                    onMediaSelected={onMediaSelected}
                    submitLabel="Définir comme image de bandeau"
                />
            </div>

            {/* MODE - EDIT */}
            <div style={{display: bandeau_id ? "" : "none"}}>
                {/* The image */}
                {src && <img className="block object-contain w-full rounded-lg" src={src} alt="" />}

                <hr className="my-3"/>

                {/* Modifier */}
                <button type="button" onClick={() => setOpened(true)} className="block mt-2 text-blue-500 underline cursor-pointer">Modifier l'image</button>

                {/* Remove */}
                <button type="button" onClick={onRemove} className="text-red-500 underline">Supprimer l'image</button>
            </div>
        </PageEditorSidebarBlock>
    )

}