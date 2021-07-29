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
export async function getMedias(page_id, get_associated_page) {


    let queryString = ""
    if(get_associated_page){
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
    } else {
        queryString = `
            SELECT 
                m.id, m.upload_path, m.type, m.credit, m.legende, m.public_path
            FROM medias m
            LEFT JOIN media_page mp
                ON mp.media_id = m.id
            LEFT JOIN pagecontent p
                ON p.id = mp.page_id
        `
    }

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