// Video list is generated from ../../videos.txt — edit that file, not this one.
import rawVideos from '../../videos.txt?raw'

function extractYouTubeId(url) {
  if (!url) return 'PASTE_YOUTUBE_ID_HERE'

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtube\.com\/embed\/|youtu\.be\/)([\w-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return 'PASTE_YOUTUBE_ID_HERE'
}

function parseVideos(text) {
  const blocks = text
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter((block) => block && !block.startsWith('#'))

  return blocks
    .map((block) => {
      const title = block.match(/^Title:\s*(.*)$/m)?.[1]?.trim() ?? ''
      const creator = block.match(/^Creator:\s*(.*)$/m)?.[1]?.trim() ?? ''
      const link = block.match(/^Link:\s*(.*)$/m)?.[1]?.trim() ?? ''
      const twist = block.match(/^Twist:\s*(.*)$/m)?.[1]?.trim() ?? ''

      if (!title) return null

      return {
        title,
        creator,
        id: extractYouTubeId(link),
        twist,
      }
    })
    .filter(Boolean)
}

export const videos = parseVideos(rawVideos)
