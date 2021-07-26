// libs
import { useEffect, useState } from "react"
import Popup from "reactjs-popup"
import Proptypes from "prop-types"

// components
import ModalMediaList from "./list/ModalMediaList"
import ModalMediaUpload from "./upload/ModalMediaUpload"

// utils
import fetchMediaList from "../../utils/fetch/fetchMediaList"
import { MEDIA_TYPES } from "../../utils/utils-media"

// icons
import IconClose from "../icons/IconClose"


// styles
const contentStyles = {
    width: "85%",
    height: "80%",
    borderRadius: ".2em"
}

// all types
const defaultAccepts = Object.values(MEDIA_TYPES)
function ModalMedia({opened, onClose, onMediaSelected, submitLabel, preSelectedMedia, originalPageId, accepts = defaultAccepts}){

    // states
    const [tab, setTab] = useState(TAB_MEDIA_LIST)

        // list section
        const [list, setList] = useState([])
        const [edited, setEdited] = useState(null)
    const [hasModified, setHasModified] = useState(false)

    // utils

    const deleteMediaFromList = mediaId => {

        // remove this media from list
        setList(list.filter(l => l.id !== mediaId))

        // if this media was selected -> unselected it
        if(edited && edited.id === mediaId){
            setEdited(null)
        }
    }

    const updateMediaFromList = newMedia => {

        // update this media
        setList(list.map(l => l.id === newMedia.id ? newMedia : l))
    }

    // methods

    const onChangeTab = tab => {

        if(!hasModified || (hasModified && confirm("Êtes vous sûr de vouloir quitter l'édition du média sans sauvegarder vos modifications ?"))){
            setTab(tab)
            setHasModified(false)
        }

    }

    const onCloseModal = () => {

        if(!hasModified || (hasModified && confirm("Êtes vous sûr de vouloir quitter l'édition du média sans sauvegarder vos modifications ?"))){

            // reset modal
            setEdited(false)
            setTab(TAB_MEDIA_LIST)
            setHasModified(false)


            // call props.close()
            onClose()

        }
    }

    const onSubmitMedia = () => {

        if(!hasModified || (hasModified && confirm("Êtes vous sûr de vouloir quitter l'édition du média sans sauvegarder vos modifications ?"))){
            onMediaSelected(edited)
            setHasModified(false)

        }

    }

    const onMediaUploaded = media => {

        // change tab
        setTab(TAB_MEDIA_LIST)

        // add new media to list
        setList([
            media,
            ...list
        ])

        // select the media
        setEdited(media)
    }


    // others
    const renderTabContent = () => {
        switch(tab){
            case TAB_UPLOAD:
                return <ModalMediaUpload 
                            onMediaUploaded={onMediaUploaded}
                            accepts={accepts}
                            originalPageId={originalPageId}
                        />
            break;
            case TAB_MEDIA_LIST:
                return <ModalMediaList 
                        originalPageId={originalPageId} 
                        updateMediaFromList={updateMediaFromList} 
                        deleteMediaFromList={deleteMediaFromList} 
                        edited={edited} setEdited={setEdited} 
                        list={list}
                        accepts={accepts}
                        hasModified={hasModified}
                        setHasModified={setHasModified}
                    />
            break;
            default:
                return ""
            
        }
    }
    const canSubmit = !!edited

    // lifecycle
    useEffect(async () => {

        const media = await fetchMediaList(null, accepts)
        setList(media)

        // pre select a media
        if(preSelectedMedia){
            setEdited(media.find(m => m.id === preSelectedMedia))
        }

    }, [])

    return (
        <Popup 
            lockScroll={true}
            open={opened}
            contentStyle={contentStyles}
            onClose={onCloseModal}
            
            closeOnEscape={false} // because this event can not be prevented
            closeOnDocumentClick={false} // because this event can not be prevented
        >
            <div className="relative w-full h-full flex flex-col">

                {/* Close */}
                <button onClick={onCloseModal} className="absolute text-gray-700 hover:text-gray-800 right-0 top-0">
                    <IconClose/>
                </button>

                {/* Header */}
                <div className="px-5 pt-2">

                    <h1 className="text-3xl font-medium mb-3">Ajouter un média</h1>

                    {/* Tabs */}
                    <div className="">
                        <TabItem isCurrent={tab === TAB_UPLOAD} onClick={() => onChangeTab(TAB_UPLOAD)} label="Téléverser des fichiers"/>
                        <TabItem isCurrent={tab === TAB_MEDIA_LIST} onClick={() => onChangeTab(TAB_MEDIA_LIST)} label="Médiathèque"/>
                    </div>

                </div>

                {/* Body */}

                <div className="border flex-1 flex overflow-auto w-full">
                    <div className="flex-1">
                        {
                            renderTabContent()
                        }
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-300 w-full bg-white h-16 pt-2 px-3 flex">

                    {/* Submit main action */}
                    <button 
                        disabled={!canSubmit}
                        onClick={onSubmitMedia} 
                        className={`ml-auto font-medium text-lg bg-blue-600 h-full text-white px-5 rounded ${canSubmit ? "hover:bg-blue-700" : "opacity-50 cursor-not-allowed"} `}
                    >{submitLabel || "Valider"}</button>
                </div>

                
            </div>
        </Popup>
    )

}

ModalMedia.proptypes = {
    accepts: Proptypes.oneOf(["image", "video", "document"]),
}

const TAB_UPLOAD = "TAB_UPLOAD"
const TAB_MEDIA_LIST = "TAB_MEDIA_LIST"
const TabItem = ({label, onClick, isCurrent}) => <button className={`px-3 py-2 border-l-2 border-t-2 border-r-2 border-transparent ${isCurrent ? " border-gray-200 " : ""}`} onClick={onClick}>{label}</button>


export default ModalMedia