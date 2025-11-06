import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage'

const PrivacyPolicy = ({ params }) => {
  const { locale } = params;

  return (
    <PrivacyPolicyPage locale={locale} />
  )
}

export default PrivacyPolicy

