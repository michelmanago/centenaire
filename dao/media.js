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

export async function selectMediaPaginated(limit = 15, pageOffset = 0) {

    let queryString = `
        SELECT 
            *
        FROM
            medias    
        LIMIT ? OFFSET ?
    `

    let res = await query(queryString, [limit, pageOffset * limit])
    let media = JSON.parse(JSON.stringify(res))
    let media_ids = media.map(m => m.id)

    // all pages associated
    let pages = await query(`SELECT media_id, page_id FROM media_page WHERE media_id IN (?)`, [media_ids])
    pages = JSON.parse(JSON.stringify(pages))
    
    // set pages []
    media = media.map(m => ({...m, pages: []}))

    pages.forEach(page => {

        // media associated with this page
        const associated_media = media.find(m => m.id === page.media_id)

        if(associated_media){
            if(associated_media.pages){
                associated_media.pages.push(page)
            } else {
                associated_media.pages = [page]
            }
        }

    })

    let item_count = (await query(`SELECT COUNT(*) as count FROM medias`))[0].count


    return {
        array: media,
        pagination: {
            item_per_page: limit,
            item_count: item_count,
            page: Number(pageOffset),
            page_count: Math.ceil(item_count / limit)
        }
    }

}


export async function selectMedia(page_id) {

    let queryString = ""
    queryString = `
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

    if(page_id){
        queryString += `
            WHERE mp.page_id = ?
        `
    }

    const res = await query(queryString, page_id ? [page_id] : []);

    let results = JSON.parse(JSON.stringify(res))

    return groupedByMedia(results)
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