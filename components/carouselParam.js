import React, { useState } from 'react';
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/swiper-bundle.css';

import Popup from 'reactjs-popup';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Carousel({ imgList, legende, id }) {
    const [open, setOpen] = useState(false);
    const [openArray, setOpenArray] = useState(() => {
        var array = array = Array.apply(null, { length: imgList.length }).map(function () { return false; });
        return array;
    })

    const openModal = (index) => {
        var newArray = [...openArray];
        newArray[index] = true;
        setOpenArray(newArray);
    }
    const closeModal = () => setOpen(false);


    const mediaUrl = `${process.env.NEXT_PUBLIC_SERVER_IMAGE}`;

    return (
        <div className="popup">
            <div className="h-auto my-6 overflow-hidden bg-white rounded-xl md:max-w-full mb-9">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    navigation={{ clickable: true }}
                    /*onSlideChange={() => console.log('slide change')}*/
                    /*onSwiper={swiper => console.log(swiper)}*/
                    style={{ '--swiper-navigation-color': 'transparent' }}
                >
                    {imgList && imgList.map((img, i) => (
                        <SwiperSlide key={id + '-' + i}>
                            <div className='flex flex-col items-center'>
                                <button className='' type="button" className="button" onClick={() => setOpen(o => !o)}>
                                    <img className="full rounded-xl" src={`${mediaUrl}${img.public_path}`} alt={`slide ${i + 1}`} />
                                    {img.legende && <div className="flex justify-center">{img.legende}</div>
                                    }
                                </button>
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            <Popup open={open} className='popimage ' closeOnDocumentClick={false} onClick={() => openModal(i)} >

                <div className="max-w-screen-xl mx-auto    ">
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        loop={true}
                        navigation={{ clickable: true }}
                        /*onSlideChange={() => console.log('slide change')}*/
                        /*onSwiper={swiper => console.log(swiper)}*/
                        style={{ '--swiper-navigation-color': 'transparent' }}
                    >
                        {imgList.map((img, i) => (
                            <SwiperSlide key={id + '-' + i}>
                                <div className='flex flex-col items-center ' >
                                    <button className="closeModal  m-10 close stroke-current text-black-600 " onClick={closeModal}>
                                        &times;
                                    </button>
                                    <img className="full  " src={`${mediaUrl}${img.public_path}`} alt={`slide ${i + 1}`} />
                                    {img.legende && <div className="flex justify-center  ">{img.legende}</div>
                                    }

                                </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </Popup>


            <div className="flex justify-center">{legende}</div>
        </div>
    );
}
