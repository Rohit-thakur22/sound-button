import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';
const PrankSoundboard = () => {

  return (
    <>
      <head>
        <title>Prank Soundboard: Fun Sound Effects for Pranks & Reactions
        </title>
        <meta
          name="description"
          content="Download prank sound effects from air horns to fake phone rings. Perfect for prank videos, jokes, and reactions."
        />
        <Script
          id="json-ld-prank-soundboard"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/prank-soundboard/#webpage",
                  "url": "https://www.soundeffectbuttons.com/prank-soundboard/",
                  "name": "Prank Soundboard - SoundEffectButtons",
                  "description":
                    "Get the funniest prank sound effects and prank soundboard buttons online. Enjoy a collection of prank sounds to add humor to your calls, streams, and pranks.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/prank-soundboard/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/prank-soundboard/#library",
                  "url": "https://www.soundeffectbuttons.com/prank-soundboard/",
                  "name": "Prank Soundboard",
                  "description":
                    "Discover hilarious prank sound effects and prank soundboard buttons. Access a vast collection of prank sounds online for calls, live streams, and more.",
                  "keywords":
                    "prank sound effects, pranks soundboard, prank sound effects, pranx soundboard, prank soundboard, prank sounds online, prank buttons, soundboard prank, prank sound effect",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/prank-soundboard/#breadcrumb",
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
                      "name": "Prank Soundboard",
                      "item": "https://www.soundeffectbuttons.com/prank-soundboard/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >


      <Catalog 
        catAlias={'Prank Soundboard'} 
        catUrl={'prank-soundboard'} 
        catValue={'prank_soundboard'}
        title={'prank_title'}
        description={"prank_description"}
        mobileDescription={'prank_mobileDescription'}
      />
    </>
  )
}

export default PrankSoundboard