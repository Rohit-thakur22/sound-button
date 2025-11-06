import Catalog from '@/components/pages/Catalog'
import Script from 'next/script';

const DiscordSoundboard = () => {

  return (
    <>
      <head>
        <title>Discord Soundboard: Sound Effects for Discord Chat & Streams
        </title>
        <meta
          name="description"
          content="Spice up your Discord streams and chats with a variety of sound effects tailored for gamers and streamers."
        />
        <Script
          id="json-ld-discord-soundboard"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.soundeffectbuttons.com/discord-soundboard/#webpage",
                  "url": "https://www.soundeffectbuttons.com/discord-soundboard/",
                  "name": "Discord Soundboard - SoundEffectButtons",
                  "description":
                    "Discover the best Discord soundboard sounds. Download and access a wide range of button SFX, Discord sound effects, and exclusive Discord soundboard collections.",
                  "isPartOf": {
                    "@id": "https://www.soundeffectbuttons.com/#website",
                  },
                  "breadcrumb": {
                    "@id": "https://www.soundeffectbuttons.com/discord-soundboard/#breadcrumb",
                  },
                  "inLanguage": "en-US",
                },
                {
                  "@type": "CreativeWork",
                  "@id": "https://www.soundeffectbuttons.com/discord-soundboard/#library",
                  "url": "https://www.soundeffectbuttons.com/discord-soundboard/",
                  "name": "Discord Soundboard",
                  "description":
                    "Access top Discord soundboard sounds and download button SFX for your calls and chats. Get exclusive Discord sound effects, downloadable soundboards, and custom audio clips.",
                  "keywords":
                    "download discord soundboard sounds, discord soundboard sounds, discord secret ringtone, discord soundboard sounds download, button sfx, discord sound effects, discord soundboard sounds download, discord soundboard download, discord soundboards, discord soundboard, discord soundboard sound",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.soundeffectbuttons.com/discord-soundboard/#breadcrumb",
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
                      "name": "Discord Soundboard",
                      "item": "https://www.soundeffectbuttons.com/discord-soundboard/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head >
      <Catalog 
        catAlias={'Discord Soundboard'} 
        catUrl={'discord-soundboard'} 
        catValue={'discord_soundboard'}
        title={'discord_title'}
        description={"discord_description"}
        mobileDescription={'discord_mobileDescription'}
      />
    </>

  )
}

export default DiscordSoundboard
