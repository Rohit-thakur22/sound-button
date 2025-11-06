import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const BirdsSoundEffects = () => {

  return (
    <>
      <head>
        <title>Birds Sound Effects: Chirping, Tweeting & Flock Sounds</title>
        <meta
          name="description"
          content="Download soothing bird sound effects, from chirping to flock sounds. Great for relaxation, nature-themed projects, and audio therapy."
        />
        <Script
          id="json-ld-birds-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/birds-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/birds-sound-effects/",
                  "name": "Birds Sound Effects - SoundEffectButtons",
                  "description":
                    "Explore a collection of bird sound effects. From chirping sparrows to majestic eagles, download high-quality bird sounds for your projects, videos, and more.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/birds-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/birds-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/birds-sound-effects/",
                  "name": "Birds Sound Effects",
                  "description":
                    "Discover a wide range of bird sound effects including the calls of sparrows, eagles, owls, and more. Perfect for your media, projects, and nature-themed videos.",
                  "keywords":
                    "bird sound effects, bird sounds, bird call sound effects, nature sound effects, bird soundboard, birds chirping sounds, bird song effects, download free bird sound effects, bird soundboard, download bird sound effects",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/birds-sound-effects/#breadcrumb",
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
                      "name": "Birds Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/birds-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >
      <Catalog 
        catAlias={'Birds Sound Effects'} 
        catUrl={'birds-sound-effects'} 
        catValue={'birds_sound_effects'}
        title={'birds_title'}
        description={"birds_description"}
        mobileDescription={'birds_mobileDescription'}
      />
    </>
  )
}

export default BirdsSoundEffects

