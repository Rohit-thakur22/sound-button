import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const RoyaltyFreeMusic = () => {

  return (
    <>
      <head>
        <title>  Royalty-Free Music: No Sound Buttons for Projects
        </title>
        <meta
          name="description"
          content="Download royalty-free music for videos, podcasts, and ringtones. Choose from various genres for personal and commercial use."
        />
        <Script
          id="json-ld-royalty-free-music"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/royalty-free-music/#webpage",
                  "url": "https://www.soundeffectbuttons.com/royalty-free-music/",
                  "name": "Royalty-Free Music - SoundEffectButtons",
                  "description":
                    "Access a wide range of royalty-free music tracks for your videos, presentations, and projects. Download high-quality music with no copyright issues.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/royalty-free-music/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/royalty-free-music/#library",
                  "url": "https://www.soundeffectbuttons.com/royalty-free-music/",
                  "name": "Royalty-Free Music",
                  "description":
                    "Browse a collection of high-quality royalty-free music tracks. Perfect for creators looking for background music for videos, podcasts, games, and more.",
                  "keywords":
                    "royalty-free music, free music downloads, no copyright music, background music, royalty-free music tracks, music for videos, free music for YouTube, music for podcasts",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/royalty-free-music/#breadcrumb",
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
                      "name": "Royalty-Free Music",
                      "item": "https://www.soundeffectbuttons.com/royalty-free-music/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >
      <Catalog 
        catAlias={'Royalty Free Music'} 
        catUrl={'royalty-free-music'} 
        catValue={'royalty_free_music'}
        title={'royaltyfree_title'}
        description={"royaltyfree_description"}
        mobileDescription={'royaltyfree_mobileDescription'}
      />
    </>
  )
}

export default RoyaltyFreeMusic
