import React, {useRef, useEffect, useState} from 'react';

import Editor from './Editor';
import SlateHtmlEditor from './slateHtmlEditor';

import 'reactjs-popup/dist/index.css';

export default function CustomEditor({block, setContent}) {
    const [isSlateView, setIsSlateView] = useState(true);
    const changeView = event => {
        event.preventDefault();
        setIsSlateView(!isSlateView);
    };
    return (
        <div className="">
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
                        {/*<Editor block={block} setContent={setContent} defuntId={defuntId} />*/}
                        <Editor document={block} onChange={setContent} />
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
