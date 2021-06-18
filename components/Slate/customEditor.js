import React, {useRef, useEffect, useState} from 'react';


import SlateEditor from './slateEditor';
import SlateHtmlEditor from './slateHtmlEditor';

import 'reactjs-popup/dist/index.css';

export default function CustomEditor({block, setContent, defuntId}) {
    const [isSlateView, setIsSlateView] = useState(true);
    const changeView = event => {
        event.preventDefault();
        setIsSlateView(!isSlateView);
    };
    return (
        <div className="">
            {/*<Popup trigger={<button className='px-2 mb-2 border border-gray-900 rounded text-pdarkblue'> Trigger</button>} position="top center" modal="true">
                <div>Popup content here !!</div>
    </Popup>*/}

            {isSlateView ? (
                <>
                    <div className="flex justify-end">
                        <button
                            className="px-2 border-t border-l border-r border-gray-900 rounded-t text-pdarkblue"
                            onClick={changeView}
                        >
                            Editeur HTML
                        </button>
                        <button
                            className="px-2 ml-2 text-white bg-gray-400 border-t border-l border-r border-gray-900 rounded-t cursor-not-allowed"
                            onClick={changeView}
                            disabled
                        >
                            Editeur Visuel
                        </button>
                    </div>
                    <div className="bg-white border border-black h-screen-90">
                        <SlateEditor block={block} setContent={setContent} defuntId={defuntId} />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-end">
                        <button
                            className="px-2 text-white bg-gray-400 border-t border-l border-r border-gray-900 rounded-t cursor-not-allowed"
                            onClick={changeView}
                            disabled
                        >
                            Editeur HTML
                        </button>
                        <button
                            className="px-2 ml-2 border-t border-l border-r border-gray-900 rounded-t text-pdarkblue"
                            onClick={changeView}
                        >
                            Editeur Visuel
                        </button>
                    </div>
                    <div className="h-full bg-white border border-black">
                        <SlateHtmlEditor block={block} setContent={setContent} />
                    </div>
                </>
            )}
        </div>
    );
}
