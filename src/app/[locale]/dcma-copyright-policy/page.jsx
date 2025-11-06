import DCMAPage from '@/components/pages/DCMAPage'

const DCMA = ({ params }) => {
  const { locale } = params;

  return (
    <DCMAPage locale={locale} />
  )
}

export default DCMA

