// libs
import { useState } from "react"
import Popup from "reactjs-popup"

// components
import ModalMediaList from "./list/ModalMediaList"
import ModalMediaUpload from "./upload/ModalMediaUpload"

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
    const [tab, setTab] = useState(TAB_MEDIA_LIST)

    // utils

    // others
    const renderTabContent = () => {
        switch(tab){
            case TAB_UPLOAD:
                return <ModalMediaUpload/>
            break;
            case TAB_MEDIA_LIST:
                return <ModalMediaList/>
            break;
            default:
                return ""
            
        }
    }


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

                <div style={tabContentStyles} className="">
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