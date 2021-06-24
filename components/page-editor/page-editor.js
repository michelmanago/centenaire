// libs
import {useSession} from 'next-auth/client';
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';

// utils
import cleanForSlug from '../../utils/cleanForSlug';
import checkSlugExistance from '../../utils/checkSlugExistance';
import { pageFormat, blockFormat} from '../../utils/page-editor-formats';

// components
import CustomEditor from '../Slate/customEditor';
import CarouselEditor from './carousel-editor';
import InputSlug from './inputs/InputSlug';
import InputAddBlock from './inputs/InputAddBlock';
import PageEditorSidebar from './sidebar/page-editor-sidebar';


// helpers
const getSlugWithoutLocale = (slugsWithLocale, langue) => slugsWithLocale.replace(langue + "/", "")
const pagesWithSlugsWithoutLocale = pages => pages.map(page => ({...page, pageSlug: getSlugWithoutLocale(page.pageSlug, page.language)}))



export default function PageEditor({onFormSubmitted, editedPages}) {

    

    // hooks
    const { locales } = useRouter();

    // States
    // form
    const [pages, setPages] = useState(editedPages ? editedPages : locales.map(_locale => pageFormat(_locale)))
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // utils
    
    const notAllowedToSave = () => {

        // one translations empty
        let oneTitleIsEmpty = pages.map(page => page.pageName).some(n => !n || !n.replace(/\s/g, '').length)
        oneTitleIsEmpty = oneTitleIsEmpty ? PageEditor.NOT_ALLOWED_TO_SAVE.TRANSLATIONS_EMPTY : false

        return oneTitleIsEmpty
    }

    const isEditing = !!editedPages;
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

        let form = [...pages]

        setIsSubmitting(true)


        // append slugLocale
        if(!isEditing){
            form = form.map(page => ({
                ...page,
                pageSlug: (page.language) + "/" + page.pageSlug
            }))
        }

        // check slugs
        const notCleanSlugItems = []
        form.forEach((page, pageIndex) => {

            if(!isEditing || editedPages[pageIndex].pageSlug !== page.pageSlug){
                notCleanSlugItems.push({
                    index: pageIndex,
                    slug: page.pageSlug
                })
            }

        })

        // check 


        const promises = notCleanSlugItems.map(slugItem => checkSlugExistance(slugItem.slug).then(checkedSlug => ({index: slugItem.index, slug: checkedSlug})))
        const checkedSlugs = await Promise.all(promises)
        
        checkedSlugs.forEach(slugItem => {

            form[slugItem.index].pageSlug = slugItem.slug

        })


        // send pages to form
        try{
            await onFormSubmitted(form);
        } catch (err){
            console.log(err)
        } finally {
            setIsSubmitting(false)   
        }
    };

    // others
    const languagesLists = locales.map(_locale => ({title: _locale.toUpperCase(), value: _locale}));


    // setters
    const setSlug = value => updateCurrentPage({pageSlug: value})
    const setTitle = e => updateCurrentPage({pageName: e.target.value, pageSlug: cleanForSlug(e.target.value)})
    const addBlockContent = type => {

        // if blocks are draggable we must count each items's postions to compute a new position
        const newPosition = currentPage.blocks.length
        const newBlock = blockFormat(editedPages ? currentPage.id : null, currentPage.language, type, newPosition)

        updateCurrentPage({
            blocks: [
                ...currentPage.blocks,
                newBlock
            ]
        })

    };
    const setBlockContent = blockPosition => value => {
        
        let blocks = currentPage.blocks.map(block => {

            if(block.position === blockPosition){
                return {
                    ...block,
                    content: value
                }
            } else {
                return block
            }

        })

        updateCurrentPage({blocks})   
    }

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
                {currentPage.pageSlug && <InputSlug currentLanguage={currentPage.language} slug={currentPage.pageSlug} setSlug={setSlug} />}

                {/* Input - add block */}
                <InputAddBlock addBlock={addBlockContent} />

                {/* Content blocks */}
                {currentPage.blocks && (
                    currentPage.blocks.map((block, blockIndex) => (
                        <BlockEdit 
                            key={"block-" + block.position} 
                            type={block.type}
                            content={block.content}
                            setContent={setBlockContent(block.position)}
                        />
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

                notAllowedToSave={notAllowedToSave()}

            />

        </div>
    );
}

PageEditor.NOT_ALLOWED_TO_SAVE = {

    TRANSLATIONS_EMPTY: "TRANSLATIONS_EMPTY",

}

const BlockEdit = ({type, content, setContent}) => {
    return (
        <div>
            
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

