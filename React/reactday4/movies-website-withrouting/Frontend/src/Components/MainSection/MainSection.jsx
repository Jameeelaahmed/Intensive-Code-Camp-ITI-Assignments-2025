import classes from './MainSection.module.css'
import img from '../../assets/mainImg.png'
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
function MainSection() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/movies")
            .then((res) => res.json())
            .then((data) => {
                setMovies(data || []);
                console.log(data)
            })
            .catch((err) => {
                console.error("Error fetching movies:", err);
                setMovies([]);
            });
    }, []);
    return (
        <div className={classes.main}>
            <img src={img} alt="MainImg" />
            <p className={classes.movie_hero_text}>Where every story begins with a spark of magic.</p>
            <div className={classes.overlay}></div>
            <div className={classes.swi_container}>

                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="swiper_container"
                >
                    {movies.map((movie) => (

                        <SwiperSlide>
                            <img src={movie.image_url} alt="slide_image" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* </div> */}
        </div>
    )
}

export default MainSection
