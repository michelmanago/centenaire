import { query } from "../lib/db"

export async function insertPage({pageName, pageSlug, category, language, author, created_at}){

    const res = await query(
        `
            INSERT INTO pagecontent
            (pageName, pageSlug, page, language, author, created_at, last_modified)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [pageName, pageSlug, category, language, author, created_at, created_at]
    )

    return res.affectedRows ? res.insertId : null

}


export async function insertTranslation(originalId, childId){

    const res = await query(
        `
            INSERT INTO page_translations
            (original_id, child_id)
            VALUES (?, ?)
        `,
        [originalId, childId]
    )

    return res.affectedRows ? res.insertId : null

}

export async function selectTranslations(originalPageId){

    originalPageId = Number(originalPageId)

    const res = await query(
        `
            SELECT * FROM 
                page_translations t, pagecontent p 
            WHERE t.child_id = p.id AND t.original_id = ?;
        `,
        [originalPageId]
    )

    return JSON.parse(JSON.stringify(res))

}

export async function updatePage({id, pageName, pageSlug, content, page, language, author, last_modified}) {
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
        [pageName, pageSlug, content, page, language, author, last_modified, /* should always be the last */id]
    )

    return res.changedRows ? true : false
}