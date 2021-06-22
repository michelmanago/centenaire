import {query} from '../lib/db';

export async function createBlock({page_id, lang, content, position, type}) {
    const res = await query(
        `
        INSERT INTO page_content_block
        (page_id, lang, content, position, type)
        VALUES (?, ?, ?, ?, ?)
        `,
        [page_id, lang, content, position, type],
    );
    return res.affectedRows ? res.insertId : null;
}

export async function getPageBlock(pageId) {
    const res = await query(
        `
        SELECT * from page_content_block
        WHERE page_id = ?
    `,
        [pageId],
    );

    return JSON.parse(JSON.stringify(res));
}
