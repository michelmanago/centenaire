// libs
import {useRouter} from 'next/router';
import { useState } from 'react';

// utils
import cleanForSlug from '../../utils/cleanForSlug';
import getAvailableSlug from '../../utils/getAvailableSlug';
import { pageFormat, blockFormat} from '../../utils/page-editor-formats';

// components
import InputSlug from './inputs/InputSlug';
import InputAddBlock from './inputs/InputAddBlock';
import PageEditorSidebar from './sidebar/page-editor-sidebar';
import BlockContentEditor from './blocks/BlockContentEditor';


// helpers
const getSlugWithoutLocale = (slugsWithLocale, langue) => slugsWithLocale.replace(langue + "/", "")
const pagesWithSlugsWithoutLocale = pages => pages.map(page => ({...page, pageSlug: getSlugWithoutLocale(page.pageSlug, page.language)}))

// create the editable slug with no locale
const pagesWithSlugsWithoutLocales = pages => pages.map(page => ({...page, slugWithoutLocale: page.pageSlug.replace(page.language + "/", "")}))
export default function PageEditor({onFormSubmitted, editedPages}) {

    // hooks
    const { locales } = useRouter();

    // States
    // form
    const [pages, setPages] = useState(editedPages ? pagesWithSlugsWithoutLocales(editedPages) : locales.map(_locale => pageFormat(_locale)))
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

        const promises = notCleanSlugItems.map(slugItem => getAvailableSlug(slugItem.slug).then(checkedSlug => {

            return ({index: slugItem.index, slug: checkedSlug})

        }))

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
    const setSlug = value => updateCurrentPage({pageSlug: currentPage.language + "/" + value, slugWithoutLocale: value})
    const setTitle = e => {
        
        const cleanedSlug = cleanForSlug(e.target.value)
        updateCurrentPage({pageName: e.target.value, pageSlug: currentPage.language + "/" + cleanedSlug, slugWithoutLocale: cleanedSlug})

    }
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

    const removeBlockContent = blockPosition => value => {
        
        let blocks = currentPage.blocks.filter(block => block.position !== blockPosition)

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
                {currentPage.pageSlug && (
                    <InputSlug 
                        currentLanguage={currentPage.language} 

                        originalSlug={editedPages ? editedPages[currentPageIndex].pageSlug : ""}
                        slug={currentPage.pageSlug} 
                        slugWithoutLocale={currentPage.slugWithoutLocale}

                        setSlug={setSlug} 
                    />
                )}

                {/* Input - add block */}
                <InputAddBlock addBlock={addBlockContent} />

                {/* Content blocks */}
                {currentPage.blocks && (
                    currentPage.blocks.map((block, blockIndex) => (
                        <BlockContentEditor 
                            key={"block-" + block.position} 
                            type={block.type}
                            content={block.content}

                            // actions
                            setContent={setBlockContent(block.position)}
                            removeBlockContent={removeBlockContent(block.position)}
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
