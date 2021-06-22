import {query} from '../lib/db';

export async function createPageLang({page_id, lang, title}) {
    const res = await query(
        `
        INSERT INTO pagecontent
        (page_id, lang, title)
        VALUES (?, ?, ?)
        `,
        [page_id, lang, title],
    );

    return res.affectedRows ? res.insertId : null;
}

export async function getInfoLang(page_id) {
    const res = await query(
        `
        SELECT * FROM pagecontent_info_lang
        WHERE id = ?
        `,
        [page_id],
    );

    if (res.length > 1) return;

    return JSON.parse(JSON.stringify(res));
}

export async function getPageContentByLang(id, lang) {
    const res = await query(
        `
        SELECT * FROM pagecontent_info_lang
        WHERE id = ? and lang = ?
    `,
        [id, lang],
    );

    if (res.length > 1) return;

    return JSON.parse(JSON.stringify(res));
}
