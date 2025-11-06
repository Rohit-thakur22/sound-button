import Leaders from '@/components/pages/Leaders'
import { topCreators } from '@/database/topCreators';

const Leaderboard = async ({ params }) => {
  const { locale } = params;
  const topCreatorsData = await topCreators()

   return (
    <>
      <head>
        <title>Leaderboard for Creators</title>
        <meta
          name="description"
          content="Upload sound effect buttons to the website's soundboard, make them viral, and we will feature you along with your social media handles. Get into the league now!"
        />
      </head>
      <Leaders creatorsData={topCreatorsData} locale={locale} />
    </>
  )
}

export default Leaderboard