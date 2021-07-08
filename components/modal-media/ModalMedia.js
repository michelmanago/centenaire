// libs
import { useEffect, useState } from "react"
import Popup from "reactjs-popup"

// components
import ModalMediaList from "./list/ModalMediaList"
import ModalMediaUpload from "./upload/ModalMediaUpload"

// utils
import fetchMediaList from "../../utils/fetch/fetchMediaList"

// icons
import IconClose from "../icons/IconClose"


// styles
const contentStyles = {
    width: "85%",
    borderRadius: ".2em"
}
const tabContentStyles = {
    height: 500
}


export default function ModalMedia({opened, onClose, onMediaSelected, submitLabel}){

    // states
    const [tab, setTab] = useState(TAB_MEDIA_LIST)

        // list section
        const [list, setList] = useState([])
        const [edited, setEdited] = useState(null)

    // utils

    const deleteMediaFromList = mediaId => {

        // remove this media from list
        setList(list.filter(l => l.id !== mediaId))

        // if this media was selected -> unselected it
        if(edited && edited.id === mediaId){
            setEdited(null)
        }
    }

    // methods

    const onSubmitMedia = () => {
        onMediaSelected(edited)
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
                return <ModalMediaUpload onMediaUploaded={onMediaUploaded}/>
            break;
            case TAB_MEDIA_LIST:
                return <ModalMediaList deleteMediaFromList={deleteMediaFromList} edited={edited} setEdited={setEdited} list={list}/>
            break;
            default:
                return ""
            
        }
    }
    const canSubmit = !!edited

    // lifecycle
    useEffect(async () => {

        console.log("fetchMediaList")
        const media = await fetchMediaList(null)
        setList(media)

    }, [])


    return (
        <Popup 
            lockScroll={true}
            open={opened}
            contentStyle={contentStyles}
            onClose={onClose}
        >
            <div className="relative">

                {/* Close */}
                <button onClick={onClose} className="absolute text-gray-700 hover:text-gray-800 right-0 top-0">
                    <IconClose/>
                </button>

                {/* Header */}
                <div className="px-5 pt-2">

                    <h1 className="text-3xl font-medium mb-3">Ajouter un média</h1>

                    {/* Tabs */}
                    <div className="">
                        <TabItem isCurrent={tab === TAB_UPLOAD} onClick={() => setTab(TAB_UPLOAD)} label="Téléverser des fichiers"/>
                        <TabItem isCurrent={tab === TAB_MEDIA_LIST} onClick={() => setTab(TAB_MEDIA_LIST)} label="Médiathèque"/>
                    </div>

                </div>

                {/* Body */}

                <div style={tabContentStyles} className="border-2 pb-16">
                    {
                        renderTabContent()
                    }
                </div>

                {/* Bottom */}
                <div className="absolute border-t-2 border-gray-300 bottom-0 left-0 w-full bg-white h-16 py-2 px-3 flex">

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

const TAB_UPLOAD = "TAB_UPLOAD"
const TAB_MEDIA_LIST = "TAB_MEDIA_LIST"
const TabItem = ({label, onClick, isCurrent}) => <button className={`px-3 py-2 border-l-2 border-t-2 border-r-2 border-transparent ${isCurrent ? " border-gray-200 " : ""}`} onClick={onClick}>{label}</button>