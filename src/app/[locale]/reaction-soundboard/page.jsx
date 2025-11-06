import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const ReactionSoundboard = () => {

  return (
    <>
      <head>
        <title>Reaction Soundboard: Laughter, Applause & Reaction Sounds
        </title>
        <meta
          name="description"
          content="Add perfect reaction sounds to your content, from applause to gasps. Great for enhancing videos, streams, and live interactions."
        />
        <Script
          id="json-ld-reaction-soundboard"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/reaction-soundboard/#webpage",
                  "url": "https://www.soundeffectbuttons.com/reaction-soundboard/",
                  "name": "Reaction Soundboard - SoundEffectButtons",
                  "description":
                    "Explore a collection of reaction sound effects. From laughter to shocking responses, download high-quality sound effects for your projects and entertainment.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/reaction-soundboard/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/reaction-soundboard/#library",
                  "url": "https://www.soundeffectbuttons.com/reaction-soundboard/",
                  "name": "Reaction Soundboard",
                  "description":
                    "Discover a variety of reaction sound effects, including laughter, shock, surprise, and more. Perfect for your memes, videos, and social media posts.",
                  "keywords":
                    "reaction sound effects, reaction soundboard, meme reaction sounds, funny reaction sounds, shocking sound effects, surprise soundboard, reaction sounds for videos, download reaction sound effects",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/reaction-soundboard/#breadcrumb",
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
                      "name": "Reaction Soundboard",
                      "item": "https://www.soundeffectbuttons.com/reaction-soundboard/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >

      <Catalog 
        catAlias={'Reaction Soundboard'} 
        catUrl={'reaction-soundboard'} 
        catValue={'reaction_soundboard'}
        title={'reaction_title'}
        description={"reaction_description"}
        mobileDescription={'reaction_mobileDescription'}
      />
    </>
  )
}

export default ReactionSoundboard