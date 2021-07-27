import {query} from '../lib/db';

// SELECT ALL 
export async function getMedias(page_id, get_associated_page) {

    let queryString = ""
    if(get_associated_page){
        queryString = `
            SELECT 
                m.id, m.upload_path, m.type, m.credit, m.legende, m.public_path, m.page_id, 
                p.pageSlug, p.pageName, p.id as _page_id
            FROM medias m
            LEFT JOIN pagecontent p
            ON m.page_id = p.id
        `
    } else {
        queryString = `
            SELECT
                m.id, m.upload_path, m.type, m.credit, m.legende, m.public_path, m.page_id
            FROM medias m
        `
    }

    if(page_id){
        queryString += `
            WHERE m.page_id = ?
        `
    }

    const res = await query(queryString, page_id ? [page_id] : []);

    let results = JSON.parse(JSON.stringify(res))
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

export async function putSingleMedia(media_id, {credit, legende, page_id} = {}){

    const res = await query(
        `
            UPDATE medias
            SET 
                credit = ?,
                legende = ?,
                page_id = ?
            WHERE id = ?
        `,
        [credit, legende, page_id, /** id of media (!needs to be the last argument) */ media_id]
    )

    const {affectedRows} = res

    return true

}