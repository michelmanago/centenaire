// libs
import {useEffect, useState} from 'react';

// components
import CustomEditor from '../../text-editor/customEditor';
import CarouselEditor from '../carousel-editor';
import IconArrowDown from '../../icons/IconArrowDown';
import IconArrowUp from '../../icons/IconArrowUp';

const ButtonPositionArrow = ({children, onClick}) => (
    <button className="" onClick={onClick}>
        {children}
    </button>
);

const BlockContentEditor = ({
    type,
    position,
    content,
    setContent,
    removeBlockContent,
    setBlockPosition,
    originalPageId,
    addAttributedMedia,
    currentPage,
}) => {
    const [isRender, setIsRender] = useState(true);
    useEffect(() => {
        setIsRender(false);
        setTimeout(() => setIsRender(true), 1000);
    }, [])
    return (
        <div className="flex flex-col items-end pr-5 mb-10 border-r-4">
            {/* Position */}
            <div className="flex mb-3 border">
                {/* Up */}
                <ButtonPositionArrow onClick={() => setBlockPosition(-1)}>
                    <IconArrowUp />
                </ButtonPositionArrow>
                <span className="flex items-center justify-center w-6">{position}</span>
                {/* Down */}
                <ButtonPositionArrow onClick={() => setBlockPosition(+1)}>
                    <IconArrowDown />
                </ButtonPositionArrow>
            </div>

            {/* Remove */}
            <button
                onClick={removeBlockContent}
                className="flex items-center justify-center mb-3 text-red-600 hover:text-red-700"
            >
                <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
            </button>

            {/* Block */}
            <div className="w-full">
                {/* Fallback */}

                {/* HTML EDITOR */}
                {type === 'text' && isRender && position && (
                    <div>
                        <CustomEditor
                            originalPageId={originalPageId}
                            block={content}
                            setContent={setContent}
                            addAttributedMedia={addAttributedMedia}
                            currentPage={currentPage}
                        />
                    </div>
                    //<textarea className="w-full h-20" onChange={e => setContent(e.target.value)} value={content} name="" id="" cols="30" rows="10"></textarea>
                )}

                {/* CAROUSEL */}
                {type === 'carousel' && (
                    <CarouselEditor
                        originalPageId={originalPageId}
                        content={content}
                        setContent={setContent}
                        addAttributedMedia={addAttributedMedia}
                    />
                )}
            </div>
        </div>
    );
};

export default BlockContentEditor;
