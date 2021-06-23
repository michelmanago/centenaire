// libs
import {useSession} from 'next-auth/client';
import {useRouter} from 'next/router';
import { useState } from 'react';

// utils
import cleanForSlug from '../../utils/cleanForSlug';
import checkSlugExistance from '../../utils/checkSlugExistance';
import Utils from '../../utils/utils';
import { pageFormat, blockFormat} from '../../utils/page-editor-formats';

// components
import CustomEditor from '../Slate/customEditor';
import CarouselEditor from './carousel-editor';
import InputSlug from './inputs/InputSlug';
import InputAddBlock from './inputs/InputAddBlock';
import PageEditorSidebar from './sidebar/page-editor-sidebar';



export default function PageEditor({onFormSubmitted, editedPage}) {


    // hooks
    const {defaultLocale, locales, locale} = useRouter();

    // States
    // form
    const [pages, setPages] = useState(editedPage ? editedPage : locales.map(_locale => pageFormat(_locale)))
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // utils
    const isEditing = !!editedPage;
    const currentPage = pages[currentPageIndex]
    const updateCurrentPage = (values) => {
        
        if(pages && pages.length){
            
            setPages(pages.map((page, pageIndex) => {

                if(pageIndex === currentPageIndex){
                    return {
                        ...currentPage,
                        ...values
                    }
                } else {
                    return page
                }
    
            }))
        }
        
    }

    // methods
    const onSubmitPage = async () => {


        setIsSubmitting(true)

        // if one slug of one page has been edited
            const promisesCheckSlugs = pages.map(page => checkSlugExistance(page.pageSlug))
            await Promise.all(promisesCheckSlugs)

        // send pages to form
        onFormSubmitted(pages);

        setIsSubmitting(true)
    };

    // others
    const languagesLists = locales.map(_locale => ({title: _locale.toUpperCase(), value: _locale}));


    // setters
    const setSlug = value => updateCurrentPage({pageSlug: value})
    const setTitle = e => updateCurrentPage({pageName: e.target.value, pageSlug: cleanForSlug(e.target.value)})
    const addBlockContent = type => {

        const newBlock = blockFormat(editedPage ? editedPage.id : null, currentPage.language, type)

        updateCurrentPage({
            blocks: [
                ...currentPage.blocks,
                newBlock
            ]
        })

    };

    // listeners
    const onChangeLanguage = e => setCurrentPageIndex(languagesLists.findIndex(v => v.value === e.target.value))


    return (
        <div className="flex p-8 bg-white border gap-x-8">

            {/* Left */}
            <div className="flex-1 w-2/5">

                {/* Mode de page */}
                <h1 className="mb-5 text-4xl font-bold">
                    {isEditing ? 'Modifier la page' : 'Ajouter une nouvelle page'}
                </h1>

                {/* Input - Title */}
                <input
                    onChange={setTitle}
                    value={currentPage.pageName}
                    className="w-full px-5 py-4 mb-5 border rounded"
                    type="text"
                    placeholder="Titre de la page"
                />

                {/* Input - Slug */}
                {currentPage.pageSlug && <InputSlug slug={currentPage.pageSlug} setSlug={setSlug} />}

                {/* Input - add block */}
                <InputAddBlock addBlock={addBlockContent} />

                {/* Content blocks */}
                {currentPage.blocks && (
                    currentPage.blocks.map(block => (
                        <BlockEdit block={block} />
                    ))
                )}
            </div>

            {/* Right */}
            <PageEditorSidebar
            
                updateState={updateCurrentPage}
                isEditing={isEditing}
            
                language={currentPage.language} languagesLists={languagesLists}
                pageSlug={currentPage.pageSlug}
                author={currentPage.author}
                category={currentPage.page}
                created_at={currentPage.created_at} last_modified={currentPage.last_modified}
                
                onSubmit={onSubmitPage}
                isSubmitting={isSubmitting}

                onChangeLanguage={onChangeLanguage}

            />

        </div>
    );
}


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

