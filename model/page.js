import { insertPage, insertPageQuery, insertTranslation, selectPageBySlug, selectTranslations, updatePage } from '../dao/page';
import { createBlock, getPageBlock } from '../dao/page_block';
import {query, transaction} from '../lib/db';


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

export async function getPageBySlug(pageSlug) {
    
    let page = await selectPageBySlug(pageSlug)

    if(page){
        page.blocks = JSON.parse(page.blocks)
    }

    return page
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
