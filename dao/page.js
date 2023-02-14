import {filterObj} from '../utils/utils';
import prisma from '../lib/prisma';

export async function selectPagesByName(name) {
    // const res = await query(
    //     `
    //     SELECT
    //         DISTINCT pt.original_id,
    //         p.*
    //     FROM centenaire.pagecontent p,
    //         page_translations pt
    //     WHERE p.pageName LIKE '%${name}%'  AND pt.original_id = p.id
    //     `,
    //     [name]
    // )

    // return JSON.parse(JSON.stringify(res))
    const res = await prisma.pagecontent.findMany({
        where: {
            pageName: {
                contains: name,
            },
        },
    });

    return JSON.parse(JSON.stringify(res));
}

export async function selectOriginalPageId(childId) {
    // const res = await query(
    //     `
    //         SELECT original_id FROM page_translations
    //         WHERE child_id = ?
    //     `,
    //     [childId],
    // );

    // return JSON.parse(JSON.stringify(res[0]));

    const res = await prisma.page_translations.findMany({
        where: {
            child_id: childId,
        },
        select: {
            original_id: true,
        },
    });

    return JSON.parse(JSON.stringify(res[0]));
}

export async function deletePages(pageIds) {
    // const res = await query(
    //     `
    //         DELETE FROM pagecontent
    //         WHERE id IN(?)
    //     `,
    //     [pageIds],
    // );

    // return res.affectedRows;

    const res = await prisma.pagecontent.deleteMany({
        where: {
            id: {
                in: pageIds,
            },
        },
    });
    return res;
}

export async function deleteTranslations(translationsIds) {
    // const res = await query(
    //     `
    //         DELETE FROM page_translations
    //         WHERE id IN(?)
    //     `,
    //     [translationsIds],
    // );

    // return res.affectedRows;
    const res = await prisma.page_translations.deleteMany({
        id: {
            in: translationsIds,
        },
    });
    return res;
}

export async function insertPage({
    pageName,
    pageSlug,
    page,
    language,
    author,
    created_at,
    blocks,
    bandeau_id,
    position,
    source,
}) {
    // const blocksToJson = JSON.stringify(blocks);

    // const res = await query(
    //     `
    //         INSERT INTO pagecontent
    //         (pageName, pageSlug, page, language, author, created_at, last_modified, blocks, bandeau_id, position, source)
    //         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
    //     `,
    //     [
    //         pageName,
    //         pageSlug,
    //         page,
    //         language,
    //         author,
    //         created_at,
    //         created_at,
    //         blocksToJson,
    //         bandeau_id,
    //         position,
    //         source,
    //     ],
    // );

    // return res.affectedRows ? res.insertId : null;
    const blocksToJson = JSON.stringify(blocks);
    const res = await prisma.pagecontent.create({
        data: {
            language,
            page,
            pageSlug,
            pageName,
            author,
            created_at: new Date(created_at),
            last_modified: new Date(created_at),
            blocks: blocksToJson,
            bandeau_id,
            position,
            source,
        },
    });
    console.log({res});

    return res ? res.id : null;
}

export async function insertTranslation(originalId, childId) {
    // const res = await query(
    //     `
    //         INSERT INTO page_translations
    //         (original_id, child_id)
    //         VALUES (?, ?)
    //     `,
    //     [originalId, childId],
    // );

    // return res.affectedRows ? res.insertId : null;
    const res = await prisma.page_translations.create({
        data: {
            original_id: originalId,
            child_id: childId,
        },
    });
    return res ? res.id : null;
}

export async function selectTranslations(originalPageId) {
    // const res = await query(
    //     `
    //         SELECT p.*, t.child_id, t.original_id, t.id translation_id FROM
    //             page_translations t, pagecontent p
    //         WHERE t.child_id = p.id AND t.original_id = ?;
    //     `,
    //     [originalPageId],
    // );

    // return JSON.parse(JSON.stringify(res));
    let res = await prisma.page_translations.findMany({
        where: {
            original_id: parseInt(originalPageId),
        },
        include: {
            childPage: true,
        },
    });

    let response = [{}, {}, {}];

    res.forEach(item => {
        if (item.childPage.language === 'fr') response[0] = {...item.childPage};
        if (item.childPage.language === 'en') response[1] = {...item.childPage};
        if (item.childPage.language === 'ru') response[2] = {...item.childPage};
    });

    return JSON.parse(JSON.stringify(response));
}

