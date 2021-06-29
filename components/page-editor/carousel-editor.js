import {useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import PageEditorInputImage from './sidebar/PageEditorInputImage';

export default function CarouselEditor({content, setContent}) {
    const [open, setOpen] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [medias, setMedias] = useState(null);
    console.log(content);
    //const [localContent, setLocalContent] = useState(content ? content : [])

    const mediaUrl = `${process.env.NEXT_PUBLIC_SERVER_IMAGE}`;

    useEffect(async () => {
        if (!isLoading) {
            refreshMediaList();
            setIsLoading(true);
        }
    });

    const refreshMediaList = async () => {
        const res = await fetch('/api/media');
        const listMedia = await res.json();
        console.log(listMedia);
        setMedias(listMedia);
    };

    const addImg = media => {
        var newContent = content ? [...content] : [];
        newContent.push(media);
        //setLocalContent(newContent);
        setContent(newContent);
        setOpen(false);
    };
    const onMediaUploaded = () => {
        refreshMediaList();
    };
    const onRemoveMedia = () => {};
    return (
        <div>
            <div>Carousel Editor</div>
            <button
                onClick={e => {
                    e.preventDefault();
                    //console.log(editor);
                    setOpen(true);
                }}
            >
                Ajouter une image
            </button>
            <Popup
                open={open}
                position="top center"
                modal="true"
                closeOnDocumentClick
                onClose={e => {
                    setOpen(false);
                }}
            >
                <input
                    className="px-1 border border-black rounded"
                    type="text"
                    value={imgUrl}
                    placeholder="url de l'image"
                    onChange={e => {
                        setImgUrl(e.target.value);
                    }}
                />

                <PageEditorInputImage onMediaUploaded={onMediaUploaded} onRemoveMedia={onRemoveMedia} mediaId={null} />

                <div className="w-full my-2 border border-black"></div>

                {medias ? (
                    <div>
                        {medias.map(media => (
                            <img
                                className="w-40 cursor-pointer"
                                onClick={e => {
                                    addImg(media);
                                }}
                                src={`${mediaUrl}${media.public_path}`}
                                alt={media.public_path}
                                key={media.id}
                            />
                        ))}
                    </div>
                ) : null}

                <button className="px-1 text-black border border-black" onClick={addImg}>
                    Ajouter
                </button>
            </Popup>
            {content?.map(media => (
                <div key={media.id}>{media.public_path}</div>
            ))}
        </div>
    );
}
