// libs
import Popup from "reactjs-popup"
import useTranslation from 'next-translate/useTranslation'

// icons
import IconInfo from "../icons/IconInfo"

// utils
import { useRouter } from 'next/router';
import {truncateString} from "../../utils/utils"
import { legendeAsArray } from '../../utils/utils-media';

const wrapperStyles = {
    maxWidth: 400
}

const desktopPopupStyles = {
    minWidth: 400
}

export default function PageInfo(props) {

    return (
        <>

            {/* Mobile */}
            <div className="block md:hidden">
                <Popup
                    trigger={TriggerDOM}
                    modal
                >
                    <div className="">
                        <TooltipInner {...props} />
                    </div>
                </Popup>
            </div>

            {/* Destkop */}
            <div className="hidden md:block">
                <Popup
                    trigger={TriggerDOM}
                    on={["hover", "focus"]}
                    position={["right top"]}
                >
                    <div style={desktopPopupStyles} className="">
                        <TooltipInner {...props} />
                    </div>
                </Popup>
            </div>
        </>
    )

}

const TooltipInner = ({ media, author, created_at, last_modified, source }) => {

        // router
        const { locale } = useRouter();

        const {t} = useTranslation()

        // others
        const thereIsCredit = (media.length && media.some(m => m.credit))
        const creditsVideo = media.filter(m => m.type === "video")
        const creditsImage = media.filter(m => m.type === "image")
        const creditsDocument = media.filter(m => m.type === "document")
        const creditsAudio = media.filter(m => m.type === "audio")

    return (
        <div style={wrapperStyles} className="w-4/5 mx-auto bg-gray-100 px-5 py-5 shadow-md border rounded">

            {/* Date créate page*/}
            {created_at && (
                <div>
                    <p className="underline">{t("pageslug:page_info_created_at")}</p>
                    <p className="text-sm">{created_at ? new Date(created_at).toLocaleString(locale) : ''}</p>
                </div>
            )}

            {/* last date modified */}
            {last_modified && (
                <div>
                    <p className="underline">{t("pageslug:page_info_modified_at")}</p>
                    <p className="text-sm">{last_modified ? new Date(last_modified).toLocaleString(locale) : ''}</p>
                </div>
            )}

            {/* Source */}
            {source && (
                <div>
                    <p className="underline">{t("pageslug:page_info_source")}</p>
                    <p className="-mt-2">{source}</p>
                </div>
            )}

            {/* Auteur */}
            {author && (
                <div>
                    <p className="underline">{t("pageslug:page_info_author")}</p>
                    <p>{author}</p>
                </div>
            )}

            {/* Credits images */}
            {
                <ListCredtit media={creditsImage} title={t("pageslug:page_info_credit_photo")}/>
            }

            {/* Credits video */}
            {
                <ListCredtit media={creditsVideo} title={t("pageslug:page_info_credit_video")}/>
            }

            {/* Credits Audio */}
            {
                <ListCredtit media={creditsAudio} title={t("pageslug:page_info_credit_audio")}/>
            }

            {/* Credits document */}
            {
                <ListCredtit media={creditsDocument} title={t("pageslug:page_info_credit_document")}/>
            }
        </div>
    )
}

const ListCredtit = ({media, title}) => {


    // others
    const length = media.filter(m => m.credit).length
    const {locale} = useRouter()

    const getLocaleLegende = legendes => {
        // get legendes as Array of {legende<string>, value<string>}
        let arrayOfLegende = legendeAsArray(legendes);

        let localeLegende = arrayOfLegende ? arrayOfLegende.find(l => l.locale === locale) : null;
        return localeLegende ? localeLegende.value : '';
    };
 
    if(!length){
        return ""
    }

    return (
        <div className="mb-1">
            <p className="underline">{title}</p>
            <div className="max-h-44 overflow-auto">
                <ol className="pl-8 m-0">
                    {media.map(mediaItem => {
    
                        let legende = getLocaleLegende(mediaItem.legende)
                        legende = truncateString(legende, 25)

                        if(mediaItem.credit){
                            return (
                                <li key={mediaItem.id} className="mb-2 text-sm">
                                    {legende ? `${legende} : ` : ""}  {mediaItem.credit}
                                </li>
                            )
                        }
    
                    })}
                </ol>
            </div>
        </div>
    )
}


const TriggerDOM = () => {

    const {t} = useTranslation()

    return (
        <div className="border mb-3 px-4 py-1 border-gray-300 hover:bg-gray-200 rounded inline-flex items-center">
    
            {/* Icon */}
            <IconInfo />
    
            {/* Text */}
            <p className="pb-0 ml-3 text-sm md:text-md">{t("pageslug:page_info_label")}</p>
        </div>
    )
}