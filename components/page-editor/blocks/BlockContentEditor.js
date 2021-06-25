
// libs
import { useState } from 'react';


// components
import CustomEditor from '../../Slate/customEditor';
import CarouselEditor from '../carousel-editor';


const IconArrowUp = () => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 14l5-5 5 5H7z"/></svg>
const IconArrowDown = () => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>

const ButtonPositionArrow = ({children, onClick}) => (
    <button className="" onClick={onClick}>
        {children}
    </button>
)

const BlockContentEditor = ({type, position ,content, setContent, removeBlockContent, setBlockPosition}) => {
    
    return (
        <div className="mb-6 border-r-4 pr-5 flex flex-col items-end">

            {/* Position */}
            <div class="border mb-3 flex">
                {/* Up */}
                <ButtonPositionArrow onClick={() => setBlockPosition(- 1)}><IconArrowUp/></ButtonPositionArrow>
                <span className="w-6 flex justify-center items-center">{position}</span>
                {/* Down */}
                <ButtonPositionArrow onClick={() => setBlockPosition(+ 1)}><IconArrowDown/></ButtonPositionArrow>
            </div>

            {/* Remove */}
            <button onClick={removeBlockContent} className="flex text-red-600 hover:text-red-700 items-center justify-center mb-3">
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </button>
            
            {/* Block */}
            <div className="border w-full">

                {/* Fallback */}
                

                {/* HTML EDITOR */}
                {(type === 'text' && position) && (
                    // <div>
                    //     <CustomEditor block={content} setContent={setContent} />
                    // </div>
                    <textarea className="w-full h-20" onChange={e => setContent(e.target.value)} value={content} name="" id="" cols="30" rows="10"></textarea>
                )}

                {/* CAROUSEL */}
                {type === 'carousel' && <CarouselEditor block={content} setContent={setContent} />}
            </div>
        </div>
    );
};

export default BlockContentEditor