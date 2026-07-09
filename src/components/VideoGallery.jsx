import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { videos } from '../data/videos'
import VideoCard from './VideoCard'

function VideoGallery() {
  return (
    <section className="video-gallery" id="videos">
      <h2>Cooking Trends I'm Loving Right Now</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.title}>
            <VideoCard video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default VideoGallery
