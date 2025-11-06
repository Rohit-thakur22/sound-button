import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';


const HorrorSoundEffects = ({ params }) => {
  const { locale } = params;

  return (
    <>
      <head>
        <title> Horror Sound Effects: Creepy & Ghostly Sounds for Videos</title>
        <meta
          name="description"
          content="Download spine-chilling horror sound effects like footsteps, eerie music, and ghostly noises. Enhance your horror projects with these terrifying sounds."
        />
        <Script
          id="json-ld-horror-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/horror-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/horror-sound-effects/",
                  "name": "Horror Sound Effects - SoundEffectButtons",
                  "description":
                    "Discover a spine-chilling collection of horror sound effects, including eerie noises, screams, and creaky doors. Perfect for horror projects, gaming, or scaring friends.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/horror-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/horror-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/horror-sound-effects/",
                  "name": "Horror Sound Effects",
                  "description":
                    "Get the creepiest horror sound effects like screams, spooky ambiance, creaky doors, and ghostly sounds. Perfect for creating a terrifying atmosphere for games, films, or pranks.",
                  "keywords":
                    "horror sound effects, scary sound effects, eerie sound effects, horror soundboard, spooky sound effects, ghost sounds, creepy noises, horror sound clips, horror soundboard",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/horror-sound-effects/#breadcrumb",
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
                      "name": "Horror Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/horror-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>

      <Catalog 
        catAlias={'Horror Sound Effects'} 
        catUrl={'horror-sound-effects'} 
        catValue={'horror_sound_effects'}
        title={'horror_title'}
        description={"horror_description"}
        mobileDescription={'horror_mobileDescription'}
        locale={locale}
      />
    </>
  )
}

export default HorrorSoundEffects

