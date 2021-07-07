// libs
import { useEffect, useState } from "react"
import Popup from "reactjs-popup"

// components
import ModalMediaList from "./list/ModalMediaList"
import ModalMediaUpload from "./upload/ModalMediaUpload"

// utils
import fetchMediaList from "../../utils/fetch/fetchMediaList"


// styles
const contentStyles = {
    width: "85%",
    borderRadius: ".2em"
}
const tabContentStyles = {
    height: 500
}


export default function ModalMedia({opened}){

    // states
    const [tab, setTab] = useState(TAB_UPLOAD)

        // list section
        const [list, setList] = useState([])
        const [edited, setEdited] = useState(null)

    // utils

    // methods
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
                return <ModalMediaList edited={edited} setEdited={setEdited} list={list}/>
            break;
            default:
                return ""
            
        }
    }

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
        >
            <div className="">
                
                {/* Header */}
                <div className="px-5 pt-2">

                    <h1 className="text-3xl font-medium mb-5">Ajouter un média</h1>

                    {/* Tabs */}
                    <div className="">
                        <TabItem isCurrent={tab === TAB_UPLOAD} onClick={() => setTab(TAB_UPLOAD)} label="Téléverser des fichiers"/>
                        <TabItem isCurrent={tab === TAB_MEDIA_LIST} onClick={() => setTab(TAB_MEDIA_LIST)} label="Médiathèque"/>
                    </div>

                </div>

                {/* Body */}

                <div style={tabContentStyles} className="border-2">
                    {
                        renderTabContent()
                    }
                </div>

                
            </div>
        </Popup>
    )

}

const TAB_UPLOAD = "TAB_UPLOAD"
const TAB_MEDIA_LIST = "TAB_MEDIA_LIST"
const TabItem = ({label, onClick, isCurrent}) => <button className={`px-3 py-2 border-l-2 border-t-2 border-r-2 border-transparent ${isCurrent ? " border-gray-200 " : ""}`} onClick={onClick}>{label}</button>