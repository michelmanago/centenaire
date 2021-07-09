import React, { useState } from 'react';
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/swiper-bundle.css';

import {useRouter} from 'next/router';
import Popup from 'reactjs-popup';
import { legendeAsArray } from '../utils/utils-media';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Carousel({ imgList, legende, id }) {

    // states
    const [open, setOpen] = useState(false);
    const [openArray, setOpenArray] = useState(() => {
        var array = array = Array.apply(null, { length: imgList.length }).map(function () { return false; });
        return array;
    })
    
    // methods
    const openModal = (index) => {
        var newArray = [...openArray];
        newArray[index] = true;
        setOpenArray(newArray);
    }
    const closeModal = (index) => {
        var newArray = [...openArray];
        newArray[index] = false;
        setOpenArray(newArray);
    }


    // others
    const mediaUrl = `${process.env.NEXT_PUBLIC_SERVER_IMAGE}`;

    // router
    const {locale} = useRouter()

    // helpers
    const renderLegende = legendes => {

        // get legendes as Array of {legende<string>, value<string>}
        let arrayOfLegende = legendeAsArray(legendes)

        let localeLegende = arrayOfLegende ? arrayOfLegende.find(l => l.locale === locale) : null
        return localeLegende ? localeLegende.value : ""

    }

    return (
        <div className="popup">
            <div className="h-auto my-6 overflow-hidden bg-white rounded-xl md:max-w-full mb-9">


                {/* Carousel */}
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    navigation={{ clickable: true }}
                    /*onSlideChange={() => console.log('slide change')}*/
                    /*onSwiper={swiper => console.log(swiper)}*/
                    style={{ '--swiper-navigation-color': 'transparent' }}
                >
                  {imgList.map((img, i) => {

                      const theLegende = renderLegende(img.legende)

                    return (
                        <SwiperSlide key={id + '-' + i}>
                            <div className='flex flex-col items-center' >
                                <button className='' type="button" className="button" onClick={() => openModal(i)}>
                                <img className="full  " src={`${mediaUrl}${img.public_path}`} alt={`slide ${i + 1}`} />
                                    {theLegende && <div className="flex justify-center  ">{theLegende}</div>
                                    }
                                </button>
                               
                                <Popup open={openArray[i] } className='popimage ' closeOnDocumentClick={false} onClick={() => openModal(i)}>
                                    <div className="max-w-screen-xl mx-auto ">
                                            <button className="closeModal  m-10 close stroke-current text-black-600 " onClick={() => closeModal(i)}>
                                                &times;
                                            </button>
                                            <img className="full  " src={`${mediaUrl}${img.public_path}`} alt={`slide ${i + 1}`} />
                                        {theLegende && <div className="flex justify-center text-white">{theLegende}</div>
                                        }
                                    </div>
                                </Popup>
                            </div>

                        </SwiperSlide>
                    )

                  })}
                </Swiper>
                    
            </div>


           


            <div className="flex justify-center">{legende}</div>
        </div>
    );
}
