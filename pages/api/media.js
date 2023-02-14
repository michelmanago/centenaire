import {createMedia, getMedia} from '../../model/media';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const page_id = req.query.page_id;
            const page_offset = req.query.page_offset || 0;
            const accepts = req.query.accepts ? req.query.accepts.split('-') : [];
            const with_no_page = req.query.with_no_page ? true : false;

            const medias = await getMedia(page_id, page_offset, accepts, with_no_page);

            return res.json(medias);
        } else if (req.method === 'POST') {
            const media = req.body;
            const mediaCreate = await createMedia(media);
            res.json(mediaCreate);
        } else {
            return res.status(405).json({message: 'wrong http method'});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message});
    }
}
