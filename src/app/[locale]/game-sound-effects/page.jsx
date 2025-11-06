import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const GameSoundEffects = () => {

  return (
    <>
      <head>
        <title>Game Sound Effects: Free Victory & Explosion Sounds</title>
        <meta
          name="description"
          content=" Level up your gaming projects with free game sound effects like victory tunes, explosions, and power-ups. Ideal for gaming videos, streams, and memes."
        />
        <Script
          id="json-ld-game-sound-effects"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/game-sound-effects/#webpage",
                  "url": "https://www.soundeffectbuttons.com/game-sound-effects/",
                  "name": "Game Sound Effects - SoundEffectButtons",
                  "description":
                    "Access a wide collection of game sound effects. Discover sounds from popular games like Minecraft, Among Us, Angry Birds, and GTA 5 for your gaming projects.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/game-sound-effects/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/game-sound-effects/#library",
                  "url": "https://www.soundeffectbuttons.com/game-sound-effects/",
                  "name": "Game Sound Effects",
                  "description":
                    "Explore game sound effects from popular titles like Minecraft, Among Us, Angry Birds, and GTA 5. Get essential gaming sounds for your projects and content creation.",
                  "keywords":
                    "minecraft sound effect buttons, amongus game sound effect, angry bird sound board sound effect, GTA 5 sound effect",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/game-sound-effects/#breadcrumb",
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
                      "name": "Game Sound Effects",
                      "item": "https://www.soundeffectbuttons.com/game-sound-effects/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>

      <Catalog 
        catAlias={'Game Sound Effects'} 
        catUrl={'game-sound-effects'} 
        catValue={'game_sound_effects'}
        title={'game_title'}
        description={"game_description"}
        mobileDescription={'game_mobileDescription'}
      />
    </>
  )
}

export default GameSoundEffects
