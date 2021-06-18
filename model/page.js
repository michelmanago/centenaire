import {query} from '../lib/db';


// Create
export async function createPage({title, slug, content, category, language, author}) {
    const res = await query(
        `
            INSERT INTO pagecontent
            (pageName, pageSlug, blockcontent, page, language, author)
            VALUES (?, ?, ?, ?, ?, ?)
        `,
        [title, slug, content, category, language, author]
    )

    return res.affectedRows ? res.insertId : null
}

export async function updatePage(id, {title, slug, content, category, language, author}) {
    const res = await query(
        `
            UPDATE pagecontent
                SET pageName = ?,
                    pageSlug = ?,
                    blockcontent = ?,
                    page = ?,
                    language = ?,
                    author = ?
                
            WHERE id = ?
        `,
        [title, slug, content, category, language, author, id]
    )

    return res.changedRows ? true : false
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

    if (res.length === 1)
        return JSON.parse(JSON.stringify(res[0]))
    else
        return null;
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
