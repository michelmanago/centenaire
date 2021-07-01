import { query } from "../lib/db"
import { filterObj } from "../utils/utils"


export async function selectOriginalPageId(childId){

    const res = await query(
        `
            SELECT original_id FROM page_translations
            WHERE child_id = ?
        `,
        [childId]
    )

    return JSON.parse(JSON.stringify(res[0]))

}

export async function deletePages(pageIds){

    const res = await query(
        `
            DELETE FROM pagecontent
            WHERE id IN(?)
        `,
        [pageIds]
    )

    return res.affectedRows

}

export async function deleteTranslations(translationsIds){

    const res = await query(
        `
            DELETE FROM page_translations
            WHERE id IN(?)
        `,
        [translationsIds]
    )

    return res.affectedRows

}

export async function insertPage({pageName, pageSlug, page, language, author, created_at, blocks, bandeau_id, position}){

    const blocksToJson = JSON.stringify(blocks)

    const res = await query(
        `
            INSERT INTO pagecontent
            (pageName, pageSlug, page, language, author, created_at, last_modified, blocks, bandeau_id, position)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [pageName, pageSlug, page, language, author, created_at, created_at, blocksToJson, bandeau_id, position]
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
            SELECT p.*, t.child_id, t.original_id, t.id translation_id FROM 
                page_translations t, pagecontent p 
            WHERE t.child_id = p.id AND t.original_id = ?;
        `,
        [originalPageId]
    )

    return JSON.parse(JSON.stringify(res))

}

export async function updatePage({id, pageName, pageSlug, content, page, language, author, last_modified, blocks, bandeau_id, position}) {

    const updatableFields = {
        pageName, 
        pageSlug, 
        content, 
        page, 
        language, 
        author, 
        last_modified, 
        blocks, 
        bandeau_id, 
        position
    }

    const valid_fields = filterObj(updatableFields, (key, val) => val !== undefined)
    const fields_count = valid_fields.length

    // there is no fields
    if(fields_count === 0){
        throw new Error("no fields found")
    } else {


        // SETTERS
        let setters = ""
    
        const fieldsKey = Object.keys(valid_fields)
        
        fieldsKey.map((key, index) => {
    
            if(index === 0){
                setters += key + " = ?"
            }  else {
                setters += "," + key + " = ?"
            }

        })


        // VALUES
        let values = []
        
        fieldsKey.forEach(key => {

            let val = updatableFields[key]

            // maybe needs to stringify json
            if(key === "blocks" && typeof val !== "string"){
                val = JSON.stringify(val)
            }

            // add to values
            values.push(val)

        })

        // finally add id
        values.push(id)

        const res = await query(
            `
                UPDATE pagecontent
                    SET ${setters}
                    
                WHERE id = ?
            `,
            values
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

export async function selectAllPages(locale = null, category = ""){


    let parameters = []
    let conditionalWhere = ""

    if(locale) {
        parameters.push(locale)
        conditionalWhere += " AND language = ? "
    }

    if(category) {
        parameters.push(category)
        conditionalWhere += " AND page = ? "
    }

    const res = await query(
        `
        SELECT p.*, t.original_id as original_id FROM pagecontent p, page_translations t
        WHERE t.child_id = p.id ${conditionalWhere}

        ORDER BY p.position
        `,
        parameters
    )

    if (res.length >= 1)
        return JSON.parse(JSON.stringify(res))
    else
        return null
} 
