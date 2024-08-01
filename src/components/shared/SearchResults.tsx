import { Models } from "appwrite"
import Loader from "./Loader"
import GridPostLists from "./GridPostLists"

type SearchResultsProps = {
  isSearchFetching: boolean, 
  searchedPosts : Models.Document[]
}

export default function SearchResults({isSearchFetching, searchedPosts}:SearchResultsProps) {
  
  if (isSearchFetching) return <Loader />
  
  if ( searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostLists posts={searchedPosts.documents}  />
  } 
  return (
    <p className="text-light-4 mt-10 text-center w-full">Pas de résultats</p>
  )
}