export async function updatePage({
    id,
    pageName,
    pageSlug,
    content,
    page,
    language,
    author,
    last_modified,
    blocks,
    bandeau_id,
    position,
    source,
}) {
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
        position,
        source,
    };

    // const valid_fields = filterObj(updatableFields, (key, val) => val !== undefined);
    // const fields_count = valid_fields.length;

    // // there is no fields
    // if (fields_count === 0) {
    //     throw new Error('no fields found');
    // } else {
    //     // SETTERS
    //     let setters = '';

    //     const fieldsKey = Object.keys(valid_fields);

    //     fieldsKey.map((key, index) => {
    //         if (index === 0) {
    //             setters += key + ' = ?';
    //         } else {
    //             setters += ',' + key + ' = ?';
    //         }
    //     });

    //     // VALUES
    //     let values = [];

    //     fieldsKey.forEach(key => {
    //         let val = updatableFields[key];

    //         // maybe needs to stringify json
    //         if (key === 'blocks' && typeof val !== 'string') {
    //             val = JSON.stringify(val);
    //         }

    //         if (key === 'page' && !val) {
    //             val = null;
    //         }

    //         // add to values
    //         values.push(val);
    //     });

    //     // finally add id
    //     values.push(id);

    //     const res = await query(
    //         `
    //             UPDATE pagecontent
    //                 SET ${setters}

    //             WHERE id = ?
    //         `,
    //         values,
    //     );

    //     if (!res.affectedRows) {
    //         throw {
    //             message: 'page not found id: ' + id,
    //             status: 404,
    //         };
    //     } else {
    //         return res.affectedRows;
    //     }
    // }

    const valid_fields = filterObj(updatableFields, (key, val) => val !== undefined);
    const fields_count = valid_fields.length;

    // there is no fields
    if (fields_count === 0) {
        throw new Error('no fields found');
    } else {
        // SETTERS
        let settersObj = {};

        const fieldsKey = Object.keys(valid_fields);

        fieldsKey.map((key, index) => {
            let val = updatableFields[key];
            if (key === 'last_modified') val = new Date(val);
            if (key === 'blocks' && typeof val !== 'string') {
                val = JSON.stringify(val);
            }

            if (key === 'page' && !val) {
                val = null;
            }
            settersObj[key] = val;
        });
        // console.log({settersObj});

        const res = await prisma.pagecontent.update({
            where: {id},
            data: settersObj,
        });
        return res;
    }
}

export async function selectPageBySlug(pageSlug) {
    // const res = await query(
    //     `
    //     SELECT * FROM pagecontent
    //     WHERE pageSlug = ?
    //     `,
    //     [pageSlug],
    // );

    // if (res.length >= 1) return JSON.parse(JSON.stringify(res[0]));
    // else return null;

    let param = {
        where: {
            pageSlug: pageSlug,
        },
    };
    const res = await prisma.pagecontent.findUnique(param);

    return JSON.parse(JSON.stringify(res));
}

export async function selectAllPages(locale = null, category = '') {
    // let parameters = [];
    // let conditionalWhere = '';

    // if (locale) {
    //     parameters.push(locale);
    //     conditionalWhere += ' AND language = ? ';
    // }

    // if (category) {
    //     parameters.push(category);
    //     conditionalWhere += ' AND page = ? ';
    // }

    // const res = await query(
    //     `
    //     SELECT p.*, t.original_id as original_id FROM pagecontent p, page_translations t
    //     WHERE t.child_id = p.id ${conditionalWhere}

    //     ORDER BY p.created_at DESC
    //     `,
    //     parameters,
    // );

    // if (res.length >= 1) return JSON.parse(JSON.stringify(res));
    // else return null;

    let parameters = {};
    if (locale) {
        parameters.language = locale;
    }
    if (category) {
        parameters.page = category;
    }

    parameters.AND = {
        OR: [{page: {not: 'defunt'}}, {page: null}],
    };

    const res = await prisma.pagecontent.findMany({
        where: parameters,
        orderBy: {
            created_at: 'desc',
        },
    });

    if (res.length >= 1) return JSON.parse(JSON.stringify(res));
    else return null;
}
