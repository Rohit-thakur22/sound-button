import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const MemeSoundboard = () => {

  return (
    <>
      <head>
        <title>Meme Soundboard: Hilarious Meme Sound Effect Buttons</title>
        <meta
          name="description"
          content="Enjoy our meme soundboard filled with laugh-out-loud sounds and copyright-free meme background music. Perfect for memes and streams."
        />
        <Script
          id="json-ld-meme-soundboard"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/meme-soundboard/#webpage",
                  "url": "https://www.soundeffectbuttons.com/meme-soundboard/",
                  "name": "Meme Soundboard - SoundEffectButtons",
                  "description":
                    "Discover the ultimate collection of meme soundboards. Access a wide range of funny, viral, and iconic meme sound effects in one place.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/meme-soundboard/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/meme-soundboard/#library",
                  "url": "https://www.soundeffectbuttons.com/meme-soundboard/",
                  "name": "Meme Soundboard",
                  "description":
                    "Access an extensive collection of meme soundboard buttons. From classic memes to viral hits, find all the essential sounds for your content creation.",
                  "keywords":
                    "meme soundboard, meme soundbord, meme sound bord, sound board meme, memes soundboard, meme soundboard buttons, meme soundboards",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/meme-soundboard/#breadcrumb",
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
                      "name": "Meme Soundboard",
                      "item": "https://www.soundeffectbuttons.com/meme-soundboard/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >
      <Catalog 
        catAlias={'Meme Soundboard'} 
        catUrl={'meme-soundboard'} 
        catValue={'meme_soundboard'}
        title={'meme_title'}
        description={"meme_description"}
        mobileDescription={'meme_mobileDescription'}
      />
    </>
  )
}

export default MemeSoundboard
