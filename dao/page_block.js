import {query} from '../lib/db';

export async function createBlock({page_id, lang, content, position, type}) {
    const res = await query(
        `
        INSERT INTO page_blocks
        (page_id, lang, content, position, type)
        VALUES (?, ?, ?, ?, ?)
        `,
        [page_id, lang, content, position, type],
    );
    return res.affectedRows ? res.insertId : null;
}

export async function updateBlock({lang, content, position, type}) {
    const res = await query(
        `
        INSERT INTO page_blocks
        (lang, content, position, type)
        VALUES (?, ?, ?, ?)
        `,
        [lang, content, position, type],
    );
    return res.affectedRows ? res.insertId : null;
}

export async function getPageBlock(pageId) {
    const res = await query(
        `
        SELECT * FROM page_blocks
        WHERE page_id = ?
    `,
        [pageId],
    );

    return JSON.parse(JSON.stringify(res));
}
