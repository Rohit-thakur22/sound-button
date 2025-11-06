import Searched from '@/components/pages/Searched'

const SearchQuery = ({ params }) => {
  const { locale, search } = params;
  
  // Decode URL parameter to handle %20 (spaces) and other encoded characters
  const decodedSearch = decodeURIComponent(search);

  return (
    <Searched 
      searchText={decodedSearch} 
      locale={locale} 
      catAlias="Search Results"
      catUrl="search"
    />
  )
}

export default SearchQuery
