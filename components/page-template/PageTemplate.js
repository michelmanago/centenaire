// libs
import htmlParse from 'html-react-parser';
import {Fragment} from 'react';
import {getMediaLink} from '../../utils/utils-serveur-image';
import Carousel from '../carousel';

export default function PageTemplate({page}) {
    return (
        <div className="">
            {/* Banner */}
            {page.bandeau && (
                <div style={{height: 300}} className="border">
                    <img
                        className="block object-cover w-full h-full"
                        src={getMediaLink(page.bandeau.public_path)}
                        alt=""
                    />
                </div>
            )}

            {/* Content */}

            <div className="max-w-screen-xl px-10 py-10 mx-auto bg-white border">
                <h1 className="mb-10 text-5xl font-bold">{page.pageName}</h1>

                {/* Render blocks */}
                {page &&
                    page.blocks.map(block => {
                        if (block.type === 'text') {
                            return <Fragment key={block.id}>{htmlParse(block.content)}</Fragment>;
                        } else if (block.type === 'carousel') {
                            return (
                                <Fragment key={block.id}>
                                    <Carousel imgList={block.content} id={block.id} />
                                </Fragment>
                            );
                        }
                    })}
            </div>
        </div>
    );
}
