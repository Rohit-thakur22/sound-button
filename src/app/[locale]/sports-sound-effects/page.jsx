import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const SportsSoundEffects = () => {

  return (
    <>
      <head>
        <title>Sports Sound Effects: Crowd Cheers, Whistles & Game Audio</title>
        <meta
          name="description"
          content=" Energize your sports projects with sound effects like crowd cheers, whistle blows, and sports-specific sounds. Perfect for sports videos and broadcasts."
        />
        <Script
          id="json-ld-sports-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/sports-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/sports-sound-effects/",
                  "name": "Sports Sound Effects - SoundEffectButtons",
                  "description":
                    "Explore a wide variety of sports sound effects, including crowd noises, whistles, goal celebrations, and other iconic sounds from the world of sports.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/sports-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/sports-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/sports-sound-effects/",
                  "name": "Sports Sound Effects",
                  "description":
                    "Get access to the best sports sound effects, including crowd cheers, whistles, game celebrations, and other iconic sounds used in sports videos.",
                  "keywords":
                    "sports sound effects, sports soundboard, crowd noises, game celebration sounds, whistle sound effects, football sounds, basketball sound effects, sports audio clips",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/sports-sound-effects/#breadcrumb",
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
                      "name": "Sports Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/sports-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >

      <Catalog 
        catAlias={'Sports Sound Effects'} 
        catUrl={'sports-sound-effects'} 
        catValue={'sports_sound_effects'}
        title={'sports_title'}
        description={"sports_description"}
        mobileDescription={'sports_mobileDescription'}
      />
    </>
  )
}

export default SportsSoundEffects
