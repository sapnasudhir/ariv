import nutellaPhoto from '../assets/about/ariv-nutella.jpg'
import yuleLogPhoto from '../assets/about/ariv-yule-log.jpg'

const photos = [
  {
    src: nutellaPhoto,
    alt: 'Ariv and his sister digging a spoon into a jar of Nutella',
    caption:
      "Me and my sister found chocolate treasure hiding in a jar — one spoon for her, one spoon for me, no sharing the map.",
    rotate: -2,
  },
  {
    src: yuleLogPhoto,
    alt: 'Ariv clapping in front of a chocolate strawberry yule log he made',
    caption:
      "I built a chocolate log in the forest of our kitchen and covered it in strawberry jewels. Clap once if you're impressed.",
    rotate: 2,
  },
]

function AboutMe() {
  return (
    <section className="about" id="about">
      <h2>My Kitchen World</h2>
      <p className="about-intro">
        I'm Ariv. I like recipes that turn into something wild — melty lava
        cakes, crunchy dragon-spice chicken, anything that looks like its own
        little world on a plate. My mom lets me be the builder in the
        kitchen, and every dish is my shot at impressing my friends with
        something they've never seen.
      </p>
      <div className="about-photos">
        {photos.map((photo) => (
          <figure
            className="about-photo-card"
            style={{ '--rotate': `${photo.rotate}deg` }}
            key={photo.src}
          >
            <img src={photo.src} alt={photo.alt} />
            <figcaption className="about-photo-caption">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default AboutMe
