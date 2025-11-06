import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const AnimalSoundEffects = ({ params }) => {
  const { locale } = params;

  return (
    <>
      <head>
        <title>Animal Sound Effects: Sounds from Insects to Dinosaurs</title>
        <meta
          name="description"
          content=" Get realistic animal sounds from tiny insects to majestic whales and dinosaurs. Perfect for educational content, videos, and audio projects."
        />
        <Script
          id="json-ld-animal-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/animal-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/animal-sound-effects/",
                  "name": "Animal Sound Effects - SoundEffectButtons",
                  "description":
                    "Discover a wide variety of animal sound effects for all your projects. From farm animals to wild creatures, download the best animal sound clips for your videos, games, and other media.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/animal-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/animal-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/animal-sound-effects/",
                  "name": "Animal Sound Effects",
                  "description":
                    "Explore a diverse collection of animal sound effects including sounds of pets, wild animals, and farm animals, perfect for your projects, videos, and games.",
                  "keywords":
                    "animal sound effects, animal soundboard, animal noises, wildlife sound effects, farm animal sounds, pet sound effects, animal sound clips",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/animal-sound-effects/#breadcrumb",
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
                      "name": "Animal Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/animal-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >
      <Catalog 
        catAlias={'Animal Sound Effects'} 
        catUrl={'animal-sound-effects'} 
        catValue={'animal_sound_effects'}
        title={'animal_title'}
        description={"animal_description"}
        mobileDescription={'animal_mobileDescription'}
        locale={locale}
      />
    </>

  )
}

export default AnimalSoundEffects