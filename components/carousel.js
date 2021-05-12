// import Swiper core and required components
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// import Swiper styles
import 'swiper/swiper-bundle.css';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Carousel({imgList}) {
    return (
        <div className="w-3/4 h-auto m-6 mx-auto overflow-hidden bg-white rounded-xl md:max-w-full mb-9">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                navigation={{clickable: true}}
                onSlideChange={() => console.log('slide change')}
                onSwiper={swiper => console.log(swiper)}
                style={{'--swiper-navigation-color': 'white'}}
            >
                {imgList.map((img, i) => (
                    <SwiperSlide>
                        <img className="full" src={img.url} alt={`slide ${i + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
