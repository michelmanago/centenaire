// libs
import React, { useEffect, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';

// utils
import { legendeAsArray } from '../utils/utils-media';

// components
import {ImageModalContainer} from "./Popup/imageModal"
import IconCopyrights  from "./icons/IconCopyright"

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// styles
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

export default function Carousel({ imgList, legende, id }) {

    // router
    const { locale } = useRouter();
    
    // states
    const [imageModal, setImageModal] = useState(null)
    const [imgListState, setImgListState] = useState([]);
    const [isFetch, setIsFetch] = useState(false);

    // utils
    const mediaUrl = `${process.env.NEXT_PUBLIC_SERVER_IMAGE}`;

    // effects
    useEffect(async () => {
        if (!isFetch) {
            var dataObj = [];
            const responses = await Promise.all(imgList.map(media => fetch(`/api/media/${media.id}`)));
            /*responses.forEach(async (response, index) => {
                //const resJSON = JSON.parse(response._bodyInit);
                const resJSON = await response.json();
                dataObj.push(resJSON);
            });*/
            for (const response of responses) {
                const resJSON = await response.json();
                dataObj.push(resJSON);
            }
            if (dataObj.length != 0) {
                setImgListState(dataObj);
                setIsFetch(true);
            }
        }
    });

    // methods
    const openImageModal = media => {


        let item = {
            url: `${mediaUrl}${media.public_path}`,
            className: "",
            legende: media.legende ? getLocaleLegende(media.legende) : "",
            credit: media.credit,
        }

        setImageModal(item)
        

    }

    // helpers
    const getLocaleLegende = legendes => {
        // get legendes as Array of {legende<string>, value<string>}
        let arrayOfLegende = legendeAsArray(legendes);

        let localeLegende = arrayOfLegende ? arrayOfLegende.find(l => l.locale === locale) : null;
        return localeLegende ? localeLegende.value : '';
    };

    return (
        <div>
            <div className="h-auto my-6 overflow-hidden bg-white md:max-w-full w-2/3 mx-auto">


                {/* Modal */}
                <Popup
                    modal
                    onClose={() => setImageModal(null)}
                    open={!!imageModal}
                    overlayStyle={overlayStyle}
                >
                    {
                        close => imageModal ? (
                            <div className="bg-gray-100">
                                <ImageModalContainer
                                    url={imageModal.url}
                                    legende={imageModal.legende}
                                    credit={imageModal.credit}
                                    close={close}
                                />
                            </div>
                        ) : ""
                    }
                </Popup>



                {/* Carousel */}
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={{ clickable: true }}
                    style={{ '--swiper-navigation-color': 'transparent' }}
                >
                    {imgListState.map(img => {

                        // data
                        const legende = getLocaleLegende(img.legende);
                        const credit = img.credit
                        const imageSrc = `${mediaUrl}${img.public_path}`

                        return (
                            <SwiperSlide key={img.public_path}>
                                <div className="flex flex-col items-center">

                                    {/* Copyright tooltip */}
                                    {
                                        credit && (
                                            <Popup
                                                on={["hover"]}
                                                position={["right center", "bottom center"]}
                                                trigger={
                                                    <span className="absolute left-4 top-4 text-gray-400 hover:opacity-70 cursor-pointer">
                                                        <IconCopyrights size={"34px"}/>
                                                    </span>
                                                }
                                            >
                                                <div className="border bg-gray-100">
                                                    {credit}
                                                </div>
                                            </Popup>
                                        )
                                    }

                                    {/* Trigger moadl */}
                                    <button className="absolute w-10/12 h-full" type="button" onClick={() => openImageModal(img)}></button>

                                    {/* Clickable image */}
                                    <div>

                                        {/* Image */}
                                        <img 
                                            src={imageSrc} 
                                            alt=""
                                        />

                                        {/* Info */}
                                        {
                                            (legende || credit) && (
                                                <div className="mt-2">
                                                    {legende && <p className='text-center'>{legende}</p>}
                                                    {credit && <p className='italic text-center'>{credit}</p>}
                                                </div>
                                            )
                                        }

                                    </div>

                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
    
                {/* Legende carousel */}
                <p className="text-center font-bold">{legende}</p>

            </div>
        </div>
    );
}
