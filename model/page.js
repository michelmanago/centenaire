import { insertPage, insertTranslation, selectTranslations, updatePage } from '../dao/page';
import { createBlock, getPageBlock } from '../dao/page_block';
import {query} from '../lib/db';


export async function updateTranslations(pages){

    // update pages
    const updatePagePromises = pages.map(page => updatePage(page))
    await Promise.all(updatePagePromises)


    // @TODO update blocks
        // @TODO check remove blocks

    return true
}

export async function getPageTranslations(originalPageId){
 
    const pages = await selectTranslations(originalPageId)

    if(pages.length){

        // fetch blocks for each page 
        const pagesWithBlocks = await Promise.all(pages.map(page => new Promise((resolve, reject) => {
            getPageBlock(page.id)
                .then((blocks) => {
                    page.blocks = blocks
                    resolve(page)
                })
                .catch(reject)
        })))

    } else {
        throw {
            message: "No translation found",
            status: 404
        }
    }

    return pages
    
}



// create a new page (with 3 translations)
export async function createNewPage(pages){
 
    // pages
    const createdPages = pages.map(page => createSinglePage(page).then(createdId => ({...page, id: createdId})))
    const createdIds = await Promise.all(createdPages)

    // blocks
    const blockPromises = createdIds.map(page => {

        const blockPromises = page.blocks.map(block => createBlock({...block, page_id: page.id}).then(createdId => ({...block, id: createdId})))
        return Promise.all(blockPromises).then(blocks => {
            page.blocks = blocks
            return page
        })
    })

    const pagesWithBlocks = await Promise.all(blockPromises)

    // translations
    // hard-coded :/
    const originalPage = createdIds.find(p => p.language === "fr")
    const translations = await linkTranslations(originalPage.id, createdIds.map(c => c.id))

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
    const res = await query(
        `
        SELECT * FROM pagecontent
        WHERE pageSlug = ?
        `,
        [pageSlug]
    )

    if (res.length >= 1)
        return JSON.parse(JSON.stringify(res[0]))
    else
        return []
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
