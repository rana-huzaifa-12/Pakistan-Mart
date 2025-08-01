import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const projectImages = [
    { src: '/i1.jpg' },
    { src: '/i6.jpg' },
    { src: '/i4.jpg' },
    { src: '/i7.jpg' },
    { src: '/i1.jpg' },
    { src: '/i6.jpg' },
    { src: '/i3.jpg' },
    { src: '/i7.jpg' },
    { src: '/i4.jpg' },
    { src: '/i5.jpg' },
    { src: '/i6.jpg' },
];

const SimpleSwiper = () => {
    return (
        <div className="py-12 bg-gradient-to-r from-orange-50 via-gray-300 to-gray-200">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-zinc-800 mb-10">
                <span className="text-orange-500">Products</span> Showcase
            </h2>

            <div className="max-w-6xl mx-auto px-4">
                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={20}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    modules={[Autoplay]}
                >
                    {projectImages.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                                <img
                                    src={item.src}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SimpleSwiper;
