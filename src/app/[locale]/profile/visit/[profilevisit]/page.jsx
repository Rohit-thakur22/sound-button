import VisitPage from '@/components/pages/VisitPage'

const ProfileVisit = ({ params }) => {
  const { locale, profilevisit } = params;

  return (
    <VisitPage locale={locale} userId={profilevisit} />
  )
}

export default ProfileVisit
