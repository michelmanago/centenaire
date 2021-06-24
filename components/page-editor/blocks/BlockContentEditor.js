
// components
import CustomEditor from '../../Slate/customEditor';
import CarouselEditor from '../carousel-editor';

const BlockContentEditor = ({type, content, setContent, removeBlockContent}) => {

    return (
        <div className="mb-6 border-r-4 pr-5">

            {/* Remove */}
            <button onClick={removeBlockContent} className="flex text-red-600 hover:text-red-700 items-center justify-center ml-auto mb-3">
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </button>
            
            {/* HTML EDITOR */}
            {type === 'text' && (
                <div>
                    <CustomEditor block={content} setContent={setContent} />
                </div>
            )}

            {/* CAROUSEL */}
            {type === 'carousel' && <CarouselEditor block={content} setContent={setContent} />}
        </div>
    );
};

export default BlockContentEditor