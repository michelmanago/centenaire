import React from 'react';
// import Swiper core and required components
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// import Swiper styles
import 'swiper/swiper-bundle.css';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Carousel({imgList, legende, id}) {
    const mediaUrl = `${process.env.NEXT_PUBLIC_SERVER_IMAGE}`;
    return (
        <div className="h-auto mx-auto my-6 overflow-hidden bg-white md:w-3/4 rounded-xl md:max-w-full mb-9">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                navigation={{clickable: true}}
                /*onSlideChange={() => console.log('slide change')}*/
                /*onSwiper={swiper => console.log(swiper)}*/
                style={{'--swiper-navigation-color': 'transparent'}}
            >
                {imgList.map((img, i) => (
                    <SwiperSlide key={id + '-' + i}>
                        <div className='flex flex-col items-center'>
                            <img className="full rounded-xl" src={`${mediaUrl}${img.public_path}`} alt={`slide ${i + 1}`} />
                            {img.legende && <div className="flex justify-center">{img.legende}</div>}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex justify-center">{legende}</div>
        </div>
    );
}
