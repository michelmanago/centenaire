import { selectPageBySlug } from '../dao/page';
import {createBlock, getPageBlock} from '../dao/page_block';
import {createPage, getPageById} from './page';

export async function createPageModel(page) {
    const pageId = await createPage(page);

    for (const block of page.blocks) {
        let newBlock = {...block};
        newBlock.page_id = pageId;
        await createBlock(newBlock);
    }

    return pageId;
}

export async function getPageModelById(page_id) {
    var page = await getPageById(page_id);

    //page.info_lang = await getInfoLang(page_id)
    page.blocks = await getPageBlock(page_id);

    return page;
}
