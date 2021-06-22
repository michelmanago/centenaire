// libs
import {useSession} from 'next-auth/client';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

// utils
import cleanForSlug from '../../utils/cleanForSlug';
import checkSlugExistance from '../../utils/checkSlugExistance';
import Utils from '../../utils/utils';

// components
import CustomEditor from '../Slate/customEditor';
import {blockSample} from '../../utils/pageBlockUtils';
import CarouselEditor from './carousel-editor';

const categories = [
    {
        title: 'Compositeurs',
        value: 'compositeurs',
    },

    {
        title: 'Paroisses',
        value: 'paroisses',
    },
];

export default function PageEditor({onFormSubmitted, editedPage}) {
    // others
    const isEditing = !!editedPage;

    // hooks
    const {defaultLocale, locales, locale} = useRouter();
    const [session] = useSession();

    // States
    // form
    const [title, setTitle] = useState(editedPage ? editedPage.pageName : '');
    const [slug, setSlug] = useState(editedPage ? editedPage.pageSlug : '');
    const [category, setCategory] = useState(editedPage ? editedPage.page || '' : '');
    const [language, setLanguage] = useState(editedPage ? editedPage.language : defaultLocale);
    const [author, setAuthor] = useState(editedPage ? editedPage.author : '');

    const [blocks, setBlocks] = useState(editedPage ? editedPage.blocks : []);
    const [content, setContent] = useState(editedPage ? editedPage.blockcontent : '');

    // const [canSave, setCanSave] = useState(false)

    // methods
    const onSubmit = async () => {
        let checkedSlug = slug;
        if (!editedPage || editedPage.slug != slug) {
            checkedSlug = await checkSlugExistance(slug);
        }

        onFormSubmitted({
            title: title,
            slug: checkedSlug,
            content: content,
            category: category,
            language: language,
            author: author,
            blocks: blocks,
        });
    };

    const onChangeTitle = e => {
        setTitle(e.target.value);

        setSlug(cleanForSlug(e.target.value));
    };

    // others
    const languagesLists = locales.map(_locale => ({title: _locale.toUpperCase(), value: _locale}));
    const pageLink = editedPage ? Utils.getPagePermalink(editedPage.pageSlug, editedPage.language) : null;

    const DisplayBlocks = lang => {
        let blockToDisplay = blocks.filter(block => block.lang === lang);

        return blockToDisplay.map((block, index) => (
            <div key={block.id ? block.id : index}>
                <BlockEdit block={block} />
            </div>
        ));
    };

    const addBlock = type => {
        var newBlocks = blocks.slice();
        newBlocks.push(blockSample(0, language, type));
        setBlocks(newBlocks);
    };

    return (
        <div className="flex p-8 bg-white border gap-x-8">
            {/* Left */}
            <div className="flex-1 w-2/5">
                {/* Mode de page */}
                <h1 className="mb-5 text-4xl font-bold">
                    {isEditing ? 'Modifier la page' : 'Ajouter une nouvelle page'}
                </h1>

                {/* Title */}
                <input
                    onChange={onChangeTitle}
                    value={title}
                    className="w-full px-5 py-4 mb-5 border rounded"
                    type="text"
                    placeholder="Titre de la page"
                />

                {/* Slug */}
                {slug && <InputSlug slug={slug} setSlug={setSlug} />}

                <AddBlock addBlock={addBlock} />

                {blocks && DisplayBlocks(language)}

                {/* Content */}
                {/*<CustomEditor block={content} setContent={setContent} />*/}
            </div>

            {/* Right */}

            <div className="w-2/5">
                {/* Block langues */}
                <PageBlock title="Langues">
                    <select
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        className="w-full px-4 py-3 border rounded"
                    >
                        {languagesLists.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </PageBlock>

                {/* Block publier */}
                <PageBlock title="Publier">
                    {/* Author */}
                    <div className="flex items-center w-full my-2">
                        <label className="mr-3 text-lg font-semibold" htmlFor="inputAuthor">
                            Auteur :{' '}
                        </label>
                        <input
                            className="flex-1 px-3 py-1 border rounded"
                            id="inputAuthor"
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                        />
                    </div>

                    {/* Created at */}
                    {isEditing && (
                        <>
                            <div className="flex items-center my-2">
                                <p className="mr-3 font-semibold text-md" htmlFor="inputAuthor">
                                    Date de publication :{' '}
                                </p>
                                <p className="text-md">
                                    {editedPage.created_at
                                        ? new Date(editedPage.created_at).toLocaleString(locale)
                                        : ''}
                                </p>
                            </div>

                            <div className="flex items-center my-2">
                                <p className="mr-3 font-semibold text-md" htmlFor="inputAuthor">
                                    Dernière modification :{' '}
                                </p>
                                <p className="text-md">
                                    {editedPage.last_modified
                                        ? new Date(editedPage.last_modified).toLocaleString()
                                        : ''}
                                </p>
                            </div>
                        </>
                    )}

                    {/* Permalink */}
                    {pageLink && (
                        <div>
                            <a target="_blank" className="text-blue-500 underline" href={pageLink}>
                                Lien vers la page
                            </a>
                        </div>
                    )}

                    {/* Publier */}
                    <div className="flex justify-end">
                        <button
                            onClick={onSubmit}
                            className="w-full px-3 py-2 mt-10 font-semibold text-white bg-blue-700 rounded hover:bg-blue-800"
                        >
                            {isEditing ? 'Mettre à jour' : 'Sauvegarder'}
                        </button>
                    </div>
                </PageBlock>

                {/* Block categorie */}
                <PageBlock title="Catégories">
                    {/* categorie */}
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full px-4 py-3 border rounded"
                    >
                        <option disabled value="">
                            {' '}
                            -- Selectionner une catégorie --{' '}
                        </option>
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </PageBlock>
            </div>
        </div>
    );
}

const PageBlock = ({title, children}) => {
    return (
        <div className="py-3 mb-5 border rounded-sm">
            {/* Header */}
            <div className="px-4 pb-2 mb-4 border-b">
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>

            {/* Block */}
            <div className="px-4">{children}</div>
        </div>
    );
};

const AddBlock = ({addBlock}) => {
    const [type, setType] = useState('text');
    return (
        <div>
            <div>Ajouter un Bloc</div>
            <select
                className="px-1 mx-1 border rounded"
                defaultValue={type}
                onChange={e => setType(e.currentTarget.value)}
            >
                <option value="">--- Block Type ---</option>
                <option value="text">Text</option>
                <option value="carousel">Carousel</option>
            </select>
            <button className="px-1 mx-1 border rounded cursor-pointer" onClick={() => addBlock(type)}>
                Ajouter
            </button>
        </div>
    );
};

const BlockEdit = ({block}) => {
    //const [type, setType] = useState(block.type ? block.type : 'text');
    const [content, setContent] = useState(block.content ? block.content : '');
    return (
        <div>
            {block.type === 'text' && (
                <div>
                    <CustomEditor block={content} setContent={setContent} />
                </div>
            )}
            {block.type === 'carousel' && <CarouselEditor block={content} setContent={setContent} />}
        </div>
    );
};

const InputSlug = ({slug, setSlug}) => {
    // state
    const [opened, setOpened] = useState(false);
    const [origin, setOrigin] = useState('');

    // effects
    // find app url
    useEffect(() => {
        setOrigin(window.location.origin);
    }, [slug]);

    // helpers

    // methods
    const onSubmit = async () => {
        const cleanedSlug = cleanForSlug(slug);
        const checkedSlug = await checkSlugExistance(cleanedSlug);

        setSlug(checkedSlug);
        setOpened(false);
    };

    return (
        <div className="flex items-center mb-6 ">
            {/* Label */}
            <label className="w-1/5 mr-5 font-semibold" htmlFor="inputSlug">
                Permalien :{' '}
            </label>

            {/* Input container */}
            <div className={`border rounded px-3 py-2 w-full ${opened ? 'border-blue-500' : ''}`}>
                {/* Label */}
                <label htmlFor="inputSlug" className="text-gray-500">
                    {origin + '/'}
                </label>

                {/* Input */}
                <input
                    disabled={!opened}
                    onChange={e => setSlug(e.target.value)}
                    value={slug}
                    id="inputSlug"
                    className="w-1/2 outline-none"
                    type="text"
                    placeholder="le-titre-de-ma-page"
                />
            </div>

            {/* Actions */}
            <div className="w-1/4 ml-3">
                {/* When closed */}
                {!opened && (
                    <button
                        onClick={() => setOpened(true)}
                        className="w-full px-2 py-1 text-white bg-blue-500 border rounded"
                    >
                        Modifier
                    </button>
                )}

                {/* When open */}
                {opened && (
                    <>
                        <button onClick={onSubmit} className="px-2 py-1 text-gray-500 border border-gray-500 rounded">
                            OK
                        </button>
                        <button onClick={() => setOpened(false)} className="px-2 py-1 underline">
                            Annuler
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
