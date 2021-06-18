import {query} from '../lib/db';


// Create
export async function createPage({title, slug, content, category, language, author, created_at}) {
    const res = await query(
        `
            INSERT INTO pagecontent
            (pageName, pageSlug, blockcontent, page, language, author, created_at, last_modified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [title, slug, content, category, language, author, created_at, created_at]
    )

    return res.affectedRows ? res.insertId : null
}

export async function updatePage(id, {title, slug, content, category, language, author, last_modified}) {
    const res = await query(
        `
            UPDATE pagecontent
                SET pageName = ?,
                    pageSlug = ?,
                    blockcontent = ?,
                    page = ?,
                    language = ?,
                    author = ?,
                    last_modified = ?
                
            WHERE id = ?
        `,
        [title, slug, content, category, language, author, last_modified, /* should always be the last */id]
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
