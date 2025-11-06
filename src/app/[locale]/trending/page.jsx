import Catalog from "@/components/pages/Catalog";
import Script from "next/script";

export default function Trending({ params }) {
  const { locale } = params;

  return (
    <>
      <head>
        <title>Trending Soundboard: Viral TikTok, Instagram & Snapchat</title>
        <meta
          name="description"
          content="Download and share trending sounds from TikTok, Instagram, and Snapchat. Upload your own sounds and get featured on our leaderboard."
        />
        {/* schema */}
        <Script
        id="json-ld-trending"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://www.soundeffectbuttons.com/trending/#webpage",
                "url": "https://www.soundeffectbuttons.com/trending/",
                "name": "Trending Sound Effects - SoundEffectButtons",
                "description":
                  "Discover the hottest trending sound effects. Stay updated with the most popular sounds for gaming, memes, and pranks.",
                "isPartOf": {
                  "@id": "https://www.soundeffectbuttons.com/#website",
                },
                "breadcrumb": {
                  "@id": "https://www.soundeffectbuttons.com/trending/#breadcrumb",
                },
                "inLanguage": "en-US",
              },
              {
                "@type": "CreativeWork",
                "@id": "https://www.soundeffectbuttons.com/trending/#library",
                "url": "https://www.soundeffectbuttons.com/trending/",
                "name": "Trending Sound Effects",
                "description":
                  "Explore the most popular and trending sound effects used by gamers, streamers, and pranksters worldwide.",
                "keywords":
                  "trending sounds, popular sound effects, gaming sounds, pranks",
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.soundeffectbuttons.com/trending/#breadcrumb",
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
                    "name": "Trending",
                    "item": "https://www.soundeffectbuttons.com/trending/",
                  },
                ],
              },
            ],
          }),
        }}
      />
      </head>
      <Catalog 
        catAlias={'Trending'} 
        catUrl={'trending'} 
        catValue={'trending'}
        title={'trending_title'}
        description={"trending_description"}
        mobileDescription={'trending_mobile_description'}
        locale={locale}
      />
    </>
  );
}