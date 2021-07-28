import {query} from '../lib/db';

// SELECT ALL 
export async function getMedias(page_id, get_associated_page) {


    console.log("getMeida")


    let queryString = ""
    if(get_associated_page){
        queryString = `
            SELECT 
                m.id, m.upload_path, m.type, m.credit, m.legende, m.public_path,
                p.pageSlug, p.pageName,
                mp.page_id
            FROM media_page mp
            LEFT JOIN pagecontent p
                ON mp.page_id = p.id
            LEFT JOIN medias m
                ON m.id = mp.media_id
        `
    } else {
        queryString = `
            SELECT
                m.id, m.upload_path, m.type, m.credit, m.legende, m.public_path,
                mp.page_id
            FROM media_page mp
            LEFT JOIN medias m
                ON m.id = mp.media_id
        `
    }

    if(page_id){
        queryString += `
            WHERE mp.page_id = ?
        `
    }

    const res = await query(queryString, page_id ? [page_id] : []);

    let results = JSON.parse(JSON.stringify(res))
    console.log("before", results)

    results = results.map(media => ( Object.assign( {
        id: media.id,
        upload_path: media.upload_path,
        type: media.type,
        credit: media.credit,
        legende: media.legende,
        public_path: media.public_path,
        page_id: media.page_id,
    }, (get_associated_page && media.pageSlug) && {
        page: {
            id: media.page_id,
            pageSlug: media.pageSlug,
            pageName: media.pageName,
        }
    } ) ))

    return results
}


// SELECT SINGLE

export async function selectSingleMedia(media_id){

    const rows = await query(
        `
            SELECT * FROM medias
            WHERE id = ?
        `,
        [media_id]
    )

    return rows.length ? rows[0] : null

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

    const {affectedRows} = res

    return true

}