import { deletePages, deleteTranslations, insertPage, insertTranslation, selectAllPages, selectOriginalPageId, selectPageBySlug, selectTranslations, updatePage } from '../dao/page';
import {query} from '../lib/db';
import { getServeurImageMedia } from '../utils/utils-serveur-image';


export async function removePage(pageId){

    const translations = await getPageTranslations(pageId)
    
    // delete pages
    const deletesPages = await deletePages(translations.map(translation => translation.id))
    const deletedTranslations = await deleteTranslations(translations.map(translation => translation.translation_id))

    return [deletesPages, deleteTranslations]
    
}

export async function updateTranslations(pages){

    // update pages
    const updatePagePromises = pages.map(page => updatePage(page))
    const updatedIds = await Promise.all(updatePagePromises)
    
    return pages.map(page => page.id)
}

export async function getPageTranslations(originalPageId){
 
    const pages = (await selectTranslations(originalPageId)).map(page => ({...page, blocks: JSON.parse(page.blocks)}))

    return pages

}



// create a new page (with 3 translations)
export async function createNewPage(pages){
 
    // pages
    const createdPages = pages.map(page => createSinglePage(page).then(createdId => ({...page, id: createdId})))
    const createdIds = await Promise.all(createdPages)

    // translations
    // hard-coded :/
    const originalPage = createdIds.find(p => p.language === "fr")
    await linkTranslations(originalPage.id, createdIds.map(c => c.id))

    // return create page ids
    return createdIds.map(page => page.id)

}

// create a single page 
export async function createSinglePage(page) {
    return insertPage(page)
    .then(id => id)
    
}



// Translations

export async function linkTranslations(originalPageId, childrenIds = []){

    const translatedIds = await Promise.all(childrenIds.map(id => insertTranslation(originalPageId, id)))
    return translatedIds
}

// Get
export async function getPageById(id) {
    const res = await query(
        `
        SELECT * FROM pagecontent
        WHERE id = ?
        `,
        [id]
    )

    if (res.length === 1)
        return JSON.parse(JSON.stringify(res[0]))
    else
        return null;
}

export async function getPageBySlug(pageSlug, specificContext = "") {
    
    try {
        
        let page = await selectPageBySlug(pageSlug)

        // in context of show/displaying a page we need more information
        if(specificContext === "render"){

            // we must pre-fetch bandeau
            if(page.bandeau_id){

                try {
                    
                    const bandeau = await getServeurImageMedia(page.bandeau_id)
                    page.bandeau = bandeau

                } catch (error) {
                    console.log("Error fetching bandeau", error)
                }

            }

            // fetchOriginalPageId
            const originalPageId = await selectOriginalPageId(page.id)
            page.originalPageId = originalPageId ? originalPageId.original_id : null 

            // fetch nav list
            const nav = await getAllPages(page.language, page.page)
            page.nav = nav

            // fetch translations
            let translations = await getPageTranslations(page.originalPageId)
            page.translations = translations

        }

        // so that we can directly manipulate JS object in Components
        if(page && page.blocks){
            page.blocks = JSON.parse(page.blocks)
        }

        return page

    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getPageByType(pageType) {
    const res = await query(
        `
        SELECT * FROM pagecontent
        WHERE page = ?;
        `,
        [pageType],
    );

    return JSON.parse(JSON.stringify(res));
}



export async function getAllPages(locale, category){

    const pages = await selectAllPages(locale, category)

    return pages

}