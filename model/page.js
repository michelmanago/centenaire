import {query} from '../lib/db';

export async function getPageByName(pageName) {
    const res = await query(
        `
        SELECT * FROM pagecontent
        WHERE pageName = ?
        `,
        [pageName]
    )

    if (res.length === 1)
        return JSON.parse(JSON.stringify(res[0]))
    else
        return null;
}

export async function getPageByType(pageType) {
    const res = await query(
        `
        SELECT * FROM pagecontent
        WHERE page = ?;
        `,
        [pageType],
    );

    return JSON.parse(JSON.stringify(res));
}
