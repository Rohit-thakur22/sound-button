import ProfilePage from '@/components/pages/ProfilePage'
import { topCreators } from '@/database/topCreators'

const Profile = async ({ searchParams, params }) => {
  const { locale } = params;
  const topCreatorsData = await topCreators()
  const { upload } = searchParams;

  return (
    <ProfilePage uploadCheck={upload} creatorsdata={topCreatorsData} locale={locale} />
  )
}

export default Profile
