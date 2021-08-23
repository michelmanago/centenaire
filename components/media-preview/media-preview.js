// utils
import { getMediaLink } from "../../utils/utils-serveur-image";

// icons
import IconDocument from "../icons/IconDocument";
import IconHeadphone from "../icons/IconHeadphone";
import IconUnknown from "../icons/IconUnknown";
import IconVideo from "../icons/IconVideo";


export default function MediaPreview({type, public_path}){

    const media_src = getMediaLink(public_path)

    switch(type){
        case "video":
            return (
                <div className="border relative rounded w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                    <IconVideo className={"relative z-10 w-24 text-gray-100"}/>
                    <video 
                        muted
                        src={media_src}
                        className="absolute w-full h-full object-cover"
                    ></video>
                </div>
            )
        break;
        case "image":
            return (
                <img className="block left-0 top-0 w-full h-full object-cover" src={media_src} />
            )
        break;
        case "document":
            return (
                <div className="border rounded w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                    <IconDocument className={"w-24 text-gray-100"}/>
                </div>
            )
        break;
        case "audio":
            return (
                <div className="border rounded w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                    <IconHeadphone className={"w-24 text-gray-100"}/>
                </div>
            )
        break;
        default:
            return (
                <div className="border rounded w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                    <IconUnknown className={"w-24 text-gray-100"}/>
                </div>
            )
    }
}