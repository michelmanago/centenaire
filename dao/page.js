import { query } from "../lib/db"

export async function insertPage({pageName, pageSlug, category, language, author, created_at, blocks}){

    const blocksToJson = JSON.stringify(blocks)

    const res = await query(
        `
            INSERT INTO pagecontent
            (pageName, pageSlug, page, language, author, created_at, last_modified, blocks)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [pageName, pageSlug, category, language, author, created_at, created_at, blocksToJson]
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

export async function updatePage({id, pageName, pageSlug, content, page, language, author, last_modified, blocks}) {

    const blocksToJson = JSON.stringify(blocks)

    const res = await query(
        `
            UPDATE pagecontent
                SET pageName = ?,
                    pageSlug = ?,
                    blockcontent = ?,
                    page = ?,
                    language = ?,
                    author = ?,
                    last_modified = ?,
                    blocks = ?
                
            WHERE id = ?
        `,
        [pageName, pageSlug, content, page, language, author, last_modified, blocksToJson,/* should always be the last */id]
    )

    if(!res.affectedRows){
        throw {
            message: "page not found id: " + id,
            status: 404
        }
    } else {
        return res.affectedRows
    }

}


export async function selectPageBySlug(pageSlug) {
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
        return null
}

export async function selectAllPages(locale = null){

    const res = await query(
        `
        SELECT * FROM pagecontent
        ${locale ? "WHERE language = ?" : ""}
        `,
        locale ? [locale] : []
    )

    if (res.length >= 1)
        return JSON.parse(JSON.stringify(res))
    else
        return null
} 
