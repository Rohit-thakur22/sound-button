import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const TiktokSoundEffects = () => {

  return (
    <>
      <head>
        <title>TikTok Sound Effects: Viral Sounds for Your Videos</title>
        <meta
          name="description"
          content="Boost your TikTok videos with trending and viral sound effects. Ideal for creators looking to stand out with the latest TikTok sound trends."
        />
        <Script
          id="json-ld-tiktok-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/tiktok-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/tiktok-sound-effects/",
                  "name": "TikTok Sound Effects - SoundEffectButtons",
                  "description":
                    "Discover a collection of viral TikTok sound effects, including popular memes, music, and trends. Perfect for TikTok creators, video editors, and soundboard enthusiasts.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/tiktok-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/tiktok-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/tiktok-sound-effects/",
                  "name": "TikTok Sound Effects",
                  "description":
                    "Get the most viral TikTok sound effects, including popular meme sounds, viral music, and trendsetting audio clips for your videos.",
                  "keywords":
                    "TikTok sound effects, viral TikTok sounds, TikTok meme sounds, TikTok music sounds, trending TikTok sounds, TikTok audio clips, TikTok soundboard, viral TikTok audio",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/tiktok-sound-effects/#breadcrumb",
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
                      "name": "TikTok Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/tiktok-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>

      <Catalog 
        catAlias={'Tiktok Sound Effects'} 
        catUrl={'tiktok-sound-effects'} 
        catValue={'tiktok_sound_effects'}
        title={'tiktok_title'}
        description={"tiktok_description"}
        mobileDescription={'tiktok_mobileDescription'}
      />
    </>
  )
}

export default TiktokSoundEffects
