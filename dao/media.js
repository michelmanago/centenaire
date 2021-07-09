import {query} from '../lib/db';

// SELECT ALL 
export async function getMedias() {
    const res = await query(`
        SELECT * from medias
    `);

    return JSON.parse(JSON.stringify(res));
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