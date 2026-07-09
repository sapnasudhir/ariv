import { motion } from 'motion/react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

function VideoCard({ video, resetNonce, onPlay }) {
  const hasRealId = video.id && video.id !== 'PASTE_YOUTUBE_ID_HERE'

  return (
    <motion.article
      className="video-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
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
