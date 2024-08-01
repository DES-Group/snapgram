import GridPostLists from "@/components/shared/GridPostLists"
import Loader from "@/components/shared/Loader"
import SearchResults from "@/components/shared/SearchResults"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce"
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"


export default function Explore(){

  const [searchValue, setSearchValue] = useState('') 
  const debounceValue = useDebounce(searchValue, 500) 
  const { data: posts, fetchNextPage, hasNextPage, status } = useGetPosts()
  const { data: searchPosts, isPending: isSearchFetching } = useSearchPosts(debounceValue) 
  const shouldShowSearchResults = searchValue !== '' 
  const shouldShowPosts = !shouldShowSearchResults && posts && posts.pages.every((item) => item.documents.length === 0);
  const { ref, inView } = useInView()
  

  useEffect(() => {
    if(inView && !searchValue) fetchNextPage() 
  },[inView, searchValue])

  
  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  
  console.log(posts)

    
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Recercher une publication</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg" 
            width={24}
            height={24}
            alt="Search"
          />
          <Input 
            type="text"
            className="explore-search"
            placeholder="Rechercher"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Publication populaire</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">Tout</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchPosts}
          
          />
        ) : shouldShowPosts ? (
            <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
          ) : posts.pages.map((item, index) => (
          <GridPostLists key={`pages-${index}`} posts={item.documents} />
        ))}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  )
}
