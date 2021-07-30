import {query} from '../lib/db';


const groupedByMedia = results => {
    
    // group by media

    const groupedResults = {}

    results.forEach(media => {

        const key = media.id
        const page = media.page_id && ({
            id: media.page_id,
            pageSlug: media.pageSlug,
            pageName: media.pageName,
        })
        
        if(!groupedResults[key]){
            groupedResults[key] = {
                id: media.id,
                upload_path: media.upload_path,
                type: media.type,
                credit: media.credit,
                legende: media.legende,
                public_path: media.public_path,
                pages: []
            }
        }

        if(page){
            groupedResults[key].pages.push(page)
        }


    })

    return Object.values(groupedResults)
    
}

// SELECT ALL 
export async function selectMedia(page_id) {

    let queryString = ""
    let parameters = []
    
    queryString = `
        SELECT 
            m.id, m.upload_path, m.type, m.credit, m.legende, m.public_path
        FROM medias m
        LEFT JOIN media_page mp
            ON mp.media_id = m.id
        LEFT JOIN pagecontent p
            ON p.id = mp.page_id
    `

    // need to associate pages
    if(page_id){
        queryString += `
            WHERE mp.page_id = ?
        `
        parameters.push(page_id)

    }

    // order by most recent
    queryString+= `
        ORDER BY id DESC
    `

    const res = await query(queryString, parameters);
    const data = JSON.parse(JSON.stringify(res))
    return groupedByMedia(data)

}

export async function selectMediaWithPages(page_id, limit = 15, pageOffset = 0) {

    console.log({pageOffset})

    const needPagination = limit !== -1

    let queryString = ""
    let parameters = []
    let pagination = null
    
    // base
    queryString += `
        SELECT 
            m.id, m.upload_path, m.type, m.credit, m.legende, m.public_path,
            p.pageSlug, p.pageName,
            mp.page_id
        FROM medias m
        LEFT JOIN media_page mp
            ON mp.media_id = m.id
        LEFT JOIN pagecontent p
            ON p.id = mp.page_id
    `

    // only media associated with this page_id
    if(page_id){
        queryString += `
            WHERE mp.page_id = ?
        `
        parameters.push(page_id)
    }

    // order by most recent
    queryString+= `
        ORDER BY id DESC
    `

    // pagination
    if(needPagination){
        queryString += `
            LIMIT ? OFFSET ?
        `
        parameters.push(limit, limit * pageOffset)

        pagination = await query(`
            SELECT COUNT(id) as media_count FROM medias
            ${page_id ? "WHERE mp.page_id = ?" : ""}
        `, page_id ? [page_id] : [])
    }

    

    const res = await query(queryString, parameters)
    const data = JSON.parse(JSON.stringify(res))
    return {
        array: groupedByMedia(data),
        count: pagination ? pagination[0].media_count : undefined
    }

}


// SELECT SINGLE

export async function selectSingleMedia(media_id){

    const rows = await query(
        `
            SELECT 
                m.*,
                p.pageSlug, p.pageName,
                mp.page_id
            FROM medias m
                LEFT JOIN media_page mp
                    ON mp.media_id = m.id
                LEFT JOIN pagecontent p
                    ON p.id = mp.page_id
            WHERE m.id = ?
        `,
        [media_id]
    )

    const groupedResults = groupedByMedia(rows)

    return rows.length ? groupedResults[0] : null
}

// PUT MEDIA

export async function putSingleMedia(media_id, {credit, legende} = {}){

    const res = await query(
        `
            UPDATE medias
            SET 
                credit = ?,
                legende = ?
            WHERE id = ?
        `,
        [credit, legende, /** id of media (!needs to be the last argument) */ media_id]
    )

    return true

}