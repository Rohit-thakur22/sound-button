import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const FunnySoundEffects = ({ params }) => {
  const { locale } = params;

  return (
    <>
      <head>
        <title>Funny Sound Effects: Hilarious Sounds & Meme Sounds</title>
        <meta
          name="description"
          content="Browse and download funny sound effects, including laughter and meme sounds. Free and perfect for comedic videos, memes, and social media content."
        />
        <Script
          id="json-ld-funny-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/funny-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/funny-sound-effects/",
                  "name": "Funny Sound Effects - SoundEffectButtons",
                  "description":
                    "Browse a wide collection of funny sound effects, from hilarious memes to classic comedy sounds, perfect for pranks, videos, and adding humor to any situation.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/funny-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/funny-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/funny-sound-effects/",
                  "name": "Funny Sound Effects",
                  "description":
                    "Get access to the funniest sound effects, including popular memes, funny voices, and silly sounds, perfect for pranks, videos, and comedic content.",
                  "keywords":
                    "funny sound effects, meme sounds, comedy sound effects, prank sounds, funny soundboard, funny voice clips, silly sound effects, laugh sound effects",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/funny-sound-effects/#breadcrumb",
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
                      "name": "Funny Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/funny-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >

      <Catalog 
        catAlias={'Funny Sound Effects'} 
        catUrl={'funny-sound-effects'} 
        catValue={'funny_sound_effects'}
        title={'funny_title'}
        description={"funny_description"}
        mobileDescription={'funny_mobileDescription'}
        locale={locale}
      />
    </>
  )
}

export default FunnySoundEffects
