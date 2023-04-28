import {
    deletePages,
    deleteTranslations,
    insertPage,
    insertTranslation,
    selectAllPages,
    selectOriginalPageId,
    selectPageBySlug,
    selectPagesByName,
    selectTranslations,
    updatePage,
} from '../dao/page';
import prisma from '../lib/prisma';
import {getServeurImageMedia} from '../utils/utils-serveur-image';
import {getMedia, getMediaById} from './media';

// helpers
const getLastPosition = async category => {
    // let lastPosition = null;
    // // If has category find last position
    // if (category) {
    //     lastPosition = await query(
    //         `
    //         SELECT position
    //         FROM pagecontent
    //         WHERE page = ?
    //         ORDER BY position DESC
    //     `,
    //         [category],
    //     );

    //     lastPosition = lastPosition && lastPosition.length ? lastPosition[0].position + 1 : null;
    // }

    // return lastPosition;
    let lastPosition = null;
    // If has category find last position
    if (category) {
        lastPosition = await prisma.pagecontent.findMany({
            where: {
                page: category,
            },
            orderBy: {
                position: 'desc',
            },
        });

        lastPosition = lastPosition && lastPosition.length ? lastPosition[0].position + 1 : null;
    }

    return lastPosition;
};

export async function removePage(pageId) {
    const translations = await getPageTranslations(pageId);

    // delete pages
    const deletesPages = await deletePages(translations.map(translation => translation.id));
    //const deletedTranslations = await deleteTranslations(translations.map(translation => translation.translation_id));

    return [deletesPages, deleteTranslations];
}

export async function updateTranslations(pages) {
    const page_id = pages[0].id;
    // const category_before = (await query(`SELECT page FROM pagecontent WHERE id = ?`, [page_id]))[0].page;
    const category_before = (await prisma.pagecontent.findUnique({where: {id: page_id}})).page;
    const category_after = pages[0].page;

    let lastPosition = null;

    // category has been changed
    if (category_before !== category_after && category_after) {
        lastPosition = await getLastPosition(category_after);
    }

    // update pages
    const updatePagePromises = pages.map(page =>
        updatePage({...page, position: lastPosition ? lastPosition : page.position}),
    );
    const updatedIds = await Promise.all(updatePagePromises);

    return pages.map(page => page.id);
}

export async function getPageTranslations(originalPageId) {
    const pages = (await selectTranslations(originalPageId)).map(page => ({...page, blocks: JSON.parse(page.blocks)}));

    return pages;
}

// create a new page (with 3 translations)
export async function createNewPage(pages) {
    const category = pages[0].page;
    let lastPosition = null;

    // If has category find last position
    if (category) {
        lastPosition = await getLastPosition(category);
    }

    // pages
    const createdPages = pages.map(page =>
        createSinglePage({
            ...page,
            position: lastPosition ? lastPosition : page.position,
        }).then(createdId => ({...page, id: createdId})),
    );
    const createdIds = await Promise.all(createdPages);

    // translations
    // hard-coded :/
    const originalPage = createdIds.find(p => p.language === 'fr');
    await linkTranslations(
        originalPage.id,
        createdIds.map(c => c.id),
    );

    // return create page ids
    return createdIds.map(page => page.id);
}

// create a single page
export async function createSinglePage(page) {
    return insertPage(page).then(id => id);
}

// Translations

export async function linkTranslations(originalPageId, childrenIds = []) {
    const translatedIds = await Promise.all(childrenIds.map(id => insertTranslation(originalPageId, id)));
    return translatedIds;
}

// Get
export async function getPageById(id) {
    // const res = await query(
    //     `
    //     SELECT * FROM pagecontent
    //     WHERE id = ?
    //     `,
    //     [id],
    // );

    // if (res.length === 1) return JSON.parse(JSON.stringify(res[0]));
    // else return null;
    console.log({id});
    const res = await prisma.pagecontent.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    return JSON.parse(JSON.stringify(res));
}

export async function getPageBySlug(pageSlug, specificContext = '') {
    try {
        let page = await selectPageBySlug(pageSlug);

        if (!page) {
            throw new Error('Page not found');
        }

        // in context of show/displaying a page we need more information
        if (specificContext === 'render') {
            // we must pre-fetch bandeau
            if (page.bandeau_id) {
                try {
                    const bandeau = await getMediaById(page.bandeau_id);
                    page.bandeau = bandeau;
                } catch (error) {
                    console.log('Error fetching bandeau', error);
                }
            }

            // fetchOriginalPageId
            const originalPageId = await selectOriginalPageId(page.id);
            page.originalPageId = originalPageId ? originalPageId.original_id : null;

            // fetch nav list
            const nav = await getAllPages(page.language, page.page);
            page.nav = nav;

            // fetch translations
            let translations = await getPageTranslations(page.originalPageId);
            page.translations = translations;

            // all associated images
            let associated_media = await getMedia(page.originalPageId);
            page.associated_media = associated_media;
        }

        // so that we can directly manipulate JS object in Components
        if (page && page.blocks) {
            page.blocks = JSON.parse(page.blocks);
        }

        return page;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getAllPageByType(pageType) {
    const res = await prisma.pagecontent.findMany({
        where: {
            page: pageType,
        },
    });

    return JSON.parse(JSON.stringify(res));
}

export async function getPageByType(pageType) {
    // const res = await query(
    //     `
    //     SELECT * FROM pagecontent
    //     WHERE page = ?;
    //     `,
    //     [pageType],
    // );

    // return JSON.parse(JSON.stringify(res));
    const res = await prisma.pagecontent.findMany({
        where: {
            // draft: 0,
            draft: false,
            page: pageType,
        },
    });

    return JSON.parse(JSON.stringify(res));
}

export async function getAllPages(locale, category) {
    const pages = await selectAllPages(locale, category);

    return pages;
}

export async function getPagesByName(name) {
    const pages = await selectPagesByName(name);

    return pages;
}
