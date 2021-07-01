import {query} from '../lib/db';

export async function getMedias() {
    const res = await query(`
        SELECT * from medias
    `);

    return JSON.parse(JSON.stringify(res));
}
