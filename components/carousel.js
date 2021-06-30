import React, { useState } from 'react'
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/swiper-bundle.css';
import Image from 'next/image'
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
    const closeModal = (index) => {
        var newArray = [...openArray];
        newArray[index] = false;
        setOpenArray(newArray);
    }
    return (
        <div className="screen">
            <div className="h-auto my-6 overflow-hidden bg-white rounded-xl md:max-w-full mb-9">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    navigation={{ clickable: true }}
                    /*onSlideChange={() => console.log('slide change')}*/
                    /*onSwiper={swiper => console.log(swiper)}*/
                    style={{  '--swiper-navigation-color': 'transparent' }}
                >
                    {imgList.map((img, i) => (
                        <SwiperSlide key={id + '-' + i}>
                            <div className='flex flex-col items-center' >
                                <button type="button" className="button" onClick={() => openModal(i)}>
                                    <div className='rounded-xl'>
                                        <Image className="full rounded-xl" src={img.url} alt={`slide ${i + 1}`}
                                            layout="intrinsic"
                                            width={1280}
                                            height={960}
                                        />
                                    </div>
                                    {img.legende && <div className="flex justify-center">{img.legende}</div>
                                    }
                                </button>
                                <Popup open={openArray[i]} closeOnDocumentClick onClose={() => closeModal(i)}>
                                    <div className="modal flex justify-between ">
                                        <button className="close stroke-current text-red-600 absolute -top-6 -right-5  "  onClick={() =>  closeModal(i)}>
                                            &times;
                                        </button>
                                        <img className="full rounded-xl " src={img.url} alt={`slide ${i + 1}`} />
                                        {img.legende && <div className="flex justify-center ">{img.legende}</div>
                                        }
                                    </div>
                                </Popup>
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center">{legende}</div>
            </div>
        </div>
    );
}
