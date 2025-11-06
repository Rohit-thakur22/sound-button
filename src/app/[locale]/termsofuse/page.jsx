import TermsOfUsePage from '@/components/pages/TermsOfUsePage'

const TermsOfUse = ({ params }) => {
  const { locale } = params;

  return (
    <TermsOfUsePage locale={locale} />
  )
}

export default TermsOfUse

