import { selectPageBySlug } from '../dao/page';
import {createPage, getPageById} from './page';

export async function getPageModelById(page_id) {
    var page = await getPageById(page_id);
    return page;
}
