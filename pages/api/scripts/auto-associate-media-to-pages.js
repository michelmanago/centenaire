import { getAllPages } from "../../../model/page";
import { query } from "../../../lib/db";


const ORIGIN_FROM_SERVEURIMAGE = "http://localhost:3333/uploads/centenaire/page/"



export default async function handler(req, res) {
    try {

        if(req.method === 'POST'){

            const results = await run(true)

            return res.json(results)
        }
        
        else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: e.message })
    }
}


async function run(dry = true){

    const mediaFromText = []
    const mediaFromCarousel = []
    const mediaFromBandeau = []

    let media = []
    let pages = await query(`
        SELECT 
            p.blocks, p.bandeau_id, pt.original_id id
        FROM
            pagecontent p
        LEFT JOIN page_translations pt
            ON pt.child_id = p.id
    `)

    const matchMediaSrc = /src="(.*?)"/gm

    pages = pages.map(page => {

        const blocks = (page.blocks && typeof page.blocks === "string") && JSON.parse(page.blocks)

        // retrieve media from blocks
        blocks.forEach(block => {

            if(block.type === "text"){

                const content = block.content
                const regexExecution = content && matchMediaSrc.exec(content)

                const matches = regexExecution && regexExecution.length && regexExecution.slice(1)

                if(matches){

                    const urlFromServeurImage = matches.filter(link => link.includes(ORIGIN_FROM_SERVEURIMAGE))
                    const urlWithPage = urlFromServeurImage.map(url => ({
                        media: url,
                        page: page.id
                    }))

                    mediaFromText.push(...urlWithPage)
                }
            }

            if(block.type === "carousel"){
                
                const list = block.content.data
                mediaFromCarousel.push(
                    ...list.map(m => ({
                        media: m.id,
                        page: page.id
                    }))
                )

            }
            
        })

        // bandeau
        if(page.bandeau_id){
            mediaFromBandeau.push({
                media: page.bandeau_id,
                page: page.id,
            })
        }

        return {
            ...page
        }

    })
    
    const fromText = await getMediaFromText(mediaFromText)
    media = [...fromText, ...mediaFromCarousel, ...mediaFromBandeau]


    // create association
    if(!dry){

        const associatingMedia = []

        media.forEach(({media: media_id, page: page_id}) => {


            associatingMedia.push(

                query(`
                
                    SELECT 
                        id
                    FROM media_page
                    WHERE media_id = ? AND page_id = ?
                `, [media_id, page_id]).then(res => {


                    if(res.length){
                        return true
                    } else {
                        
                        return query(`

                            INSERT INTO 
                                media_page
                            (media_id, page_id) VALUES (?, ?)
                        `, [media_id, page_id])

                    }

                })

            )


        })

        await Promise.all(associatingMedia)

    }

    
    return media
}

async function getMediaFromText(mediaFromText){

    let retrievingMediaFromText = mediaFromText.map(({media: link, page}) => {

        let upload_path = link.replace(ORIGIN_FROM_SERVEURIMAGE, "")
        let req = `
            SELECT
                id
            FROM medias
            WHERE public_path LIKE '%${upload_path}%'
        `

        return query(req).then(res => res ? {
            media: res[0].id,
            page,
        } : null)

    })

    retrievingMediaFromText = await Promise.all(retrievingMediaFromText)

    return retrievingMediaFromText

}