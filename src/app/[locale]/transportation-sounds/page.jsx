import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const TransportationSound = () => {

  return (
    <>
      <head>
        <title> Transportation Sound Effects: Car, Train, & Airplane Sounds
        </title>
        <meta
          name="description"
          content=" Access original transportation sounds, from cars to fighter jets. Perfect for travel content, projects, and pranks."
        />
        <Script
          id="json-ld-transportation-sounds"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/transportation-sounds/#webpage",
                  "url": "https://www.soundeffectbuttons.com/transportation-sounds/",
                  "name": "Transportation Sound Effects - SoundEffectButtons",
                  "description":
                    "Explore a wide variety of transportation sound effects including car horns, train whistles, and airplane engines. Perfect for your projects, videos, and media.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/transportation-sounds/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/transportation-sounds/#library",
                  "url": "https://www.soundeffectbuttons.com/transportation-sounds/",
                  "name": "Transportation Sound Effects",
                  "description":
                    "Find various transportation sound effects such as car horns, trains, motorcycles, and more. Download high-quality sounds for use in your videos, presentations, and games.",
                  "keywords":
                    "transportation sound effects, car sound effects, train sound effects, airplane sound effects, motorcycle sound effects, vehicle soundboard, transportation soundboard, download transportation sounds",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/transportation-sounds/#breadcrumb",
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
                      "name": "Transportation Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/transportation-sounds/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >
      <Catalog 
        catAlias={'Transportation Sound'} 
        catUrl={'transportation-sounds'} 
        catValue={'transportation_sounds'}
        title={'transportation_title'}
        description={"transportation_description"}
        mobileDescription={'transportation_mobileDescription'}
      />
    </>

  )
}

export default TransportationSound
