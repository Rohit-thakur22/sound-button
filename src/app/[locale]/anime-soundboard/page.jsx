import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const AnimeSoundboard = () => {

  return (
    <>
      <head>
        <title>Anime Soundboard: Iconic Anime Voice Clips & Sound Effects</title>
        <meta
          name="description"
          content="Dive into our anime soundboard for high-quality anime sound effects. Perfect for anime fans and creators looking to enhance their anime content."
        />
        <Script
          id="json-ld-anime-soundboard"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/anime-soundboard/#webpage",
                  "url": "https://www.soundeffectbuttons.com/anime-soundboard/",
                  "name": "Anime Soundboard - SoundEffectButtons",
                  "description":
                    "Explore a vast collection of anime soundboard buttons. Access iconic anime sound effects, voice clips, and sus anime sounds in one place.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/anime-soundboard/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/anime-soundboard/#library",
                  "url": "https://www.soundeffectbuttons.com/anime-soundboard/",
                  "name": "Anime Soundboard",
                  "description":
                    "Access the best anime soundboard buttons. From iconic anime voice clips to sus anime sounds, find all the essential sounds for your anime content.",
                  "keywords":
                    "anime soundboard, sus anime soundboard, anime voice clips, anime sound board",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/anime-soundboard/#breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.soundeffectbuttons.com/",
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Anime Soundboard",
                      "item": "https://www.soundeffectbuttons.com/anime-soundboard/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >

      <Catalog 
        catAlias={'Anime Soundboard'} 
        catUrl={'anime-soundboard'} 
        catValue={'anime_soundboard'}
        title={'anime_title'}
        description={"anime_description"}
        mobileDescription={'anime_mobileDescription'}
      />
    </>
  )
}

export default AnimeSoundboard

