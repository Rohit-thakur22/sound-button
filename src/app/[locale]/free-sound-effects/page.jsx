import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const FreeSoundEffects = () => {

  return (
    <>
      <head>
        <title>Free Sound Effects: Copyright-Free Sounds for Every Project</title>
        <meta
          name="description"
          content="Access a wide range of free, copyright-free sound effects for personal and commercial use. Upload and download sounds for the SOUNDEFFECTBUTTONS leaderboard."
        />
        <Script
          id="json-ld-free-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/free-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/free-sound-effects/",
                  "name": "Free Sound Effects - SoundEffectButtons",
                  "description":
                    "Access a wide variety of free sound effects for personal or professional use. Download and use a range of sound effects from different categories including gaming, movies, and nature sounds.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/free-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/free-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/free-sound-effects/",
                  "name": "Free Sound Effects",
                  "description":
                    "Download free sound effects from a variety of categories like gaming, nature, horror, and more. Perfect for any project that requires high-quality sound without any cost.",
                  "keywords":
                    "free sound effects, free soundboard, downloadable sound effects, free sound clips, free sound effects for videos, free sound effects for games, free audio clips",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/free-sound-effects/#breadcrumb",
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
                      "name": "Free Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/free-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >

      <Catalog 
        catAlias={'Free Sound Effects'} 
        catUrl={'free-sound-effects'} 
        catValue={'free_sound_effects'}
        title={'free_title'}
        description={"free_description"}
        mobileDescription={'free_mobileDescription'}
      />
    </>
  )
}

export default FreeSoundEffects
