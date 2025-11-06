import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const HumanSoundEffects = () => {

  return (
    <>
      <head>
        <title>Human Sound Effects: Laughs, Claps & More</title>
        <meta
          name="description"
          content="Add life to your content with free human sound effects, including laughing, clapping, and humming sounds. Perfect for realistic audio in videos, games, and stream."
        />
        <Script
          id="json-ld-human-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/human-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/human-sound-effects/",
                  "name": "Human Sound Effects - SoundEffectButtons",
                  "description":
                    "Explore a variety of human sound effects including laughs, screams, yawns, and more. Download high-quality sounds for your videos, projects, or media.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/human-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/human-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/human-sound-effects/",
                  "name": "Human Sound Effects",
                  "description":
                    "Download human sound effects such as laughs, cries, coughs, and other vocalizations for use in your projects, games, videos, and soundboards.",
                  "keywords":
                    "human sound effects, laugh sound effects, scream sound effects, human soundboard, crying sounds, yawning sound effects, human voice sound effects, vocal sound effects, download human sounds",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/human-sound-effects/#breadcrumb",
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
                      "name": "Human Sound Effects",
                      "item":
                        "https://www.soundeffectbuttons.com/human-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>

      <Catalog 
        catAlias={'Human Sound Effects'} 
        catUrl={'human-sound-effects'} 
        catValue={'human_sound_effects'}
        title={'human_title'}
        description={"human_description"}
        mobileDescription={'human_mobileDescription'}
      />
    </>
  )
}

export default HumanSoundEffects

