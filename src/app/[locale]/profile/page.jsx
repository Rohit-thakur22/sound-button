import ProfilePage from '@/components/pages/ProfilePage'
import { topCreators } from '@/database/topCreators'

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

const Profile = async ({ searchParams, params }) => {
  const { locale } = params;
  let topCreatorsData = [];
  
  try {
    topCreatorsData = await topCreators();
  } catch (error) {
    console.error('Error fetching top creators:', error);
    // Continue with empty array if API fails
  }
  
  const { upload } = searchParams;

  return (
    <ProfilePage uploadCheck={upload} creatorsdata={topCreatorsData} locale={locale} />
  )
}

export default Profile
