import {useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import IconArrowUp from '../icons/IconArrowUp';
import IconArrowDown from '../icons/IconArrowDown';
import Trash from '../icons/trash';
import PageEditorInputImage from './sidebar/PageEditorInputImage';
import ModalMedia from '../modal-media/ModalMedia';

export default function CarouselEditor({content, setContent}) {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    //const [localContent, setLocalContent] = useState(content ? content : [])

    const mediaUrl = `${process.env.NEXT_PUBLIC_SERVER_IMAGE}`;

    const updateLegende = value => {
        var newContent = content ? {...content} : {legende: '', data: []};
        newContent.legende = value;
        setContent(newContent);
    };
    const onMediaUploaded = media => {

        //refreshMediaList();
        var newContent = content ? {...content} : {legende: '', data: []};
        newContent.data.push(media);
        setContent(newContent);
        setOpen(false);
    };
    const onRemoveMedia = () => {};

    const updateMediaLegende = (mediaId, value) => {
        var newContent = {...content};
        newContent.data.forEach(media => {
            if (media.id === mediaId) {
                media.legende = value;
            }
        });
        setContent(newContent);
    };
    const moveMedia = (media, index, direction) => {
        const newPosition = index + direction;

        if (newPosition < content.data.length && newPosition > 0) {
            var newContent = {...content};
            newContent.data.splice(index, 1);
            newContent.data.splice(newPosition, 0, media);
            setContent(newContent);
        }
    };
    const removeMedia = index => {
        const res = window.confirm('Etes vous sur de vouloir supprimer cette photo ?');
        if (!res) return;
        var newContent = {...content};
        newContent.data.splice(index, 1);
        setContent(newContent);
    };

    return (
        <div>
            <div className="text-xl">Carousel</div>
            <div className="flex flex-row items-center gap-2 mt-1 mb-2">
                <button
                    className="px-1 text-white bg-blue-700 rounded hover:bg-blue-800"
                    onClick={e => {
                        e.preventDefault();
                        setOpen(true);
                    }}
                >
                    Ajouter
                </button>
                {content.data?.length ? (
                    <button
                        className="px-1 text-white bg-blue-700 rounded hover:bg-blue-800"
                        onClick={e => {
                            e.preventDefault();
                            setOpenUpdate(true);
                        }}
                    >
                        Modifier
                    </button>
                ) : null}
            </div>
            <ModalMedia 
                opened={open} 
                onClose={() => setOpen(false)} 
                onMediaSelected={onMediaUploaded}  
                submitLabel="Ajouter l'image au carousel"
                accepts={["image"]}
            />
            {/*<Popup
                open={open}
                position="top center"
                modal="true"
                closeOnDocumentClick
                nested
                onClose={e => {
                    setOpen(false);
                }}
            >
                <div className="flex flex-row-reverse mb-1">
                    <button
                        className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => setOpen(false)}
                    >
                        Fermer
                    </button>
                </div>
                <PageEditorInputImage onMediaUploaded={onMediaUploaded} onRemoveMedia={onRemoveMedia} mediaId={null} />
            </Popup>*/}
            <Popup
                open={openUpdate}
                position="top center"
                modal="true"
                closeOnDocumentClick
                onClose={e => {
                    setOpenUpdate(false);
                }}
            >
                <div className="flex flex-row-reverse mb-1">
                    <button
                        className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => setOpenUpdate(false)}
                    >
                        Fermer
                    </button>
                </div>
                <div className="flex flex-row justify-center text-xl">Modifier</div>
                <div className="flex flex-col overflow-y-auto max-h-96">
                    {content &&
                        content.data &&
                        content.data.map((media, index) => (
                            <div className="flex flex-row justify-center" key={media.id}>
                                <div className="w-2/6">
                                    <img
                                        className="w-40 h-auto mx-auto"
                                        src={`${mediaUrl}${media.public_path}`}
                                        alt={media.public_path}
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center w-3/6">
                                    <label htmlFor={`legende-${media.id}`}>legende</label>
                                    <input
                                        id={`legende-${media.id}`}
                                        className="w-full p-1 border border-black rounded"
                                        type="text"
                                        value={media.legende ? media.legende : ''}
                                        onChange={e => updateMediaLegende(media.id, e.currentTarget.value)}
                                    />
                                </div>
                                <div className='flex flex-row w-1/6'>
                                    <div className="flex flex-col items-center justify-center w-1/2">
                                        <div className="cursor-pointer" onClick={() => moveMedia(media, index, -1)}>
                                            <IconArrowUp />
                                        </div>
                                        <div>{index + 1}</div>
                                        <div className="cursor-pointer" onClick={() => moveMedia(media, index, 1)}>
                                            <IconArrowDown />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center w-1/2">
                                        <div onClick={() => removeMedia(index)}>
                                            <Trash className={'cursor-pointer'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </Popup>
            <div className="flex items-center gap-2 fle-row">
                <label className="1/4" htmlFor={`carousel-legende`}>
                    Legende
                </label>
                <input
                    id={``}
                    className="w-3/4 p-1 border border-black rounded"
                    type="text"
                    value={content.legende ? content.legende : ''}
                    onChange={e => updateLegende(e.currentTarget.value)}
                />
            </div>
            <div className="flex flex-col justify-center">
                <div>{content.data ? content?.data?.length : 0} Images</div>
            </div>
        </div>
    );
}
