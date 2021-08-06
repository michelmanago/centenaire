import {useEffect, useRef} from 'react';
import {useState} from 'react';
import Popup from 'reactjs-popup';
import IconClose from '../icons/IconClose';

function getTimerEnd(url) {
    var value = '';
    if (url.includes('#')) {
        const [urlMedia, timer] = url.split('#');
        const [start, end] = timer?.split(',');
        value = end;
    }

    return value;
}

export default function VideoModal({url}) {
    const [open, setOpen] = useState(false);
    //const [timeEnd ,setTimeEnd] = useState(null);
    const videoRef = useRef();

    const end = getTimerEnd(url);

    return (
        <div>
            <div
                onClick={e => {
                    e.preventDefault();
                    setOpen(true);
                }}
                className="relative cursor-pointer"
            >
                {/* Icon */}
                <div className="hover:opacity-60 absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="50%" viewBox="0 0 24 24" width="50%" fill="#fff"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M9.5,16.5l7-4.5l-7-4.5V16.5z"/></g></svg>
                </div>

                {/* Video */}
                <video src={url}></video>
            </div>
            <Popup
                lockScroll={true}
                open={open}
                onClose={setOpen}
                className={'video-modal'}
                closeOnEscape={false} // because this event can not be prevented
                closeOnDocumentClick={false} // because this event can not be prevented
            >
                <div className="p-1 bg-white border rounded relative">
                    {/* Close */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-0 right-0 text-gray-700 hover:text-gray-800"
                    >
                        <IconClose />
                    </button>

                    
                    <video
                        ref={videoRef}
                        className="mt-6"
                        controls
                        src={url}
                        onPause={e => {
                            console.log('video pause');
                            console.log('event', e);
                            if (end && e.currentTarget.currentTime >= end) {
                                setTimeout(() => setOpen(false), 1000);
                            }
                        }}
                        autoPlay
                    ></video>
                </div>
            </Popup>
        </div>
    );
}
