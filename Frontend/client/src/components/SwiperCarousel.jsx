import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const projectImages = [
    { src: '/m1.jpg' },
    { src: '/m2.jpg' },
    { src: '/m3.jpg' },
    { src: '/m4.jpg' },
    { src: '/m5.jpg' },
    { src: '/m6.jpg' },
    { src: '/m7.jpg' },
    { src: '/m8.jpg' },
    { src: '/m9.jpg' },
    { src: '/m10.jpg' },
    { src: '/m11.jpg' },
    { src: '/m12.jpg' },
    { src: '/m13.jpg' },
    { src: '/m14.jpg' },
    { src: '/m15.jpg' },
    { src: '/m16.jpg' },
    { src: '/m17.jpg' },
    { src: '/m18.jpg' }
];

const SimpleSwiper = () => {
    return (
        <div className="py-6 md:py-12 bg-gradient-to-r from-orange-100 via-gray-300 to-gray-200">
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
                        <SwiperSlide key={index} className="flex justify-center">
                            <div className="w-full h-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                                <img
                                    src={item.src}
                                    alt={`product-${index}`}
                                    className="w-full h-full object-cover"
                                    style={{ aspectRatio: '4 / 3', minHeight: '250px' }}
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
