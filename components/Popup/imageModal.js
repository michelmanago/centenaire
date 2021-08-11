// libs
import { useState } from "react";
import Popup from "reactjs-popup";

// icons
import IconClose from "../icons/IconClose";

// styles
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };


export default function ImageModal({url, className, legende, credit}){

    return (
        <div>
            <Popup
                modal
                overlayStyle={overlayStyle}
                trigger={
                    <div className="">
                        {/* Image */}
                        <img 
                            src={url} 
                            className={`mx-auto ${className}`}
                            alt=""
                        />

                        {/* Info */}
                        {
                            (legende || credit) && (
                                <div className="mt-2">
                                    {legende && <p className='font-bold text-center'>{legende}</p>}
                                    {credit && <p className='italic text-center'>{credit}</p>}
                                </div>
                            )
                        }
                    </div>
                }
            >
               {
                    close => (
                        <ImageModalContainer
                            url={url}
                            legende={legende}
                            credit={credit}
                            close={close}
                        />
                    )
               }
            </Popup>
        </div>
    )
}

export const ImageModalContainer = ({url, legende, credit, close}) => {

    // states
    const [loaded, setLoaded] = useState(false)
    const [dimension, setDimension] = useState(null)

    // methods
    const onLoaded = event => {

        const image = event.target

        // data
        const width = image.naturalWidth
        const height = image.naturalHeight
        const aspectRatio = width / height


        // dimension
        // find the most suitable dimension for almost fullscreen image
        setDimension({
            width : (width > height) && "66vw",
            height: (width < height) && "76vh",
            aspectRatio: aspectRatio,
        })

        // now loaded
        setLoaded(true)

    }

    // others
    const styles = Object.assign({
        display: !loaded ? "none" : "",
    }, dimension && dimension)

    return (
        <div className="relative bg-gray-100">   

            {/* Close */}
            {
                close && (
                    <button onClick={close} type="button" className="text-red-500 bg-gray-100 p-1 rounded-full hover:opacity-50 opacity-90 absolute right-2 top-2">
                        <IconClose size={"35px"}/>
                    </button>
                )
            }

            {/* Image */}
            <img 
                style={styles} 
                src={url} 
                className={`mx-auto`}
                onLoad={onLoaded}
            />

            {/* Loading */}
            {
                !loaded && (
                    <div className="flex justify-center">
                        <svg className="w-44 h-44 text-gray-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )
            }
    
            {/* Info */}
            {
                (legende || credit) && (
                    <div className="mt-2">
                        {legende && <p className='font-bold text-center'>{legende}</p>}
                        {credit && <p className='italic text-center'>{credit}</p>}
                    </div>
                )
            }
        </div>
    )
}