import {query} from '../lib/db';


export async function insertMediaPage(media_id, page_id){

    const res = await query(`
        INSERT INTO media_page
            (media_id, page_id)
        VALUES (?, ?)
    `, [media_id, page_id]);

    return res.insertId

}

export async function deleteMediaPage(media_id, page_id){

    const res = await query(`
        DELETE FROM media_page
        WHERE media_id = ? AND page_id = ?
    `, [media_id, page_id]);

    return res.affectedRows

}