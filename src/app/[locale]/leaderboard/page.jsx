import Leaders from '@/components/pages/Leaders'
import { topCreators } from '@/database/topCreators';

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

const Leaderboard = async ({ params }) => {
  const { locale } = params;
  let topCreatorsData = [];
  
  try {
    topCreatorsData = await topCreators();
  } catch (error) {
    console.error('Error fetching top creators:', error);
    // Continue with empty array if API fails
  }

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