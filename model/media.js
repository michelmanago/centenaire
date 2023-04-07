// dao
import {
    putSingleMedia,
    selectMedia,
    selectMediaPaginated,
    selectNonAssociatedMedia,
    selectSingleMedia,
} from '../dao/media';
import prisma from '../lib/prisma';
import {attributeMediaToPage} from './media_page';

export async function createMedia(media) {
    try {
        const mediaCreate = await prisma.medias.create({
            data: media,
        });
        return JSON.parse(JSON.stringify(mediaCreate));
    } catch (error) {
        console.log({error});
        return null;
    }
}

export async function updateMedia(media_id, fields) {
    // get the media
    const the_media = await getSingleMedia(media_id);

    // legende as Array of Object (in order to be processed by dao)
    if (fields.legende) {
        fields.legende = JSON.stringify(fields.legende);
    }

    // new media
    const new_media = Object.assign(the_media, fields);

    // update with new media
    await putSingleMedia(media_id, new_media);

    // associate media
    if (fields.page_id) {
        await attributeMediaToPage(media_id, fields.page_id);
    }

    return the_media;
}

export async function deleteMedia(media_id) {
    let mediaDelete = await prisma.medias.delete({
        where: {
            id: parseInt(media_id),
        },
    });
    return JSON.parse(JSON.stringify(mediaDelete));
}

export async function getSingleMedia(media_id) {
    const the_media = await selectSingleMedia(media_id);

    if (!the_media) {
        throw new Error("Le media n'existe pas.");
    }

    return the_media;
}

export async function getMedia(page_id, pageOffset, accepts, with_no_page = false) {
    if (with_no_page) {
        return await selectNonAssociatedMedia(undefined, pageOffset, accepts);
    } else if (typeof pageOffset !== 'undefined') {
        return await selectMediaPaginated(15, pageOffset, page_id, accepts);
    } else {
        return await selectMedia(page_id);
    }
}
