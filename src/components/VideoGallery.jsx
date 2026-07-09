import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { videos } from '../data/videos'
import VideoCard from './VideoCard'

function VideoGallery() {
  const [resetNonces, setResetNonces] = useState({})
  const playingIdRef = useRef(null)

  const handlePlay = (id) => {
    const previousId = playingIdRef.current
    if (previousId && previousId !== id) {
      setResetNonces((nonces) => ({
        ...nonces,
        [previousId]: (nonces[previousId] || 0) + 1,
      }))
    }
    playingIdRef.current = id
  }

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
            <VideoCard
              video={video}
              resetNonce={resetNonces[video.id] || 0}
              onPlay={() => handlePlay(video.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default VideoGallery
