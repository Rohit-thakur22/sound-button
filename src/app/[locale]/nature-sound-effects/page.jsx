import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const NatureSoundEffects = () => {

  return (
    <>
      <head>
        <title>Nature Sound Effects: Free Ambient & Rain Sounds</title>
        <meta
          name="description"
          content="Discover and download calming nature sound effects, including rain, ambiance, and forest sounds. Perfect for relaxation, content creation, and ambiance setting."
        />
        <Script
          id="json-ld-nature-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/nature-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/nature-sound-effects/",
                  "name": "Nature Sound Effects - SoundEffectButtons",
                  "description":
                    "Explore a wide range of nature sound effects, including rain, thunder, birds, and more. Perfect for relaxation, meditation, and environmental soundscapes.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/nature-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/nature-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/nature-sound-effects/",
                  "name": "Nature Sound Effects",
                  "description":
                    "Discover soothing nature sound effects including rain, thunder, waves, and bird sounds. Perfect for calming your mind and creating peaceful environments.",
                  "keywords":
                    "nature sound effects, rain sound effects, thunder sound effects, bird sounds, nature sounds for relaxation, environmental sound effects, calming nature sound effects",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/nature-sound-effects/#breadcrumb",
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
                      "name": "Nature Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/nature-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>

      <Catalog 
        catAlias={'Nature Sound Effects'} 
        catUrl={'nature-sound-effects'} 
        catValue={'nature_sound_effects'}
        title={'nature_title'}
        description={"nature_description"}
        mobileDescription={'nature_mobileDescription'}
      />
    </>
  )
}

export default NatureSoundEffects