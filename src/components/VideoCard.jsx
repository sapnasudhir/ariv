import { motion } from 'motion/react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

function VideoCard({ video, resetNonce, onPlay, index = 0 }) {
  const hasRealId = video.id && video.id !== 'PASTE_YOUTUBE_ID_HERE'

  return (
    <motion.article
      className="video-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        opacity: { duration: 0.3, delay: index * 0.05 },
        y: { type: 'spring', stiffness: 300, damping: 24, delay: index * 0.05 },
        scale: { type: 'spring', stiffness: 400, damping: 20 },
      }}
    >
      <div className="video-card-media">
        {hasRealId ? (
          <LiteYouTubeEmbed
            key={resetNonce}
            id={video.id}
            title={video.title}
            onIframeAdded={onPlay}
          />
        ) : (
          <span className="video-card-placeholder">Paste a YouTube ID in src/data/videos.js</span>
        )}
      </div>
      <h3>{video.title}</h3>
      <p className="video-card-creator">{video.creator}</p>
      {video.twist && <p className="video-card-twist">{video.twist}</p>}
    </motion.article>
  )
}

export default VideoCard
